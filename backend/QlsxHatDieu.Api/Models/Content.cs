namespace QlsxHatDieu.Api.Models;

/// <summary>A block of editable website content (e.g. the "hero" section of the home page).</summary>
public class Content
{
    public int Id { get; set; }
    public string Page { get; set; } = "";
    public string Section { get; set; } = "";
    public string Title { get; set; } = "";
    public string? Description { get; set; }
    public string? Image { get; set; }
    public int SortOrder { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    public List<ContentItem> Items { get; set; } = new();
}

/// <summary>A card / bullet / step that belongs to a Content section.</summary>
public class ContentItem
{
    public int Id { get; set; }
    public int ContentId { get; set; }
    public string Title { get; set; } = "";
    public string? Description { get; set; }
    public int SortOrder { get; set; }
}
