using BussinessLogicLayer.Reponses;
using BussinessLogicLayer.Request;

namespace BussinessLogicLayer.Services.Products
{
    public interface IProductService
    {
        Task SaveProduct(CreateProductRequest request);
        Task UpdateProduct(int productId, UpdateProductRequest request);
        Task DeleteProduct(int productId);
        Task<List<ProductResponse>> GetProductListByCatalog(string catalogId);
        Task<ProductResponse> GetProductById(int productId);
        Task<bool> DisableProduct(int productId);
    }
}
