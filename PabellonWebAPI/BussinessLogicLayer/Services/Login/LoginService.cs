using Pabellon.Context.Core.DTO;
using Pabellon.Context.Core.Repositories.UserRepository;
using System.Security.Claims;

namespace BussinessLogicLayer.Services.Login
{
    public class LoginService : ILoginService
    {
        private readonly IUserRepository _userRepository;

        public LoginService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<UserDTO> GetUser(string username, string password)
        {
            return await _userRepository.GetUserLogin(username, password);
        }
    }
}
