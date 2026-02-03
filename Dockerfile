# Build stage
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build

# NativeAOT prerequisites
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
       clang zlib1g-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /src
COPY ["WebApp/WebApp.csproj", "WebApp/"]
RUN dotnet restore "WebApp/WebApp.csproj"

COPY . .
WORKDIR /src/WebApp
RUN dotnet publish -c Release -r linux-x64 --self-contained true -o /app/publish

# Runtime stage
FROM mcr.microsoft.com/dotnet/runtime-deps:10.0
WORKDIR /app
COPY --from=build /app/publish .
RUN chmod +x ./WebApp
EXPOSE 8080
ENTRYPOINT ["./WebApp"]
