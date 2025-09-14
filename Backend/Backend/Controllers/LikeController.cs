using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LikeController : ControllerBase
    {
        private readonly AppDbContext _context;

        public LikeController(AppDbContext context)
        {
            _context = context;
        }

        // POST: api/like/{drawingId} -> Like a drawing (User only)
        [HttpPost("{drawingId}")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> LikeDrawing(int drawingId)
        {
            var userId = User.FindFirst("userId")?.Value;
            if (userId == null) return Unauthorized("Invalid token");

            bool alreadyLiked = await _context.Likes
                .AnyAsync(l => l.UserId == int.Parse(userId) && l.DrawingId == drawingId);

            if (alreadyLiked)
                return BadRequest("You already liked this drawing.");

            var like = new Like
            {
                UserId = int.Parse(userId),
                DrawingId = drawingId
            };

            _context.Likes.Add(like);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Drawing liked successfully!" });
        }

        //  DELETE: api/like/{drawingId} -> Unlike a drawing (User only)
        [HttpDelete("{drawingId}")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> UnlikeDrawing(int drawingId)
        {
            var userId = User.FindFirst("userId")?.Value;
            if (userId == null) return Unauthorized("Invalid token");

            var like = await _context.Likes
                .FirstOrDefaultAsync(l => l.UserId == int.Parse(userId) && l.DrawingId == drawingId);

            if (like == null) return NotFound("Like not found.");

            _context.Likes.Remove(like);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Drawing unliked successfully!" });
        }

        //  GET: api/like/user/{userId} -> User's liked drawings
        [HttpGet("user/{userId}")]
        [Authorize(Roles = "User,Admin")] // both can check
        public async Task<ActionResult<IEnumerable<int>>> GetUserLikes(int userId)
        {
            var likedDrawings = await _context.Likes
                .Where(l => l.UserId == userId)
                .Select(l => l.DrawingId)
                .ToListAsync();

            return Ok(likedDrawings);
        }

        //  GET: api/like/count/{drawingId} -> Like count for a drawing
        [HttpGet("count/{drawingId}")]
        [Authorize(Roles = "User,Admin")]
        public async Task<ActionResult<int>> GetLikeCount(int drawingId)
        {
            var count = await _context.Likes.CountAsync(l => l.DrawingId == drawingId);
            return Ok(count);
        }

        //  ADMIN: Get all likes for a specific drawing
        [HttpGet("drawing/{drawingId}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> GetLikesForDrawing(int drawingId)
        {
            var likes = await _context.Likes
                .Include(l => l.User)
                .Where(l => l.DrawingId == drawingId)
                .Select(l => new
                {
                    l.LikeId,
                    UserId = l.UserId,
                    Username = l.User.Username,
                    DrawingId = l.DrawingId
                })
                .ToListAsync();

            return Ok(likes);
        }

        //  ADMIN: Get summary of likes for all drawings
        [HttpGet("summary")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> GetLikesSummary()
        {
            var summary = await _context.Likes
                .GroupBy(l => l.DrawingId)
                .Select(g => new
                {
                    DrawingId = g.Key,
                    TotalLikes = g.Count()
                })
                .ToListAsync();

            return Ok(summary);
        }
    }
}
