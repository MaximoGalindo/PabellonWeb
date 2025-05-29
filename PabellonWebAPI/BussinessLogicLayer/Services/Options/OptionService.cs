using BussinessLogicLayer.Reponses;
using Pabellon.Context.Core.Models;
using Pabellon.Context.Core.Repositories.OptionsRepository;

namespace BussinessLogicLayer.Services.Options
{
    public class OptionService : IOptionService
    {
        private readonly IOptionRepository _optionRepository;

        public OptionService(IOptionRepository optionRepository)
        {
            _optionRepository = optionRepository;
        }

        public Task<Option> CreateOption()
        {
            throw new NotImplementedException();
        }

        public async Task<List<OptionResponse>> GetOptionList()
        {
            var options = await _optionRepository.GetAllOptions();
            if (options == null || options.Count == 0)
            {
                return new List<OptionResponse>();
            }

            var response = options.Select(o => new OptionResponse
            {
                Id = o.Id,
                Name = o.OptionName,
                Price = o.Price,
                IsSelected = false
            }).ToList();

            return response;
        }
    }
}
