using Pabellon.Context.Core.Models;

namespace Pabellon.Context.Core.Repositories.SettingsRepository
{
    public interface ISettingsRepository
    {
        Task<List<Settings>> GetSettings();
        Task<int> SaveSettings(List<Settings> settings);
    }
}
