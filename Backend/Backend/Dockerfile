# STEP 1: Use the official .NET 8 SDK image to build the project
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy and restore dependencies
COPY *.csproj ./
RUN dotnet restore

# Copy the rest of the source and build the app
COPY . ./
RUN dotnet publish -c Release -o /app/out

# STEP 2: Use the .NET 8 runtime image to run the published app
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

# Copy the published output from the build stage
COPY --from=build /app/out .

# Expose port 
EXPOSE 8080

#  environment variable for ASP.NET
ENV ASPNETCORE_URLS=http://+:8080



# Start the app
ENTRYPOINT ["dotnet", "Backend.dll"]
