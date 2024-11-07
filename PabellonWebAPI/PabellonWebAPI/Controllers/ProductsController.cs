using BussinessLogicLayer.Reponses;
using BussinessLogicLayer.Services.Products;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace PabellonWebAPI.Controllers
{
    [Route("api/products")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly ProductService _productsService;

        public ProductsController(ProductService productsService)
        {
            _productsService = productsService;
        }

        [HttpPost]
        public async Task SaveProduct(ProductRequest request)
        {
            await _productsService.SaveProduct(request);
        }
    }
}
