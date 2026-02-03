# Simplify

Using NativeAOT and ILLinker to create a minimal ASP.NET Core Web Application.

## Development

```bash
dotnet run
```

## Production
```bash
dotnet publish -c Release
```

Copy everything apart from any `.pdb` file to the IIS Server.

## Docker

```bash
docker build -t webapp .
docker run -d -p 8080:8080 --name webapp-container webapp

# Save the Docker image to a tar file
docker save webapp -o webapp.tar

# Transfer to Linux Server
scp webapp.tar user@linux-server:/path/to/destination # Or copy to USB/shared drive

# On Linux Production Server

# Copy to working directory
sudo cp /tmp/webapp.tar /opt/docker/
cd /opt/docker/

# Load image (no gunzip needed)
sudo docker load -i webapp.tar

# Verify
docker images  # Shows "webapp" image

# Run production
sudo docker run -d \
  --name webapp-prod \
  --restart unless-stopped \
  -p 80:8080 \
  webapp

```