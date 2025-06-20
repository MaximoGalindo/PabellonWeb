using BussinessLogicLayer.Reponses;
using BussinessLogicLayer.Request;
using Pabellon.Context.Core.Models;
using Pabellon.Context.Core.Repositories.OptionGroupRepository;
using Pabellon.Context.Core.Repositories.OptionRepository;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace BussinessLogicLayer.Services.OptionGroups
{
    public class OptionGroupService : IOptionGroupService
    {
        private readonly IOptionGroupRepository _repository;
        private readonly IOptionRepository _optionRepository;

        public OptionGroupService(IOptionGroupRepository repository, IOptionRepository optionRepository)
        {
            _repository = repository;
            _optionRepository = optionRepository;
        }

        public async Task<int> CreateGroup(OptionGroupRequest request)
        {
            var options = await _optionRepository.GetByIds(request.OptionIds);
            var group = new OptionGroup
            {
                Name = request.Name,
                MaxQuantity = request.MaxQuantity,
                Options = options
            };

            return await _repository.Insert(group);
        }

        public async Task<int> DeleteGroup(int id)
        {
            return await _repository.Delete(id);
        }

        public async Task<OptionGroupResponse?> GetById(int id)
        {
            var group = await _repository.GetById(id);
            if (group == null) return null;

            return new OptionGroupResponse
            {
                Id = group.Id,
                Name = group.Name,
                MaxQuantity = group.MaxQuantity,
                OptionIds = group.Options.Select(o => o.Id).ToList()
            };
        }

        public async Task<List<OptionGroupResponse>> GetGroups()
        {
            var groups = await _repository.GetAll();
            return groups.Select(g => new OptionGroupResponse
            {
                Id = g.Id,
                Name = g.Name,
                MaxQuantity = g.MaxQuantity,
                OptionIds = g.Options.Select(o => o.Id).ToList()
            }).ToList();
        }

        public async Task<int> UpdateGroup(int id, OptionGroupRequest request)
        {
            var options = await _optionRepository.GetByIds(request.OptionIds);
            var group = new OptionGroup
            {
                Id = id,
                Name = request.Name,
                MaxQuantity = request.MaxQuantity,
                Options = options
            };
            return await _repository.Update(group);
        }
    }
}
