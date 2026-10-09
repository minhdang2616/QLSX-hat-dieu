FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ENV DOTNET_CLI_TELEMETRY_OPTOUT=1 \
    DOTNET_NOLOGO=1 \
    DOTNET_gcServer=0 \
    MSBUILDDISABLENODEREUSE=1
WORKDIR /src
COPY QlsxHatDieu.Api.csproj ./
RUN dotnet restore
COPY . .
RUN dotnet publish -c Release -o /app --no-restore -m:1 -p:UseSharedCompilation=false