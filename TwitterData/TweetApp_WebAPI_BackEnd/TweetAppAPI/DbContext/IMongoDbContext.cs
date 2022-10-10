using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TweetAppAPI.Models;

namespace TweetAppAPI.DbContext
{
    public interface IMongoDbContext
    {
        public IMongoCollection<User> GetUserCollection();
        public IMongoCollection<Tweet> GetTweetCollection();
    }
}
