using Pabellon.Core.Models;

namespace Pabellon.Context.Core.Models
{
    public class Option
    {
        public int Id { get; set; }
        public string OptionName { get; set; }
        public double Price { get; set; }
        public bool AllowsQuantity { get; set; }
        public ICollection<Product> Products { get; set; } = new List<Product>();
    }
}
