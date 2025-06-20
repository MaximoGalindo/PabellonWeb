using System.Collections.Generic;

namespace Pabellon.Context.Core.Models
{
    public class OptionGroup
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public int MaxQuantity { get; set; }

        public ICollection<Option> Options { get; set; } = new List<Option>();
    }
}
