using System;
using System.Collections.Generic;
using System.Linq;
using System.Resources;
using System.Text;
using System.Threading.Tasks;

namespace GlobalResourses
{
    public static class ResourceAccessor
    {
        public static string GetString(string resourceName)
        {
            return GlobalResourses.Resourses.ResourceManager.GetString(resourceName);
        }
    }
}
