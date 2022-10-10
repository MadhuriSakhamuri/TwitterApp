using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TweetAppAPI.Services
{
    public interface IEmailService
    {
        public void SendEmail(string email, string firstName, string otp);
    }
}
