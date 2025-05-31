using Microsoft.EntityFrameworkCore;
using Pabellon.Context.Core.Models;
using Pabellon.Context.Core.Repositories.OptionsRepository;
using Pabellon.Core;

namespace Pabellon.Context.Core.Repositories.OptionRepository
{
    public class OptionRepository : IOptionRepository
    {
        private readonly PabellonDbContext _context;

        public OptionRepository(PabellonDbContext context)
        {
            _context = context;
        }

        public async Task<bool> CreateOption(Option option)
        {
            try
            {
                _context.Add(option);
                return await _context.SaveChangesAsync() > 0;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error creating option: {ex.Message}", ex);
            };
        }

        public async Task<List<Option>> GetAllOptions()
        {
            return await _context.Options.ToListAsync();
        }

        public async Task<Option?> GetById(int id)
        {
            return await _context.Options.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<List<Option>> GetByIds(IEnumerable<int> ids)
        {
            return await _context.Options.Where(o => ids.Contains(o.Id)).ToListAsync();
        }
    }
}
