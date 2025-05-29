using Pabellon.Context.Core.Models;

namespace Pabellon.Context.Core.Repositories.OptionsRepository
{
    public interface IOptionRepository
    {
        Task<Option?> GetById(int id);
        Task<List<Option>> GetByIds(IEnumerable<int> ids);
        Task<List<Option>> GetAllOptions();
    }
}
