namespace Pabellon.Core.Models
{
    public class Catalog
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Img { get; set; }
        public int Order {  get; set; }
        public DateTime? ExpirationDate { get; set; }
    }
}
