using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Like
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int LikeId { get; set; }  // PK, Auto Increment

        // Foreign Key to User
        [ForeignKey("User")]
        public int UserId { get; set; }
        public User User { get; set; }   // Navigation property

        // Foreign Key to Sketch
        [ForeignKey("Sketch")]
        public int DrawingId { get; set; }
        public Sketch Sketch { get; set; }   // Navigation property
    }
}
