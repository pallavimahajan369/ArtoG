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


        //  GET all sketches (User - Only Active)
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SketchReadDto>>> GetAll()
        {
            var sketches = await _context.Sketches
                 .Include(s => s.User)
                    .Where(s => s.IsActive)   
                    .OrderBy(s => s.CreatedAt) 
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

        //  GET single sketch (User - Only Active)
        [HttpGet("{id}")]
        public async Task<ActionResult<SketchReadDto>> GetById(int id)
        {
            var sketch = await _context.Sketches
                .Include(s => s.User)
                .FirstOrDefaultAsync(s => s.DrawingId == id && s.IsActive);

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

        

        //  GET all sketches (Admin - Active + Inactive)
        [HttpGet("admin/all")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<IEnumerable<SketchReadDto>>> GetAllAdmin()
        {
            var sketches = await _context.Sketches
                .Include(s => s.User)
                .OrderBy(s => s.CreatedAt)
                .ToListAsync(); //  No filter

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

        //  GET single sketch (Admin - Active + Inactive)
        [HttpGet("admin/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<SketchReadDto>> GetByIdAdmin(int id)
        {
            var sketch = await _context.Sketches
                .Include(s => s.User)
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

        //  Get all sketches uploaded by a specific Admin (Admin only)
        [HttpGet("admin/byuser/{adminId}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<IEnumerable<SketchReadDto>>> GetByAdmin(int adminId)
        {
            var sketches = await _context.Sketches
                .Include(s => s.User)
                .Where(s => s.UploadedBy == adminId) //  No IsActive filter
                .ToListAsync();

            return sketches.Select(s => new SketchReadDto
            {
                DrawingId = s.DrawingId,
                Title = s.Title,
                Description = s.Description,
                ImageBase64 = Convert.ToBase64String(s.ImageData),
                UploadedBy = s.UploadedBy,
                UploadedByName = s.User.Username,
                CreatedAt = s.CreatedAt,
                IsActive = s.IsActive 
            }).ToList();
        }

       

        //  POST (Only Admin)
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> Create([FromForm] SketchCreateDto dto)
        {
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
                UploadedBy = int.Parse(userIdClaim),
                IsActive = true 
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



        //  SOFT DELETE (Only Admin)
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> SoftDelete(int id)
        {
            var sketch = await _context.Sketches.FindAsync(id);
            if (sketch == null) return NotFound();

            sketch.IsActive = false;
            _context.Sketches.Update(sketch);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Sketch soft deleted successfully" });
        }


        //  RESTORE (Only Admin)
        [HttpPost("restore/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> Restore(int id)
        {
            var sketch = await _context.Sketches.FindAsync(id);
            if (sketch == null) return NotFound();

            sketch.IsActive = true; // Restore
            _context.Sketches.Update(sketch);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Sketch restored successfully" });
        }
    }
}
