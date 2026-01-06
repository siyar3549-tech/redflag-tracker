namespace FlaggedServer.Models;

public class UserReview
{
    public int Id { get; set; }
    public string Username { get; set; } = string.Empty; // Instagram kullanıcı adı
    public int RedFlags { get; set; } = 0;
    public string Comment { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}