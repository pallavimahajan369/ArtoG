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
    public class SketchesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SketchesController(AppDbContext context)
        {
            _context = context;
        }

        //  GET all sketches (Everyone)
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SketchReadDto>>> GetAll()
        {
            var sketches = await _context.Sketches.Include(s => s.User)
                .OrderByDescending(s => s.CreatedAt)
                .ToListAsync();

            return sketches.Select(s => new SketchReadDto
            {
                DrawingId = s.DrawingId,
                Title = s.Title,
                Description = s.Description,
                ImageBase64 = Convert.ToBase64String(s.ImageData),
                UploadedBy = s.UploadedBy,
                UploadedByName = s.User.Username,
                CreatedAt = s.CreatedAt
            }).ToList();
        }

        //  GET single sketch
        [HttpGet("{id}")]
        public async Task<ActionResult<SketchReadDto>> GetById(int id)
        {
            var sketch = await _context.Sketches.Include(s => s.User)
                .FirstOrDefaultAsync(s => s.DrawingId == id);

            if (sketch == null) return NotFound();

            return new SketchReadDto
            {
                DrawingId = sketch.DrawingId,
                Title = sketch.Title,
                Description = sketch.Description,
                ImageBase64 = Convert.ToBase64String(sketch.ImageData),
                UploadedBy = sketch.UploadedBy,
                UploadedByName = sketch.User.Username,
                CreatedAt = sketch.CreatedAt
            };
        }

        //[Authorize]
        //[HttpGet("whoami")]
        //public IActionResult WhoAmI()
        //{
        //    return Ok(User.Claims.Select(c => new { c.Type, c.Value }));
        //}


        //  POST (Only Admin)
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> Create([FromForm] SketchCreateDto dto)

        {

            var claims = User.Claims.Select(c => new { c.Type, c.Value }).ToList();
            Console.WriteLine(System.Text.Json.JsonSerializer.Serialize(claims));


            var userIdClaim = User.FindFirst("userId")?.Value;
            if (string.IsNullOrEmpty(userIdClaim))
                return Unauthorized("Invalid token!");

            using var ms = new MemoryStream();
            await dto.ImageFile.CopyToAsync(ms);

            var sketch = new Sketch
            {
                Title = dto.Title,
                Description = dto.Description,
                ImageData = ms.ToArray(),
                UploadedBy = int.Parse(userIdClaim)
            };

            _context.Sketches.Add(sketch);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Sketch uploaded successfully" });
        }

        //  PUT (Only Admin)
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> Update(int id, [FromForm] SketchCreateDto dto)
        {
            var sketch = await _context.Sketches.FindAsync(id);
            if (sketch == null) return NotFound();

            sketch.Title = dto.Title;
            sketch.Description = dto.Description;

            if (dto.ImageFile != null)
            {
                using var ms = new MemoryStream();
                await dto.ImageFile.CopyToAsync(ms);
                sketch.ImageData = ms.ToArray();
            }

            await _context.SaveChangesAsync();
            return Ok(new { message = "Sketch updated successfully" });
        }

        //  DELETE (Only Admin)
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> Delete(int id)
        {
            var sketch = await _context.Sketches.FindAsync(id);
            if (sketch == null) return NotFound();

            _context.Sketches.Remove(sketch);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Sketch deleted successfully" });
        }

        //  Get all sketches by AdminId (Admin only)
        [HttpGet("admin/{adminId}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<IEnumerable<SketchReadDto>>> GetByAdmin(int adminId)
        {
            var sketches = await _context.Sketches.Include(s => s.User)
                .Where(s => s.UploadedBy == adminId)
                .ToListAsync();

            return sketches.Select(s => new SketchReadDto
            {
                DrawingId = s.DrawingId,
                Title = s.Title,
                Description = s.Description,
                ImageBase64 = Convert.ToBase64String(s.ImageData),
                UploadedBy = s.UploadedBy,
                UploadedByName = s.User.Username,
                CreatedAt = s.CreatedAt
            }).ToList();
        }
    }
}
