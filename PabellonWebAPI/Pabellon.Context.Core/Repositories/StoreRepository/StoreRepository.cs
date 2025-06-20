using Microsoft.EntityFrameworkCore;
using Pabellon.Context.Core.Models;
using Pabellon.Core;
using System.Threading.Tasks;

namespace Pabellon.Context.Core.Repositories.StoreRepository
{
    public class StoreRepository : IStoreRepository
    {
        private readonly PabellonDbContext _context;
        public StoreRepository(PabellonDbContext context)
        {
            _context = context;
        }

        public async Task<Store?> GetStore()
        {
            return await _context.Stores.FirstOrDefaultAsync();
        }

        public async Task<int> SaveStore(Store store)
        {
            var existing = await _context.Stores.FirstOrDefaultAsync();
            if (existing == null)
            {
                _context.Stores.Add(store);
            }
            else
            {
                existing.Name = store.Name;
                existing.PhoneNumber = store.PhoneNumber;
                existing.Address = store.Address;
                existing.Description = store.Description;
                _context.Stores.Update(existing);
            }
            return await _context.SaveChangesAsync();
        }
    }
}
