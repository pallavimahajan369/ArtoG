using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Sketch
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int DrawingId { get; set; }  // PK, Auto Increment

        [Required]
        [MaxLength(100)]
        public string Title { get; set; }   // NOT NULL

        public string? Description { get; set; }   // Nullable (TEXT)

        [Required]
        public byte[] ImageData { get; set; }   // BLOB for storing image bytes

        // Foreign Key to User
        [ForeignKey("User")]
        public int UploadedBy { get; set; }
        public User User { get; set; }   // Navigation property

        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
