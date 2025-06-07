using Microsoft.EntityFrameworkCore;
using Pabellon.Context.Core.Models;
using Pabellon.Core;

namespace Pabellon.Context.Core.Repositories.SettingsRepository
{
    public class SettingsRepository : ISettingsRepository
    {
        private readonly PabellonDbContext _context;

        public SettingsRepository(PabellonDbContext context)
        {
            _context = context;
        }

        public async Task<List<Settings>> GetSettings()
        {
            return await _context.Settings.ToListAsync();
        }

        public Task<int> SaveSettings(List<Settings> settings)
        {
            try
            {
                _context.Settings.UpdateRange(settings);
                return _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                // Log the exception (not implemented here)
                throw new Exception("An error occurred while saving settings");
            }
        }
    }
}
