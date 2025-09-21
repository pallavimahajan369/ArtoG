using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Sketch> Sketches { get; set; }
        public DbSet<Like> Likes { get; set; }
        public DbSet<Save> Saves { get; set; }
        public DbSet<Comment> Comments { get; set; }

        public DbSet<ContactMessage> ContactMessages { get; set; }


        //  This is where modelBuilder exists
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Unique constraint on User
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Username)
                .IsUnique();

            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();

            // Composite unique index on Save (UserId + DrawingId)
            modelBuilder.Entity<Save>()
                .HasIndex(s => new { s.UserId, s.DrawingId })
                .IsUnique();

            // Composite unique index on Like (UserId + DrawingId)
            modelBuilder.Entity<Like>()
                .HasIndex(l => new { l.UserId, l.DrawingId })
                .IsUnique();
        }
    }
}
