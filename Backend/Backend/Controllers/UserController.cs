using Backend.Data;
using Backend.DTO;
using Backend.Models;
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
                user.CreatedAt,
                user.IsActive
            });
        }

        // GET /api/user/{id}/saved
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

        // GET /api/user/{id}/liked
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

        //  UPDATE USER
        [HttpPatch("{id}")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> UpdateUserPartial(int id, [FromBody] UserUpdateDto updatedUser)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return NotFound("User not found");

            if (!string.IsNullOrEmpty(updatedUser.Username))
                user.Username = updatedUser.Username;

            if (!string.IsNullOrEmpty(updatedUser.Email))
                user.Email = updatedUser.Email;

            await _context.SaveChangesAsync();
            return Ok(new { message = "User updated successfully" });
        }



        //  DELETE USER (soft delete -> set IsActive = false)
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
                return NotFound("User not found");

            user.IsActive = false;
            await _context.SaveChangesAsync();

            return Ok(new { message = "User deactivated successfully" });
        }

        //  RESTORE USER (set IsActive = true)
        [HttpPatch("{id}/restore")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> RestoreUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
                return NotFound("User not found");

            user.IsActive = true;
            await _context.SaveChangesAsync();

            return Ok(new { message = "User restored successfully" });
        }

        // GET /api/user
        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _context.Users
                .Where(u => u.Role == "User") // filter only users, exclude admin
                .Select(u => new
                {
                    u.UserId,
                    u.Username,
                    u.Email,
                    u.Role,
                    u.CreatedAt,
                    u.IsActive
                })
                .ToListAsync();

            return Ok(users);
        }


    }
}
