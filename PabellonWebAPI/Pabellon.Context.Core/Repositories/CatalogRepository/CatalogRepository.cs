using Microsoft.EntityFrameworkCore;
using Pabellon.Core;
using Pabellon.Core.Models;

namespace Pabellon.Context.Core.Repositories.CatalogRepository
{
    public class CatalogRepository : ICatalogRepository
    {
        private readonly PabellonDbContext _context;

        public CatalogRepository(PabellonDbContext context)
        {
            _context = context;
        }

        public async Task<int> Insert(Catalog catalog)
        {
            try
            {
                await _context.Catalog.AddAsync(catalog);
                return _context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception(GlobalResourses.ResourceAccessor.GetString("ErrorSaveProduct"));
            }
        }

        public async Task<List<Catalog>> GetAll()
        {
            return await _context.Catalog.OrderBy(c => c.Order).ToListAsync();
        }

        public async Task<Catalog?> GetById(string catalogId)
        {
            return await _context.Catalog.FirstOrDefaultAsync(x => x.Id == catalogId);
        }
    }
}
