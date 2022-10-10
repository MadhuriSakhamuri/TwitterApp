using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TweetAppAPI.Models;

namespace TweetAppAPI.DbContext
{
    public class MongoDbContext : IMongoDbContext
    {
        private readonly IMongoDatabase _database;
        public MongoDbContext(IMongoClient mongoClient)
        {
            _database = mongoClient.GetDatabase("TweetAppDB");
        }

        public IMongoCollection<User> GetUserCollection()
        {
            return _database.GetCollection<User>("UserData");
        }

        public IMongoCollection<Tweet> GetTweetCollection()
        {
            return _database.GetCollection<Tweet>("TweetData");
        }
    }
}
