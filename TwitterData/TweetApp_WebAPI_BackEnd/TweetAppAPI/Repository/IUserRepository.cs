using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TweetAppAPI.Models;

namespace TweetAppAPI.Repository
{
    public interface IUserRepository
    {
        public List<User> GetAllUsers();
        public User FetchUserDetails(string loginId);
        public User GetUserByLoginId(string loginId);
        public int Login(string loginId, string password);
        public int Register(User user);
        public string RequestOTP(string loginId);
        public int ResetPassword(string loginId, string password);
    }
}
