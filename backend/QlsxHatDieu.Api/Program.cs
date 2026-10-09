using Microsoft.EntityFrameworkCore;
using QlsxHatDieu.Api.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
// Accepts either an Npgsql string or a postgres:// URI (as given by Neon, Supabase, Railway...).
static string NormalizeConnectionString(string? cs)
{
    if (string.IsNullOrWhiteSpace(cs)) return "";
    if (!cs.StartsWith("postgres://") && !cs.StartsWith("postgresql://")) return cs;

    var uri = new Uri(cs);
    var user = uri.UserInfo.Split(':', 2);
    var port = uri.Port > 0 ? uri.Port : 5432;
    return $"Host={uri.Host};Port={port};Database={uri.AbsolutePath.TrimStart('/')};" +
           $"Username={Uri.UnescapeDataString(user[0])};Password={Uri.UnescapeDataString(user.Length > 1 ? user[1] : "")};" +
           "SSL Mode=Require;Trust Server Certificate=true";
}

builder.Services.AddDbContext<AppDbContext>(o =>
    o.UseNpgsql(NormalizeConnectionString(builder.Configuration.GetConnectionString("Default"))));

// Allowed browser origins (the Next.js site). Comma separated in config / env var Cors__Origins.
var origins = (builder.Configuration["Cors:Origins"] ?? "http://localhost:3000")
    .Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);
builder.Services.AddCors(o => o.AddDefaultPolicy(p => p.WithOrigins(origins).AllowAnyHeader().AllowAnyMethod()));

var app = builder.Build();

// Create tables + seed default data on first run.
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();
    DbSeeder.Seed(db, app.Configuration);
}

app.UseCors();
app.MapControllers();
app.MapGet("/health", () => Results.Ok(new { status = "ok" }));

app.Run();
