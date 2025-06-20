using BussinessLogicLayer.Reponses;
using BussinessLogicLayer.Request;
using Pabellon.Context.Core.Models;
using Pabellon.Context.Core.Repositories.StoreRepository;
using System.Threading.Tasks;

namespace BussinessLogicLayer.Services.Stores
{
    public class StoreService : IStoreService
    {
        private readonly IStoreRepository _repository;

        public StoreService(IStoreRepository repository)
        {
            _repository = repository;
        }

        public async Task<StoreResponse?> GetStore()
        {
            var store = await _repository.GetStore();
            if (store == null) return null;
            return new StoreResponse
            {
                Name = store.Name,
                PhoneNumber = store.PhoneNumber,
                Address = store.Address,
                Description = store.Description
            };
        }

        public async Task<int> SaveStore(StoreRequest request)
        {
            var store = new Store
            {
                Name = request.Name,
                PhoneNumber = request.PhoneNumber,
                Address = request.Address,
                Description = request.Description
            };
            return await _repository.SaveStore(store);
        }
    }
}
