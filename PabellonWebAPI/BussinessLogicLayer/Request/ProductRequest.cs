using Microsoft.AspNetCore.Http;

namespace BussinessLogicLayer.Reponses
{
    public class ProductRequest
    {
        public string Name { get; set; }
        public double Price { get; set; }
        public int CatalogId { get; set; }
        public string Observation { get; set; }
        public List<int> OptionIds { get; set; } = new List<int>();
        public IFormFile Image { get; set; }
    }

}
