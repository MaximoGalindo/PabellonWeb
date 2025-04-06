using BussinessLogicLayer.Reponses;
using BussinessLogicLayer.Request;

namespace BussinessLogicLayer.Services.Products
{
    public interface IProductService
    {
        Task SaveProduct(CreateProductRequest request);
        Task UpdateProduct(UpdateProductRequest request);
        Task<List<ProductResponse>> GetProductListByCatalog(string catalogId);
    }
}
