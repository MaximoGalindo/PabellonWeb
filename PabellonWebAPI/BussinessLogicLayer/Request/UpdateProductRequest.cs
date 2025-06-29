﻿using Microsoft.AspNetCore.Http;

namespace BussinessLogicLayer.Request
{
    public class UpdateProductRequest
    {
        public string Name { get; set; }
        public double Price { get; set; }
        public string CatalogId { get; set; }
        public string Description { get; set; }
        public int Quantity { get; set; }
        public List<int> OptionIds { get; set; } = new List<int>();
        public IFormFile? Image { get; set; }
    }
}
