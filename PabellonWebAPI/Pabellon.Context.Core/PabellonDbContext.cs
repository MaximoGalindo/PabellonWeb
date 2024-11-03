using Microsoft.EntityFrameworkCore;
using Pabellon.Context.Core.Models;
using Pabellon.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pabellon.Core
{
    public class PabellonDbContext : DbContext
    {
        public PabellonDbContext(DbContextOptions<PabellonDbContext> options) : base(options)
        {

        }

        public DbSet<Catalog> Catalog { get; set; }
        public DbSet<Product> Product { get; set; }
        public DbSet<Schedule> Schedule { get; set; }
        public DbSet<User> User { get; set; }
        public DbSet<Option> Options { get; set; }
    }
}
