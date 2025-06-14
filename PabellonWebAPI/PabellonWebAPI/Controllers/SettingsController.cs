using BussinessLogicLayer.Const;
using BussinessLogicLayer.Request;
using BussinessLogicLayer.Services.Setting;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Pabellon.Web.API.Controllers
{
    [Route("api/settings")]
    [ApiController]
    public class SettingsController : ControllerBase
    {
        private readonly ISettingsService _settingsService;

        public SettingsController(ISettingsService settingsService)
        {
            _settingsService = settingsService;
        }

        [HttpGet]
        public async Task<IActionResult> GetSettings()
        {
            return Ok(await _settingsService.GetSettings());
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> SaveSettings([FromForm] List<SettingsRequest> settings)
        {
            return Ok(await _settingsService.SaveSettings(settings));
        }

        [HttpGet("store-avaible")]
        public async Task<IActionResult> CheckStoreAvaible()
        {
            return Ok(await _settingsService.CheckStoreAvaible());
        }
    }
}
