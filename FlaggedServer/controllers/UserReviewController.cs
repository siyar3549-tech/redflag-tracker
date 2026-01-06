using Microsoft.AspNetCore.Mvc;
using FlaggedServer.Models;
using Microsoft.EntityFrameworkCore;

namespace FlaggedServer.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserReviewController : ControllerBase
{
    private readonly AppDbContext _context;

    public UserReviewController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<UserReview>>> GetReviews()
    {
        return await _context.Reviews.ToListAsync();
    }

    [HttpPost]
    public async Task<ActionResult<UserReview>> PostReview(UserReview review)
    {
        _context.Reviews.Add(review);
        await _context.SaveChangesAsync();
        return Ok(review);
    }
}