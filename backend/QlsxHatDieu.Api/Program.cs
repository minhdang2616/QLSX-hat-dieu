using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage;
using Npgsql;
using QlsxHatDieu.Api.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

// Accepts either an Npgsql string or a postgres:// URI (as given by Neon, Supabase, Railway...).
static string NormalizeConnectionString(string? cs)
{
    if (string.IsNullOrWhiteSpace(cs)) return "";
    cs = cs.Trim().Trim('"', '\'');
    if (!cs.StartsWith("postgres://") && !cs.StartsWith("postgresql://")) return cs;

    var uri = new Uri(cs);
    var user = uri.UserInfo.Split(':', 2);
    var port = uri.Port > 0 ? uri.Port : 5432;
    return $"Host={uri.Host};Port={port};Database={uri.AbsolutePath.TrimStart('/')};" +
           $"Username={Uri.UnescapeDataString(user[0])};Password={Uri.UnescapeDataString(user.Length > 1 ? user[1] : "")};" +
           "SSL Mode=Require;Trust Server Certificate=true";
}

var rawConnection = builder.Configuration.GetConnectionString("Default");
var connection = NormalizeConnectionString(rawConnection);

// ---- Startup diagnostics (the password is never printed) ----
var envValue = Environment.GetEnvironmentVariable("ConnectionStrings__Default");
Console.WriteLine($"[DB] Env var ConnectionStrings__Default present: {!string.IsNullOrWhiteSpace(envValue)}");
Console.WriteLine($"[DB] Raw value starts with: {(string.IsNullOrEmpty(rawConnection) ? "(empty)" : rawConnection[..Math.Min(rawConnection.Length, 12)])}");
try
{
    var b = new NpgsqlConnectionStringBuilder(connection);
    Console.WriteLine($"[DB] Using Host={b.Host} Port={b.Port} Database={b.Database} Username={b.Username} SslMode={b.SslMode} PasswordLength={b.Password?.Length ?? 0}");
}
catch (Exception ex)
{
    Console.WriteLine($"[DB] Connection string cannot be parsed: {ex.Message}");
}
Console.WriteLine($"[ENV] PORT={Environment.GetEnvironmentVariable("PORT")}");

builder.Services.AddDbContext<AppDbContext>(o => o.UseNpgsql(connection));

// Allowed browser origins (the Next.js site). Comma separated in config / env var Cors__Origins.
var origins = (builder.Configuration["Cors:Origins"] ?? "http://localhost:3000")
    .Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);
builder.Services.AddCors(o => o.AddDefaultPolicy(p => p.WithOrigins(origins).AllowAnyHeader().AllowAnyMethod()));

var app = builder.Build();

// Create tables + seed default data on first run.
try
{
    using var scope = app.Services.CreateScope();
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();

    // EnsureCreated() silently does nothing when the database already contains other tables,
    // so create our tables explicitly.
    var creator = db.GetService<IRelationalDatabaseCreator>();
    if (!creator.Exists()) creator.Create();
    try
    {
        creator.CreateTables();
        Console.WriteLine("[DB] Tables created.");
    }
    catch (PostgresException ex) when (ex.SqlState == "42P07") // duplicate_table: already created earlier
    {
        Console.WriteLine("[DB] Tables already exist.");
    }

    DbSeeder.Seed(db, app.Configuration);
    Console.WriteLine("[DB] Database ready.");
}
catch (Exception ex)
{
    Console.WriteLine($"[DB] STARTUP FAILED: {ex.GetType().Name}: {ex.Message}");
    for (var inner = ex.InnerException; inner != null; inner = inner.InnerException)
        Console.WriteLine($"[DB]   caused by {inner.GetType().Name}: {inner.Message}");
    throw;
}

app.UseCors();
app.MapControllers();
app.MapGet("/health", () => Results.Ok(new { status = "ok" }));

app.Run();
