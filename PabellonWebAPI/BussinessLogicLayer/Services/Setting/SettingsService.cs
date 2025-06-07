
using BussinessLogicLayer.Reponses;
using BussinessLogicLayer.Request;
using Pabellon.Context.Core.Models;
using Pabellon.Context.Core.Repositories.SettingsRepository;

namespace BussinessLogicLayer.Services.Setting
{
    public class SettingsService : ISettingsService
    {
        private readonly ISettingsRepository _settingsRepository;

        public SettingsService(ISettingsRepository settingsRepository)
        {
            _settingsRepository = settingsRepository;
        }

        public async Task<List<SettingResponse>> GetSettings()
        {
            var settings = await _settingsRepository.GetSettings();
            return settings.Select(s => new SettingResponse
            {
                Key = s.Key,
                Value = s.Value
            }).ToList();
        }

        public async Task<int> SaveSettings(List<SettingsRequest> settingsRequest)
        {
            var settings = settingsRequest.Select(s => new Settings
            {
                Key = s.Key,
                Value = s.Value
            }).ToList();

            return await _settingsRepository.SaveSettings(settings);
        }
    }
}
