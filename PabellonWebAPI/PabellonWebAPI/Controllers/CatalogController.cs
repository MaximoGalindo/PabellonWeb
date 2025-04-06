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
        private readonly ICatalogService catalogService;

        public CatalogController(ICatalogService catalogService)
        {
            this.catalogService = catalogService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCatalogs()
        {
            return Ok(await catalogService.GetAllCatalogs());
        }
                
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateCatalog([FromForm] CatalogRequest request)
        {
            return Ok(await catalogService.CreateCatalog(request));
        }
    }
}
