using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.DTOs;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ContactController(AppDbContext context)
        {
            _context = context;
        }

        // POST: api/Contact
        [HttpPost]
        public async Task<IActionResult> PostMessage([FromBody] ContactMessage message)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _context.ContactMessages.Add(message);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Message sent successfully!" });
        }

        // GET: api/Contact
        [HttpGet]
        public async Task<IActionResult> GetMessages()
        {
            var messages = await _context.ContactMessages.ToListAsync();
            return Ok(messages);
        }

        // DELETE: api/Contact/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMessage(int id)
        {
            var message = await _context.ContactMessages.FindAsync(id);
            if (message == null)
            {
                return NotFound(new { message = "Message not found" });
            }

            _context.ContactMessages.Remove(message);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Message deleted successfully!" });
        }
        // PUT: api/contactmessages/id/status
        [HttpPut("{id}/status")]
        public async Task<IActionResult> UpdateStatus(int id, [FromBody] ContactStatusDto dto)
        {
            var message = await _context.ContactMessages.FindAsync(id);
            if (message == null)
            {
                return NotFound();
            }

          
            var allowedStatuses = new[] { "New", "Read" };
            if (!allowedStatuses.Contains(dto.Status))
            {
                return BadRequest("Invalid status value.");
            }

            message.Status = dto.Status;
            await _context.SaveChangesAsync();

            return Ok(new { message.Id, message.Status });
        }
    }
}
