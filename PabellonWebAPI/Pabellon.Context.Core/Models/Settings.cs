using System.ComponentModel.DataAnnotations;

namespace Pabellon.Context.Core.Models
{
    public class Settings
    {
        [Key]
        public string Key { get; set; }
        public string Value { get; set; }
    }
}
