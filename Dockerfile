FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-env
WORKDIR /app
EXPOSE 8080

COPY "Library.sln" "Library.sln"
COPY "Library.API/Library.API.csproj" "Library.API/Library.API.csproj"
COPY "Library.Application/Library.Application.csproj" "Library.Application/Library.Application.csproj"
COPY "Library.Persistence/Library.Persistence.csproj" "Library.Persistence/Library.Persistence.csproj"
COPY "Library.Domain/Library.Domain.csproj" "Library.Domain/Library.Domain.csproj"
COPY "Library.Tests/Library.Tests.csproj" "Library.Tests/Library.Tests.csproj"

RUN dotnet restore "Library.sln"

COPY . .
RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:8.0 
COPY --from=build-env /app/out .
ENTRYPOINT ["dotnet", "Library.API.dll"]