using Pabellon.Context.Core.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Pabellon.Context.Core.Repositories.OptionGroupRepository
{
    public interface IOptionGroupRepository
    {
        Task<OptionGroup?> GetById(int id);
        Task<List<OptionGroup>> GetAll();
        Task<int> Insert(OptionGroup group);
        Task<int> Update(OptionGroup group);
        Task<int> Delete(int id);
    }
}
