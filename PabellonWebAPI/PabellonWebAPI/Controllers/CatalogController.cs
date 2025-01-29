using BussinessLogicLayer.Reponses;
using BussinessLogicLayer.Request;
using BussinessLogicLayer.Services.Catalogs;
using Microsoft.AspNetCore.Mvc;

namespace Pabellon.Web.API.Controllers
{
    [Route("api/catalog")]
    [ApiController]
    public class CatalogController : ControllerBase
    {
        private readonly CatalogService catalogService;

        public CatalogController(CatalogService catalogService)
        {
            this.catalogService = catalogService;
        }

        [HttpGet("all-catalogs")]
        public async Task<IActionResult> GetAllCatalogs()
        {
            return Ok(await catalogService.GetAllCatalogs());
        }

        [HttpPost]
        public async Task<IActionResult> CreateCatalog([FromForm] CatalogRequest request)
        {
            return Ok(await catalogService.CreateCatalog(request));
        }
    }
}
