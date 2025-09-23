namespace Backend.DTO
{
    public class SketchReadDto
    {
        public int DrawingId { get; set; }
        public string Title { get; set; }
        public string? Description { get; set; }
        public string ImageBase64 { get; set; }   // Convert byte[] → Base64 string
        public int UploadedBy { get; set; }
        public string UploadedByName { get; set; }
        public DateTime CreatedAt { get; set; }
        public bool IsActive { get; set; }
    }

}
