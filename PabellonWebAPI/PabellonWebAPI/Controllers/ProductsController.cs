using BussinessLogicLayer.Request;
using BussinessLogicLayer.Services.Products;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace PabellonWebAPI.Controllers
{
    [Route("api/products")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _productsService;

        public ProductsController(IProductService productsService)
        {
            _productsService = productsService;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> SaveProduct([FromForm] CreateProductRequest request)
        {
            await _productsService.SaveProduct(request);
            return Ok();
        }

        [HttpGet("catalog/{catalogId}")]
        public async Task<IActionResult> GetProductListByCatalogId(string catalogId)
        {
            return Ok(await _productsService.GetProductListByCatalog(catalogId));
        }

        [HttpPut("{productId:int}")]
        [Authorize]
        public async Task<IActionResult> UpdateProduct(int productId, [FromForm] UpdateProductRequest request)
        {
            await _productsService.UpdateProduct(productId, request);
            return Ok();
        }

        [HttpDelete("{productId:int}")]
        [Authorize]
        public async Task<IActionResult> DeleteProduct(int productId)
        {
            await _productsService.DeleteProduct(productId);
            return Ok();
        }

        [HttpGet("{productId:int}")]
        [Authorize]
        public async Task<IActionResult> GetProductById(int productId)
        {
            return Ok(await _productsService.GetProductById(productId));
        }

        [HttpPatch("disable/{productId:int}")]
        public async Task<IActionResult> DisableProduct(int productId)
        {
            var result = await _productsService.DisableProduct(productId);
            return Ok(result);
        }
    }
}
