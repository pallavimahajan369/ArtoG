namespace Backend.DTO
{
    public class SketchCreateDto
    {
        public string Title { get; set; }
        public string? Description { get; set; }
        public IFormFile ImageFile { get; set; }   
    }

}
