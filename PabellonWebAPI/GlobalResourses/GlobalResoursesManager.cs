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
        private static readonly ResourceManager resourceManager = GlobalResourses.Resources.GlobalResourses;

        public static string GetString(string resourceName)
        {
            // Usa el ResourceManager para buscar el valor del recurso por su nombre.
            return resourceManager.GetString(resourceName);
        }

        // Usar la reflexión para obtener el valor del recurso por el nombre de la propiedad.
        public static string this[string resourceName]
        {
            get
            {
                // Intenta obtener el recurso usando el ResourceManager
                return GetString(resourceName);
            }
        }
    }
}
