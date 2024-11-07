using Microsoft.EntityFrameworkCore;
using Pabellon.Context.Core.Models;
using Pabellon.Context.Core.Repositories.OptionsRepository;
using Pabellon.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pabellon.Context.Core.Repositories.OptionRepository
{
    public class OptionRepository : IOptionRepository
    {
        private readonly PabellonDbContext _context;

        public OptionRepository(PabellonDbContext context)
        {
            _context = context;
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
