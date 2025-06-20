using Pabellon.Context.Core.Models;
using System.Threading.Tasks;

namespace Pabellon.Context.Core.Repositories.StoreRepository
{
    public interface IStoreRepository
    {
        Task<Store?> GetStore();
        Task<int> SaveStore(Store store);
    }
}
