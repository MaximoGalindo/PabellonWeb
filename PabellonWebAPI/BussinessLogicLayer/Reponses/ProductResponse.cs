namespace BussinessLogicLayer.Reponses
{
    public class ProductResponse
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }
        public double Price { get; set; }
        public string CatalogId { get; set; }
        public List<OptionResponse> Options { get; set; } = new List<OptionResponse>();
    }

    public class OptionResponse 
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }   
    }

}
