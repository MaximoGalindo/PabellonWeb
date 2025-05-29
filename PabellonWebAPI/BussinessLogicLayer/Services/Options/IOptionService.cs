using BussinessLogicLayer.Reponses;
using Pabellon.Context.Core.Models;

namespace BussinessLogicLayer.Services.Options
{
    public interface IOptionService
    {
        Task<List<OptionResponse>> GetOptionList();
        Task<Option> CreateOption();
    }
}
