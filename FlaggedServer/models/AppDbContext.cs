using Microsoft.EntityFrameworkCore;

namespace FlaggedServer.Models;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    
    public DbSet<UserReview> Reviews { get; set; }
}