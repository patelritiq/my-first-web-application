
// Program.cs is where the app starts.

using StudentApi.Models;
using StudentApi.Data;
using Microsoft.EntityFrameworkCore;

// Prepare a web application.
// Register controllers so requests can reach them.
var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddControllers();

// Register database so it can be injected.
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

//Enable Swagger
//Generate API documentation automatically
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});


var app = builder.Build();

app.UseCors("AllowAngular");


// Configure pipeline
if (app.Environment.IsDevelopment())
{
    // Swagger = testing + documentation tool
    app.UseSwagger();           
    app.UseSwaggerUI();         
}

//app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
