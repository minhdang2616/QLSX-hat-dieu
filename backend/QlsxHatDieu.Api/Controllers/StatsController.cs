using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QlsxHatDieu.Api.Data;

namespace QlsxHatDieu.Api.Controllers;

[ApiController]
[Route("api/stats")]
public class StatsController : ControllerBase
{
    private readonly AppDbContext _db;
    public StatsController(AppDbContext db) => _db = db;

    [HttpGet]
    public async Task<IActionResult> Get() => Ok(new
    {
        contentCount = await _db.Contents.CountAsync(),
        userCount = await _db.Users.CountAsync(),
    });
}
