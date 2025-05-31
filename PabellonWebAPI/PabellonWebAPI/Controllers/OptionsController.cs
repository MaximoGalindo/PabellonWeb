using BussinessLogicLayer.Request;
using BussinessLogicLayer.Services.Options;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Pabellon.Web.API.Controllers
{
    [ApiController]
    [Route("api/options")]
    public class OptionsController : ControllerBase
    {
        private readonly IOptionService _optionService;

        public OptionsController(IOptionService optionService)
        {
            _optionService = optionService;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetOptionList()
        {
            return Ok(await _optionService.GetOptionList());
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateOption([FromForm] OptionRequest request)
        {
            return Ok(await _optionService.CreateOption(request));
        }
    }
}
