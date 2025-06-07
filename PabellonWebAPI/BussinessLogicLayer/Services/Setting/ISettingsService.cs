using BussinessLogicLayer.Reponses;
using BussinessLogicLayer.Request;

namespace BussinessLogicLayer.Services.Setting
{
    public interface ISettingsService
    {
        Task<List<SettingResponse>> GetSettings();
        Task<int> SaveSettings(List<SettingsRequest> settings);
    }
}
