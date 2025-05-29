using Pabellon.Context.Core.Models;

namespace Pabellon.Core.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Image {  get; set; }
        public double Price { get; set; }
        public string CatalogId { get; set; }     
        public string? Description { get; set; }
        public bool Disabled { get; set; }

        public Catalog Catalog { get; set; }
        public ICollection<Option> Options { get; set; } = new List<Option>();
    }
}
