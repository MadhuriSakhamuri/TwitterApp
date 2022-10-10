using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TweetAppAPI.Models;

namespace TweetAppAPI.Repository
{
    public interface ITweetRepository
    {
        public List<Tweet> GetAllTweets();
        public List<Tweet> GetMyTweets(string loginId);
        public int PostTweet(Tweet tweet);
        public int UpdateTweet(Tweet tweet);
        public int DeleteTweet(Tweet tweet);
        public int PostReply(Reply reply);
        public int LikeTweet(Like like);
      

    }
}
