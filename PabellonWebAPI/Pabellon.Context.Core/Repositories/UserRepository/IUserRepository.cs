using Pabellon.Context.Core.DTO;

namespace Pabellon.Context.Core.Repositories.UserRepository
{
    public interface IUserRepository
    {
        Task<UserDTO> GetUserLogin(string email, string password);
    }
}
