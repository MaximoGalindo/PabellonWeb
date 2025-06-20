using System.Collections.Generic;

namespace BussinessLogicLayer.Reponses
{
    public class OptionGroupResponse
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public int MaxQuantity { get; set; }
        public List<int> OptionIds { get; set; } = new List<int>();
    }
}
