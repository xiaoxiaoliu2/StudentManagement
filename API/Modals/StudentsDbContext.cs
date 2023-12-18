using System;
using Microsoft.EntityFrameworkCore;

namespace API.Models
{
	public class StudentsDbContext: DbContext
	{
        
        public StudentsDbContext(DbContextOptions<StudentsDbContext> options) : base(options)
        {
        }

        // Create database
        public DbSet<Students> Students { get; set; }

        // create database connection
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Data Source=.; Initial Catalog=lbs; User Id=SA; password=Lzz123456*; TrustServerCertificate= True");
        }
        
    }
}

