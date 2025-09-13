using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int UserId { get; set; }   // PK, Auto Increment

        [Required]
        [MaxLength(50)]
        public string Username { get; set; }   // Unique, Not Null

        [Required]
        [MaxLength(100)]
        public string Email { get; set; }   // Unique, Not Null

        [Required]
        [MaxLength(255)]
        public string PasswordHash { get; set; }   // Not Null

        [MaxLength(20)]
        public string Role { get; set; } = "User";   // Default 'User'

        public DateTime CreatedAt { get; set; } = DateTime.Now; // Default NOW()
        

    }
}
