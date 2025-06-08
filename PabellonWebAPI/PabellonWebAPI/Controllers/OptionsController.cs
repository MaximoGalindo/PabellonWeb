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

        [HttpPut("{id:int}")]
        [Authorize]
        public async Task<IActionResult> UpdateOption(int id, [FromForm] OptionRequest request)
        {
            return Ok(await _optionService.UpdateOption(id, request));
        }

        [HttpDelete("{id:int}")]
        [Authorize]
        public async Task<IActionResult> DeleteOption(int id)
        {
            return Ok(await _optionService.DeleteOption(id));
        }

        [HttpGet("{id:int}")]
        [Authorize]
        public async Task<IActionResult> GetOptionById(int id)
        {
            var option = await _optionService.GetOptionById(id);
            return Ok(option);
        }

        [HttpGet("products/{optionId:int}")]
        [Authorize]
        public async Task<IActionResult> GetProductsNameWithOptionId(int optionId)
        {
            var productNames = await _optionService.GetProductsNameWithOptionId(optionId);
            return Ok(productNames);
        }
    }
}
