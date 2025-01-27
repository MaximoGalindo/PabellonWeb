using BussinessLogicLayer.Reponses;
using BussinessLogicLayer.Services.Catalog;
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
    }
}
