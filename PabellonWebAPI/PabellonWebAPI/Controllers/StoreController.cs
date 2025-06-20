using BussinessLogicLayer.Request;
using BussinessLogicLayer.Services.Stores;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Pabellon.Web.API.Controllers
{
    [Route("api/store")]
    [ApiController]
    public class StoreController : ControllerBase
    {
        private readonly IStoreService _service;

        public StoreController(IStoreService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetStore()
        {
            return Ok(await _service.GetStore());
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> SaveStore([FromForm] StoreRequest request)
        {
            return Ok(await _service.SaveStore(request));
        }
    }
}
