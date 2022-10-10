using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections;
using TweetAppAPI.Models;
using TweetAppAPI.Repository;

namespace TweetAppAPI.Controllers
{
    [ApiController]
    [Route("api/v1.0/[controller]")]
    public class TweetAppController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly ITweetRepository _tweetRepository;

        public TweetAppController(IUserRepository userRepository, ITweetRepository tweetRepository)
        {
            _userRepository = userRepository;
            _tweetRepository = tweetRepository;
        }

        [HttpPost]
        [Route("register")]
        public IActionResult Register(User user)
        {
            var response = _userRepository.Register(user);

            if (response == 1)
            {
                return BadRequest("Login Id already exists..!!");
            }
            else if (response == 2)
            {
                return BadRequest("Email address already exists..!!");
            }
            else
            {
                return Ok();
            }
        }

        [HttpPost]
        [Route("login")]
        public IActionResult Login(User user)
        {
            var response = _userRepository.Login(user.LoginId, user.Password);            
            if (response == 1)
            {
                return Ok("Login Id is Incorrect..!!");
            }
            else if (response == 2)
            {
                return Ok("Password is Incorrect..!!");
            }
            else
            {
                ArrayList list = new ArrayList();
                list.Add(user.LoginId);
                return Ok(list);
            }
        }

      

        [HttpGet]
        [Route("fetchUserDetails/{loginId}")]
        public IActionResult FetchUserDetails(string loginId)
        {
            var response = _userRepository.FetchUserDetails(loginId);

            if(response != null)
                return Ok(response);
            else
                return Unauthorized("Login Id does not exists..!!");
        }

        [HttpPost]
        [Route("requestOTP")]
        public IActionResult RequestOTP(User user)
        {
            var response = _userRepository.RequestOTP(user.LoginId);

            if(response != null)
            {
                return Ok(response);
            }
            else
                return Unauthorized("Login Id does not exists..!!");
        }

        [HttpPost]
        [Route("resetPassword")]
        public IActionResult ResetPassword(User user)
        {
            var response = _userRepository.ResetPassword(user.LoginId, user.Password);
            if (response == 0)
            {
                return Ok();
            }
            else
                return BadRequest("Failed to Reset Password..!!");
        }

        [HttpGet]
        [Route("tweets")]
        public IActionResult GetAllTweets()
        {
            return Ok(_tweetRepository.GetAllTweets());
        }

        [HttpGet]
        [Route("tweets/{loginId}")]
        public IActionResult GetMyTweets(string loginId)
        {
            return Ok(_tweetRepository.GetMyTweets(loginId));
        }

        [HttpGet]
        [Route("tweets/getAllUsers")]
        public IActionResult GetAllUsers()
        {
            return Ok(_userRepository.GetAllUsers());
        }

        [HttpPost]
        [Route("tweets/{tweet}")]
        public IActionResult PostTweet(Tweet tweet)
        {
            var response = _tweetRepository.PostTweet(tweet);
            if (response == 1)
            {
                return BadRequest("Failed to Post Tweet..!!");
            }
            else
            {
                return Ok();
            }
        }

        [HttpPut]
        [Route("tweets/editTweet")]
        public IActionResult EditTweet(Tweet tweet)
        {
            var response = _tweetRepository.UpdateTweet(tweet);
            if (response == 1)
            {
                return BadRequest("Failed to update the Tweet..!!");
            }
            else
            {
                return Ok();
            }
        }

        [HttpPost]
        [Route("tweets/deleteTweet")]
        public IActionResult DeleteTweet(Tweet tweet)
        {
            var response = _tweetRepository.DeleteTweet(tweet);
            if (response == 1)
            {
                return BadRequest("Failed to delete the Tweet..!!");
            }
            else
            {
                return Ok();
            }
        }

        [HttpPost]
        [Route("postReply/{reply}")]
        public IActionResult PostReply(Reply reply)
        {
            var response = _tweetRepository.PostReply(reply);
            if (response == 1)
            {
                return BadRequest("Failed to Reply..!!");
            }
            else
            {
                return Ok();
            }
        }

        [HttpPost]
        [Route("tweets/likeTweet")]
        public IActionResult LikeTweet(Like like)
        {
            var response = _tweetRepository.LikeTweet(like);

            if (response == 1)
            {
                return BadRequest("Failed to Like the Tweet..!!");
            }
            else
            {
                return Ok();
            }
        }
    }
}
