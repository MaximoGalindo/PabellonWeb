using BussinessLogicLayer.Reponses;
using BussinessLogicLayer.Request;
using BussinessLogicLayer.Services.Catalogs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Pabellon.Web.API.Controllers
{
    [Route("api/catalogs")]
    [ApiController]
    public class CatalogController : ControllerBase
    {
        private readonly ICatalogService _catalogService;

        public CatalogController(ICatalogService catalogService)
        {
            _catalogService = catalogService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCatalogs()
        {
            return Ok(await _catalogService.GetAllCatalogs());
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateCatalog([FromForm] CatalogRequest request)
        {
            return Ok(await _catalogService.CreateCatalog(request));
        }

        [HttpDelete("{catalogId}")]
        [Authorize]
        public async Task<IActionResult> DeleteCatalog(string catalogId)
        {
            await _catalogService.DeleteCatalog(catalogId);
            return Ok();
        }

        [HttpPut("{catalogId}")]
        [Authorize]
        public async Task<IActionResult> UpdateCatalog(string catalogId, [FromForm] UpdateCatalogRequest request)
        {
            await _catalogService.UpdateCatalog(catalogId, request);
            return Ok();
        }
    }
}
