using BussinessLogicLayer.Reponses;
using BussinessLogicLayer.Request;
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

        public async Task<bool> CreateOption(OptionRequest request)
        {
            var options = await _optionRepository.GetOptionByName(request.Name);

            if (options != null)
            {
                throw new Exception($"Ya existe una opcion con el nombre '{ request.Name }' ");
            }

            var option = new Option
            {
                OptionName = request.Name,
                Price = request.Price
            };

            return await _optionRepository.CreateOption(option);
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
