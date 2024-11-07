using Microsoft.EntityFrameworkCore;
using Pabellon.Core;
using Pabellon.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pabellon.Context.Core.Repositories.CatalogRepository
{
    public class CatalogRepository : ICatalogRepository
    {
        private readonly PabellonDbContext _context;

        public CatalogRepository(PabellonDbContext context)
        {
            _context = context;
        }

        public async Task<Catalog?> GetById(int catalogId)
        {
            return await _context.Catalog.FirstOrDefaultAsync(x => x.Id == catalogId);
        }
    }
}
