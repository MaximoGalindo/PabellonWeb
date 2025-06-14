
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

        public async Task<bool> CheckStoreAvaible()
        {
            var settings = await _settingsRepository.GetSettings();

            var schedules = settings
                .Where(setting => setting.Key.StartsWith("store_", StringComparison.OrdinalIgnoreCase))
                .ToList();

            // Ahora podés buscar el correspondiente al día actual
            var todayKey = $"store_{DateTime.Now.DayOfWeek.ToString().ToLower()}";

            var argentinaZone = TimeZoneInfo.FindSystemTimeZoneById("Argentina Standard Time");
            var now = TimeZoneInfo.ConvertTime(DateTime.Now, argentinaZone).TimeOfDay;

            var todaySchedule = schedules.FirstOrDefault(s => s.Key.Equals(todayKey, StringComparison.OrdinalIgnoreCase));

            if (todaySchedule == null || string.IsNullOrWhiteSpace(todaySchedule.Value))
                return false;

            var parts = todaySchedule.Value.Split('-');
            if (parts.Length != 2 || string.IsNullOrWhiteSpace(parts[0]) || string.IsNullOrWhiteSpace(parts[1]))
                return false;

            var open = TimeSpan.Parse(parts[0]);
            var close = parts[1] == "00:00"
                ? TimeSpan.FromHours(24).Subtract(TimeSpan.FromMinutes(1))
                : TimeSpan.Parse(parts[1]);


            return now >= open && now < close;
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
