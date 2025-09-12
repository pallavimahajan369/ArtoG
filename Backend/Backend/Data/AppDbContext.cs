using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data   
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        // Ye Users table ko represent karega
        public DbSet<User> Users { get; set; }
        public DbSet<Sketch> Sketches { get; set; }

        public DbSet<Like> Likes { get; set; }
        public DbSet<Save> Saves { get; set; }


    }
}
