FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ENV DOTNET_CLI_TELEMETRY_OPTOUT=1 \
    DOTNET_NOLOGO=1 \
    MSBUILDDISABLENODEREUSE=1
WORKDIR /src
COPY QlsxHatDieu.Api.csproj ./
RUN dotnet restore
COPY . .
RUN dotnet publish -c Release -o /app --no-restore -m:1 -p:UseSharedCompilation=false

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app .
ENV DOTNET_EnableWriteXorExecute=0 \
    DOTNET_TieredPGO=0 \
    DOTNET_gcServer=0 \
    DOTNET_GCHeapHardLimit=0x10000000
ENTRYPOINT ["sh", "-c", "ASPNETCORE_URLS=http://+:${PORT:-8080} exec dotnet QlsxHatDieu.Api.dll"]