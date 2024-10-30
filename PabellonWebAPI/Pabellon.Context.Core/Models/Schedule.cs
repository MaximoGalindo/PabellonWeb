using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pabellon.Core.Models
{
    public class Schedule
    {
        public int Id { get; set; }
        public DayOfWeek? Day { get; set; }
        public TimeOnly? OpenTime{ get; set; }
        public TimeOnly? CloseTime { get; set; }
        public bool DayOff { get; set; }
    }
}
