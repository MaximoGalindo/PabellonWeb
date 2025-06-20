using BussinessLogicLayer.Reponses;
using BussinessLogicLayer.Request;
using System.Threading.Tasks;

namespace BussinessLogicLayer.Services.Stores
{
    public interface IStoreService
    {
        Task<StoreResponse?> GetStore();
        Task<int> SaveStore(StoreRequest request);
    }
}
