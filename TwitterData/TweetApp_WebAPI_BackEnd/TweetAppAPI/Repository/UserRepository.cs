using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TweetAppAPI.DbContext;
using TweetAppAPI.Models;
using TweetAppAPI.Services;

namespace TweetAppAPI.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly IMongoCollection<User> _users;
        private readonly IEmailService _emailService;

        public UserRepository(IMongoDbContext dbContext, IEmailService emailService)
        {
            _users = dbContext.GetUserCollection();
            _emailService = emailService;
        }

        public List<User> GetAllUsers()
        {
            return _users.Find(user => true).SortByDescending(s => s.Id).ToList();
        }

        public User GetUserByLoginId(string loginId)
        {
            return _users.Find(user => user.LoginId == loginId).FirstOrDefault();
        }
        private User GetUserByEmailId(string email)
        {
            return _users.Find(user => user.Email == email).FirstOrDefault();
        }
        public User FetchUserDetails(string loginId)
        {
            var result = _users.AsQueryable().Where(s => s.LoginId == loginId).Select(s => new { s.FirstName, s.LastName, s.Email,s.LoginId }).FirstOrDefault();
            if (result != null)
            {
                return new User
                {
                    FirstName = result.FirstName,
                    LastName = result.LastName,
                    Email = result.Email,
                    LoginId = result.LoginId
                };
            }
            else 
                return null;
            
        }
        public int Login(string loginId, string password)
        {
            User isExists = GetUserByLoginId(loginId);
            if (isExists != null)
            {
                if (isExists.Password == password)
                    return 0;
                else
                    return 2;
            }
            else
                return 1;
        }

        public int Register(User user)
        {
            User isExists = GetUserByLoginId(user.LoginId);
            if (isExists != null)
            {
                return 1;
            }
            isExists = GetUserByEmailId(user.Email);
            if (isExists != null)
            {
                return 2;
            }
            else
            {
                user.Id = Guid.NewGuid().ToString();
                _users.InsertOne(user);
                return 0;
            }

        }
        public string RequestOTP(string loginId)
        {
            var user = GetUserByLoginId(loginId);
            if (user != null)
            {
                string otp = new Random().Next(1000, 9999).ToString();
                _emailService.SendEmail(user.Email, user.FirstName, otp);
                return otp;
            }
            else 
                return null;

        }
        public int ResetPassword(string loginId, string password)
        {
            var result = _users.Find(user => user.LoginId == loginId).FirstOrDefault();
            if (result != null)
            {

                var filter = Builders<User>.Filter.Eq(e => e.LoginId, loginId);

                var update = Builders<User>.Update.Set(e => e.Password, password);

                _users.FindOneAndUpdate(filter, update);

                return 0;
            }
            else
                return 1;
        }
    }
}
