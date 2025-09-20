namespace Backend.DTOs
{
    public class CommentReadDto
    {
        public int CommentId { get; set; }
        public int DrawingId { get; set; }
        public int UserId { get; set; }
        public string Content { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }

        public string? UserName { get; set; }
    }
}
