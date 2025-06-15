using Microsoft.AspNetCore.Http;

namespace BussinessLogicLayer.Request
{
    public class CreateProductRequest
    {
        public string Name { get; set; }
        public double Price { get; set; }
        public string CatalogId { get; set; }
        public string Description { get; set; }
        public int Quantity { get; set; }
        public List<int>? OptionIds { get; set; }
        public IFormFile Image { get; set; }
    }

}
