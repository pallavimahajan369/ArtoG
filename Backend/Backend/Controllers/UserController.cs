using Backend.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UserController(AppDbContext context)
        {
            _context = context;
        }

        // GET /api/user/{id}
        [HttpGet("{id}")]
        [Authorize(Roles = "User,Admin")]
        public async Task<IActionResult> GetUserDetails(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
                return NotFound();

            return Ok(new
            {
                user.UserId,
                user.Username,
                user.Email,
                user.Role,
                user.CreatedAt
            });
        }

        //  GET /api/user/{id}/saved
        [HttpGet("{id}/saved")]
        [Authorize(Roles = "User,Admin")]
        public async Task<IActionResult> GetSavedDrawings(int id)
        {
            var saved = await _context.Saves
                .Where(s => s.UserId == id)
                .Include(s => s.Sketch)
                .Select(s => new
                {
                    s.Sketch.DrawingId,
                    s.Sketch.Title,
                    s.Sketch.ImageData,
                    s.Sketch.CreatedAt
                })
                .ToListAsync();

            return Ok(saved);
        }

        //  GET /api/user/{id}/liked
        [HttpGet("{id}/liked")]
        [Authorize(Roles = "User,Admin")]
        public async Task<IActionResult> GetLikedDrawings(int id)
        {
            var liked = await _context.Likes
                .Where(l => l.UserId == id)
                .Include(l => l.Sketch)
                .Select(l => new
                {
                    l.Sketch.DrawingId,
                    l.Sketch.Title,
                    l.Sketch.ImageData,
                    LikedAt = l.Sketch.CreatedAt
                })
                .ToListAsync();

            return Ok(liked);
        }
    }
}
