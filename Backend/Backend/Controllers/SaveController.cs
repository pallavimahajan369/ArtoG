using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SaveController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SaveController(AppDbContext context)
        {
            _context = context;
        }

        // POST: api/save/{drawingId}
        [Authorize(Roles = "User,Admin")] // ✅ Only logged-in users
        [HttpPost("{drawingId}")]
        public async Task<IActionResult> SaveDrawing(int drawingId)
        {
            var userId = int.Parse(User.FindFirst("userId").Value);

            // Check if already saved
            if (await _context.Saves.AnyAsync(s => s.UserId == userId && s.DrawingId == drawingId))
                return BadRequest(new { message = "Already saved!" });

            var save = new Save
            {
                UserId = userId,
                DrawingId = drawingId
            };

            _context.Saves.Add(save);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Drawing saved successfully!" });
        }

        // DELETE: api/save/{drawingId}
        [Authorize(Roles = "User,Admin")]
        [HttpDelete("{drawingId}")]
        public async Task<IActionResult> RemoveSave(int drawingId)
        {
            var userId = int.Parse(User.FindFirst("userId").Value);

            var save = await _context.Saves.FirstOrDefaultAsync(s => s.UserId == userId && s.DrawingId == drawingId);
            if (save == null)
                return NotFound(new { message = "Save not found!" });

            _context.Saves.Remove(save);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Drawing removed from saves!" });
        }

        // GET: api/save/user/{userId}
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetUserSaves(int userId)
        {
            var saves = await _context.Saves
                .Where(s => s.UserId == userId)
                .Include(s => s.Sketch) // assuming relation exists
                .ToListAsync();

            return Ok(saves);
        }
    }
}
