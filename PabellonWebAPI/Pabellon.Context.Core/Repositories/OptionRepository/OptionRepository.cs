using Microsoft.EntityFrameworkCore;
using Pabellon.Context.Core.Models;
using Pabellon.Context.Core.Repositories.OptionsRepository;
using Pabellon.Core;

namespace Pabellon.Context.Core.Repositories.OptionRepository
{
    public class OptionRepository : IOptionRepository
    {
        private readonly PabellonDbContext _context;

        public OptionRepository(PabellonDbContext context)
        {
            _context = context;
        }

        public async Task<bool> CreateOption(Option option)
        {
            try
            {
                _context.Add(option);
                return await _context.SaveChangesAsync() > 0;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error creating option: {ex.Message}", ex);
            };
        }

        public async Task<List<Option>> GetAllOptions()
        {
            return await _context.Options.ToListAsync();
        }

        public async Task<Option?> GetById(int id)
        {
            return await _context.Options.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<List<Option>> GetByIds(IEnumerable<int> ids)
        {
            return await _context.Options.Where(o => ids.Contains(o.Id)).ToListAsync();
        }

        public async Task<Option?> GetOptionByName(string optionName)
        {
            return await _context.Options.Where(o => o.OptionName == optionName).FirstOrDefaultAsync();
        }

        public async Task<bool> DeleteOption(int id)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                var option = await _context.Options
                                           .Include(o => o.Products)
                                           .FirstOrDefaultAsync(o => o.Id == id);

                if (option == null)
                {
                    return false;
                }

                // Limpiar relaciones
                option.Products.Clear();
                await _context.SaveChangesAsync();

                // Eliminar la opción
                _context.Options.Remove(option);
                await _context.SaveChangesAsync();

                // Confirmar la transacción
                await transaction.CommitAsync();
                return true;
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                throw new Exception($"Error deleting option: {ex.Message}", ex);
            }
        }


        public async Task<bool> UpdateOption(Option option)
        {
            try
            {
                _context.Options.Update(option);
                return await _context.SaveChangesAsync() > 0;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error updating option: {ex.Message}", ex);
            }
        }

        public async Task<Option> GetOptionById(int id)
        {
            var option = await _context.Options.FirstOrDefaultAsync(x => x.Id == id);
            if (option == null)
            {
                throw new Exception($"Option with id {id} not found.");
            }
            return option;
        }

        public async Task<List<string>> GetProductsNameWithOptionId(int optionId)
        {
            var productsName = await _context.Product
                .Where(p => p.Options.Any(o => o.Id == optionId))
                .Select(p => p.Name)
                .ToListAsync();

            return productsName;
        }
    }
}
