using BussinessLogicLayer.Reponses;
using BussinessLogicLayer.Request;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BussinessLogicLayer.Services.OptionGroups
{
    public interface IOptionGroupService
    {
        Task<List<OptionGroupResponse>> GetGroups();
        Task<OptionGroupResponse?> GetById(int id);
        Task<int> CreateGroup(OptionGroupRequest request);
        Task<int> UpdateGroup(int id, OptionGroupRequest request);
        Task<int> DeleteGroup(int id);
    }
}
