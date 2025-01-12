namespace BussinessLogicLayer.Reponses
{
    public class ProductRequest
    {
        public string Name { get; set; }
        public string ImageUrl { get; set; }
        public double Price { get; set; }
        public int CatalogId { get; set; }
        public string Observation { get; set; }
        public int Units { get; set; }
        public List<int> OptionIds { get; set; } = new List<int>();
    }

}
