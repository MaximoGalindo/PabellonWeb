using Microsoft.EntityFrameworkCore;
using Pabellon.Context.Core.Models;
using Pabellon.Core;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Pabellon.Context.Core.Repositories.OptionGroupRepository
{
    public class OptionGroupRepository : IOptionGroupRepository
    {
        private readonly PabellonDbContext _context;

        public OptionGroupRepository(PabellonDbContext context)
        {
            _context = context;
        }

        public async Task<List<OptionGroup>> GetAll()
        {
            return await _context.OptionGroups.Include(g => g.Options).ToListAsync();
        }

        public async Task<OptionGroup?> GetById(int id)
        {
            return await _context.OptionGroups.Include(g => g.Options).FirstOrDefaultAsync(g => g.Id == id);
        }

        public async Task<int> Insert(OptionGroup group)
        {
            _context.OptionGroups.Add(group);
            return await _context.SaveChangesAsync();
        }

        public async Task<int> Update(OptionGroup group)
        {
            _context.OptionGroups.Update(group);
            return await _context.SaveChangesAsync();
        }

        public async Task<int> Delete(int id)
        {
            var group = await _context.OptionGroups.FindAsync(id);
            if (group == null) return 0;
            _context.OptionGroups.Remove(group);
            return await _context.SaveChangesAsync();
        }
    }
}
