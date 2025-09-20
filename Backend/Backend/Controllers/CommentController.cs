using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Models;
using Backend.DTOs;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    
    public class CommentController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CommentController(AppDbContext context)
        {
            _context = context;
        }

        //  Get all comments for a drawing
        [HttpGet("drawing/{drawingId}")]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<CommentReadDto>>> GetCommentsForDrawing(int drawingId)
        {
            var comments = await _context.Comments
                .Where(c => c.DrawingId == drawingId)
                .Include(c => c.User)
                .OrderByDescending(c => c.CreatedAt)
                .Select(c => new CommentReadDto
                {
                    CommentId = c.CommentId,
                    DrawingId = c.DrawingId,
                    UserId = c.UserId,
                    Content = c.Content,
                    CreatedAt = c.CreatedAt,
                    UserName = c.User.Username
                })
                .ToListAsync();

            return Ok(comments);
        }

        //  Post a comment (UserId comes from JWT)
        [HttpPost("drawing/{drawingId}")]
        [Authorize]
        public async Task<ActionResult<CommentReadDto>> PostComment(int drawingId, [FromBody] CommentCreateDto dto)
        {
            var drawing = await _context.Sketches.FindAsync(drawingId);
            if (drawing == null)
                return NotFound("Drawing not found");

            //   logged-in userId from JWT
            var userId = int.Parse(User.FindFirst(("userId"))?.Value ?? "0");

            if (userId == 0)
                return Unauthorized("User not authenticated");

            var comment = new Comment
            {
                DrawingId = drawingId,
                UserId = userId,
                Content = dto.Content,
                CreatedAt = DateTime.UtcNow
            };

            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();

            var user = await _context.Users.FindAsync(userId);

            var result = new CommentReadDto
            {
                CommentId = comment.CommentId,
                DrawingId = comment.DrawingId,
                UserId = comment.UserId,
                Content = comment.Content,
                CreatedAt = comment.CreatedAt,
                UserName = user?.Username ?? "Unknown"
            };

            return CreatedAtAction(nameof(GetCommentsForDrawing), new { drawingId = drawingId }, result);
        }

        //  Delete a comment
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteComment(int id)
        {
            var comment = await _context.Comments.FindAsync(id);
            if (comment == null)
                return NotFound();

            _context.Comments.Remove(comment);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
