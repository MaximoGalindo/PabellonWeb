using BussinessLogicLayer.Reponses;
using BussinessLogicLayer.Request;

namespace BussinessLogicLayer.Services.Options
{
    public interface IOptionService
    {
        Task<List<OptionResponse>> GetOptionList();
        Task<bool> CreateOption(OptionRequest request);
        Task<bool> UpdateOption(int id, OptionRequest request);
        Task<bool> DeleteOption(int id);
        Task<OptionResponse> GetOptionById(int id);
        Task<List<string>> GetProductsNameWithOptionId(int optionId);
    }
}
