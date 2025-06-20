using BussinessLogicLayer.Request;
using BussinessLogicLayer.Services.OptionGroups;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Pabellon.Web.API.Controllers
{
    [ApiController]
    [Route("api/option-groups")]
    public class OptionGroupsController : ControllerBase
    {
        private readonly IOptionGroupService _service;

        public OptionGroupsController(IOptionGroupService service)
        {
            _service = service;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _service.GetGroups());
        }

        [HttpGet("{id:int}")]
        [Authorize]
        public async Task<IActionResult> GetById(int id)
        {
            var group = await _service.GetById(id);
            if (group == null) return NotFound();
            return Ok(group);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create([FromForm] OptionGroupRequest request)
        {
            return Ok(await _service.CreateGroup(request));
        }

        [HttpPut("{id:int}")]
        [Authorize]
        public async Task<IActionResult> Update(int id, [FromForm] OptionGroupRequest request)
        {
            return Ok(await _service.UpdateGroup(id, request));
        }

        [HttpDelete("{id:int}")]
        [Authorize]
        public async Task<IActionResult> Delete(int id)
        {
            return Ok(await _service.DeleteGroup(id));
        }
    }
}
