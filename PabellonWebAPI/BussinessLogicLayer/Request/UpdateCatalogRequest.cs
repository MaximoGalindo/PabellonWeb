using Microsoft.AspNetCore.Http;

namespace BussinessLogicLayer.Request
{
    public class UpdateCatalogRequest
    {
        public string Name { get; set; }
        public IFormFile? ImgUrl { get; set; }
        public int Order { get; set; }
    }
}
