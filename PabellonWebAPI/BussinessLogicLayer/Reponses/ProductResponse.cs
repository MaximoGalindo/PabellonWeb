using Pabellon.Context.Core.Models;
using Pabellon.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BussinessLogicLayer.Reponses
{
    public class ProductResponse
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ImageUrl { get; set; }
        public double Price { get; set; }
        public int CatalogId { get; set; }
        public List<OptionResponse> Options { get; set; } = new List<OptionResponse>();
    }

    public class OptionResponse 
    {
        public string Name { get; set; }
        public double Price { get; set; }   
    }

}
