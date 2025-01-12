using Pabellon.Context.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pabellon.Core.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Image {  get; set; }
        public double Price { get; set; }
        public Catalog Catalog { get; set; }
        public int Units { get; set; }
        public ICollection<Option> Options { get; set; } = new List<Option>();
        public string? Observation { get; set; }
    }
}
