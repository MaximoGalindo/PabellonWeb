﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//     Runtime Version:4.0.30319.42000
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace GlobalResourses {
    using System;
    
    
    /// <summary>
    ///   A strongly-typed resource class, for looking up localized strings, etc.
    /// </summary>
    // This class was auto-generated by the StronglyTypedResourceBuilder
    // class via a tool like ResGen or Visual Studio.
    // To add or remove a member, edit your .ResX file then rerun ResGen
    // with the /str option, or rebuild your VS project.
    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("System.Resources.Tools.StronglyTypedResourceBuilder", "17.0.0.0")]
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute()]
    [global::System.Runtime.CompilerServices.CompilerGeneratedAttribute()]
    internal class Resourses {
        
        private static global::System.Resources.ResourceManager resourceMan;
        
        private static global::System.Globalization.CultureInfo resourceCulture;
        
        [global::System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1811:AvoidUncalledPrivateCode")]
        internal Resourses() {
        }
        
        /// <summary>
        ///   Returns the cached ResourceManager instance used by this class.
        /// </summary>
        [global::System.ComponentModel.EditorBrowsableAttribute(global::System.ComponentModel.EditorBrowsableState.Advanced)]
        internal static global::System.Resources.ResourceManager ResourceManager {
            get {
                if (object.ReferenceEquals(resourceMan, null)) {
                    global::System.Resources.ResourceManager temp = new global::System.Resources.ResourceManager("GlobalResourses.Resourses", typeof(Resourses).Assembly);
                    resourceMan = temp;
                }
                return resourceMan;
            }
        }
        
        /// <summary>
        ///   Overrides the current thread's CurrentUICulture property for all
        ///   resource lookups using this strongly typed resource class.
        /// </summary>
        [global::System.ComponentModel.EditorBrowsableAttribute(global::System.ComponentModel.EditorBrowsableState.Advanced)]
        internal static global::System.Globalization.CultureInfo Culture {
            get {
                return resourceCulture;
            }
            set {
                resourceCulture = value;
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to El catalogo seleccionado no existe.
        /// </summary>
        internal static string CatalogNonExist {
            get {
                return ResourceManager.GetString("CatalogNonExist", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Error al intentar guardar la opcion.
        /// </summary>
        internal static string ErrorSaveOption {
            get {
                return ResourceManager.GetString("ErrorSaveOption", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Error al intentar guardar el producto.
        /// </summary>
        internal static string ErrorSaveProduct {
            get {
                return ResourceManager.GetString("ErrorSaveProduct", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to La opcion seleccionada no existe.
        /// </summary>
        internal static string OptionNonExist {
            get {
                return ResourceManager.GetString("OptionNonExist", resourceCulture);
            }
        }
    }
}