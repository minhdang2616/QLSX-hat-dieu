FROM mcr.microsoft.com/dotnet/sdk:8.0-alpine AS build
ENV DOTNET_CLI_TELEMETRY_OPTOUT=1 \
    DOTNET_NOLOGO=1 \
    DOTNET_SYSTEM_GLOBALIZATION_INVARIANT=1 \
    MSBUILDDISABLENODEREUSE=1
WORKDIR /src
COPY QlsxHatDieu.Api.csproj ./
RUN dotnet restore
COPY . .
RUN dotnet publish -c Release -o /app --no-restore -m:1 -p:UseSharedCompilation=false

FROM mcr.microsoft.com/dotnet/aspnet:8.0-alpine
WORKDIR /app
COPY --from=build /app .
ENV DOTNET_SYSTEM_GLOBALIZATION_INVARIANT=1 \
    DOTNET_EnableWriteXorExecute=0 \
    DOTNET_TieredPGO=0 \
    DOTNET_gcConcurrent=0
CMD echo "PORT=$PORT"; dotnet --info | head -15; echo STARTING_APP; ASPNETCORE_URLS=http://+:${PORT:-8080} exec dotnet QlsxHatDieu.Api.dll