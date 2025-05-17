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
            return await _context.Catalog.OrderBy(c => c.Order).Where(c => c.ExpirationDate == null).ToListAsync();
        }

        public async Task<Catalog> GetById(string catalogId)
        {
            var catalog = await _context.Catalog.FirstOrDefaultAsync(x => x.Id == catalogId && x.ExpirationDate == null);
            if (catalog == null)
                throw new ArgumentException(GlobalResourses.ResourceAccessor.GetString("CatalogNonExist"));
            return catalog;
        }

        public async Task Delete(string catalogId)
        {
            var catalog = _context.Catalog.FirstOrDefault(x => x.Id == catalogId);
            if (catalog == null)
                throw new ArgumentException(GlobalResourses.ResourceAccessor.GetString("CatalogNonExist"));
            catalog.ExpirationDate = DateTime.UtcNow;
            _context.Catalog.Update(catalog);
            await _context.SaveChangesAsync();
        }

        public async Task Update(Catalog catalog)
        {
            _context.Catalog.Update(catalog);
            await _context.SaveChangesAsync();
        }
    }
}
