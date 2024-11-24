using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using NMC.Models.Database;

namespace NMC;

public class NMCDbContext : IdentityDbContext<IdentityUser>
{
    public NMCDbContext(DbContextOptions<NMCDbContext> options) :
        base(options)
    { }
    
    public DbSet<Server> Servers { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Server>(b =>
        {
            b.OwnsOne(cb => cb.EnvironmentVariables).ToJson();
            b.OwnsOne(cb => cb.Volumes).ToJson();
        });
    }
}