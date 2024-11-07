using BussinessLogicLayer.Reponses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BussinessLogicLayer.Services.Products
{
    public interface IProductService
    {
        Task SaveProduct(ProductRequest request);
    }
}
