using Microsoft.EntityFrameworkCore;
using Pabellon.Context.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pabellon.Context.Core.Repositories.OptionsRepository
{
    public interface IOptionRepository
    {
        Task<Option?> GetById(int id);
        Task<List<Option>> GetByIds(IEnumerable<int> ids);
    }
}
