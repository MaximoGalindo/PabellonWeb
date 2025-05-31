using BussinessLogicLayer.Reponses;
using BussinessLogicLayer.Request;

namespace BussinessLogicLayer.Services.Options
{
    public interface IOptionService
    {
        Task<List<OptionResponse>> GetOptionList();
        Task<bool> CreateOption(OptionRequest request);
    }
}
