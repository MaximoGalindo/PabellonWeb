using Pabellon.Core.Models;
using Pabellon.Context.Core.Models;

namespace Pabellon.Context.Core.Models
{
    public class Option
    {
        public int Id { get; set; }
        public string OptionName { get; set; }
        public double Price { get; set; }
        public bool AllowsQuantity { get; set; }
        public int? OptionGroupId { get; set; }
        public OptionGroup? OptionGroup { get; set; }
        public ICollection<Product> Products { get; set; } = new List<Product>();
    }
}
