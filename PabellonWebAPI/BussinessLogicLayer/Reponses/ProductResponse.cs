﻿namespace BussinessLogicLayer.Reponses
{
    public class ProductResponse
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }
        public double Price { get; set; }
        public string Description { get; set; }
        public string CatalogId { get; set; }
        public bool Disabled { get; set; }
        public int Quantity { get; set; }
        public List<OptionResponse> Options { get; set; } = new List<OptionResponse>();
    }

    public class OptionResponse 
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public bool AllowQuantity { get; set; }
        public bool IsSelected { get; set; }
    }

}
