using Pabellon.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pabellon.Context.Core.Repositories.CatalogRepository
{
    public interface ICatalogRepository
    {
        Task<Catalog?> GetById(int catalogId);
        Task<List<Catalog>> GetAll();
    }
}
