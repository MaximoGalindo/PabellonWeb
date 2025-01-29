﻿using Microsoft.AspNetCore.Http;

namespace BussinessLogicLayer.Reponses
{
    public class ProductRequest
    {
        public string Name { get; set; }
        public double Price { get; set; }
        public string CatalogId { get; set; }
        public string Description { get; set; }
        public List<int> OptionIds { get; set; } = new List<int>();
        public IFormFile Image { get; set; }
    }

}
