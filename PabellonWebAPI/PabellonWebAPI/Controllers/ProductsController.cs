﻿using BussinessLogicLayer.Request;
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
        public async Task SaveProduct([FromForm] CreateProductRequest request)
        {
            await _productsService.SaveProduct(request);
        }

        [HttpPut]
        [Authorize]
        public async Task UpdateProduct([FromForm] UpdateProductRequest request)
        {
            await _productsService.UpdateProduct(request);
        }

        [HttpGet("catalog/{catalogId}")]
        public async Task<IActionResult> GetProductListByCatalogId(string catalogId)
        {
            return Ok(await _productsService.GetProductListByCatalog(catalogId));
        }        
    }
}
