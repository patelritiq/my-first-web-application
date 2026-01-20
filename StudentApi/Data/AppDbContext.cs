//AppDbContext manages db connections and maps C# models to db tables using Entity Framework Core.

using Microsoft.EntityFrameworkCore;
using StudentApi.Models;

namespace StudentApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options) { }

        public DbSet<Student> Students { get; set; }
        public DbSet<State> States { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<State>().ToTable("States"); // Explicitly map to States table
            modelBuilder.Entity<Student>().ToTable("Students"); // Explicitly map to Students table

            base.OnModelCreating(modelBuilder);
        }
    }
}
