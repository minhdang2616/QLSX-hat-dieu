using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QlsxHatDieu.Api.Data;
using QlsxHatDieu.Api.Dtos;

namespace QlsxHatDieu.Api.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _db;
    public AuthController(AppDbContext db) => _db = db;

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest req)
    {
        if (string.IsNullOrWhiteSpace(req.Username) || string.IsNullOrEmpty(req.Password))
            return BadRequest(new { error = "Vui lòng nhập đầy đủ thông tin" });

        var user = await _db.Users.FirstOrDefaultAsync(u => u.Username == req.Username);
        if (user is null || !BCrypt.Net.BCrypt.Verify(req.Password, user.PasswordHash))
            return Unauthorized(new { error = "Tài khoản hoặc mật khẩu không đúng" });

        if (user.Role != "ADMIN")
            return StatusCode(403, new { error = "Tài khoản không có quyền Admin" });

        return Ok(new { id = user.Id, username = user.Username, name = user.Name ?? user.Username });
    }
}
