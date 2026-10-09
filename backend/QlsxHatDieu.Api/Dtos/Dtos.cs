namespace QlsxHatDieu.Api.Dtos;

public record ContentItemRequest(string? Title, string? Description, int SortOrder);

public record ContentRequest(
    string? Page,
    string? Section,
    string? Title,
    string? Description,
    string? Image,
    int SortOrder,
    List<ContentItemRequest>? Items);

public record LoginRequest(string? Username, string? Password);
