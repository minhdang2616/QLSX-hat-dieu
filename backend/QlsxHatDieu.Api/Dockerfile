FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY QlsxHatDieu.Api.csproj ./
RUN dotnet restore
COPY . .
RUN dotnet publish -c Release -o /app --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app .
# Railway / Render inject $PORT; fall back to 8080.
ENTRYPOINT ["sh", "-c", "ASPNETCORE_URLS=http://+:${PORT:-8080} exec dotnet QlsxHatDieu.Api.dll"]
