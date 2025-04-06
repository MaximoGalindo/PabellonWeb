using Pabellon.Context.Core.DTO;

namespace BussinessLogicLayer.Services.Login
{
    public interface ILoginService
    {
        Task<UserDTO> GetUser(string username, string password);
    }
}
