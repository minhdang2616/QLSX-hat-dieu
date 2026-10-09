using Microsoft.EntityFrameworkCore;
using QlsxHatDieu.Api.Models;

namespace QlsxHatDieu.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users => Set<User>();
    public DbSet<Content> Contents => Set<Content>();
    public DbSet<ContentItem> ContentItems => Set<ContentItem>();

    protected override void OnModelCreating(ModelBuilder b)
    {
        b.Entity<User>().HasIndex(u => u.Username).IsUnique();

        b.Entity<Content>(e =>
        {
            e.HasIndex(c => new { c.Page, c.Section });
            e.HasMany(c => c.Items)
             .WithOne()
             .HasForeignKey(i => i.ContentId)
             .OnDelete(DeleteBehavior.Cascade);
        });
    }
}
