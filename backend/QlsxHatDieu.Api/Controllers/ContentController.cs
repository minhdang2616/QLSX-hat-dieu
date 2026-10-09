using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QlsxHatDieu.Api.Data;
using QlsxHatDieu.Api.Dtos;
using QlsxHatDieu.Api.Models;

namespace QlsxHatDieu.Api.Controllers;

[ApiController]
[Route("api/content")]
public class ContentController : ControllerBase
{
    private readonly AppDbContext _db;
    public ContentController(AppDbContext db) => _db = db;

    // GET /api/content            -> everything
    // GET /api/content?page=home  -> one page
    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] string? page)
    {
        var query = _db.Contents.AsNoTracking().Include(c => c.Items).AsQueryable();
        if (!string.IsNullOrWhiteSpace(page)) query = query.Where(c => c.Page == page);

        var list = await query
            .OrderBy(c => c.Page).ThenBy(c => c.SortOrder).ThenBy(c => c.Id)
            .ToListAsync();

        foreach (var c in list) c.Items = c.Items.OrderBy(i => i.SortOrder).ThenBy(i => i.Id).ToList();
        return Ok(list);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var c = await _db.Contents.AsNoTracking().Include(x => x.Items).FirstOrDefaultAsync(x => x.Id == id);
        return c is null ? NotFound(new { error = "Không tìm thấy nội dung" }) : Ok(c);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] ContentRequest req)
    {
        if (!IsValid(req)) return BadRequest(new { error = "Thiếu thông tin bắt buộc" });

        var content = new Content();
        Apply(content, req);
        _db.Contents.Add(content);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = content.Id }, content);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] ContentRequest req)
    {
        if (!IsValid(req)) return BadRequest(new { error = "Thiếu thông tin bắt buộc" });

        var content = await _db.Contents.Include(c => c.Items).FirstOrDefaultAsync(c => c.Id == id);
        if (content is null) return NotFound(new { error = "Không tìm thấy nội dung" });

        _db.ContentItems.RemoveRange(content.Items);
        content.Items = new List<ContentItem>();
        Apply(content, req);
        content.UpdatedAt = DateTime.UtcNow;

        await _db.SaveChangesAsync();
        return Ok(content);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var content = await _db.Contents.FindAsync(id);
        if (content is null) return NotFound(new { error = "Không tìm thấy nội dung" });

        _db.Contents.Remove(content); // items are removed by cascade
        await _db.SaveChangesAsync();
        return Ok(new { message = "Xóa nội dung thành công" });
    }

    private static bool IsValid(ContentRequest? r) =>
        r is not null
        && !string.IsNullOrWhiteSpace(r.Page)
        && !string.IsNullOrWhiteSpace(r.Section)
        && !string.IsNullOrWhiteSpace(r.Title);

    private static string? NullIfEmpty(string? s) => string.IsNullOrWhiteSpace(s) ? null : s;

    private static void Apply(Content c, ContentRequest r)
    {
        c.Page = r.Page!.Trim();
        c.Section = r.Section!.Trim();
        c.Title = r.Title!.Trim();
        c.Description = NullIfEmpty(r.Description);
        c.Image = NullIfEmpty(r.Image?.Trim());
        c.SortOrder = r.SortOrder;

        foreach (var i in (r.Items ?? new()).Where(i => !string.IsNullOrWhiteSpace(i.Title)))
        {
            c.Items.Add(new ContentItem
            {
                Title = i.Title!.Trim(),
                Description = NullIfEmpty(i.Description),
                SortOrder = i.SortOrder,
            });
        }
    }
}
