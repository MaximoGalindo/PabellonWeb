using Pabellon.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pabellon.Context.Core.Models
{
    public class Option
    {
        public int Id { get; set; }
        public string OptionName { get; set; }
        public double Price { get; set; }
        public ICollection<Product> Products { get; set; } = new List<Product>();
    }
}
