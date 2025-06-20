using System.Collections.Generic;

namespace BussinessLogicLayer.Request
{
    public class OptionGroupRequest
    {
        public string Name { get; set; } = string.Empty;
        public int MaxQuantity { get; set; }
        public List<int> OptionIds { get; set; } = new List<int>();
    }
}
