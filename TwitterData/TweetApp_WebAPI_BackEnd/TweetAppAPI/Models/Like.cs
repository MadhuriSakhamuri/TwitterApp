using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TweetAppAPI.Models
{
    public class Like
    {
        [BsonElement("likeId")]
        public string LikeId { get; set; }
        [BsonElement("likeTimestamp")]
        public string LikeTimestamp { get; set; }
        [BsonElement("likedBy")]
        public string LikedBy { get; set; }
        [BsonElement("likedLoginId")]
        public string LikeLoginId { get; set; }
        [BsonElement("tweetId")]
        public string TweetId { get; set; }
    }
}
