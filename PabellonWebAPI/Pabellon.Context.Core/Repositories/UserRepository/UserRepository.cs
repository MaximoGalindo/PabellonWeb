using Microsoft.EntityFrameworkCore;
using Pabellon.Context.Core.DTO;
using Pabellon.Core;

namespace Pabellon.Context.Core.Repositories.UserRepository
{
    public class UserRepository : IUserRepository
    {
        private readonly PabellonDbContext _context;

        public UserRepository(PabellonDbContext context)
        {
            _context = context;
        }

        public async Task<UserDTO> GetUserLogin(string username, string password)
        {
            return await _context.User
                .Where(u => u.Login == username && u.Password == password)
                .Select(u => new UserDTO
                {
                    Username = u.Login
                })
                .FirstOrDefaultAsync();
        }
    }
}
