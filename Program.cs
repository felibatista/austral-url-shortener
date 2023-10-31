using url_shortener.Data;
using url_shortener.Models;
using url_shortener.Models.Repository;
using url_shortener.Models.Repository.Implementations;
using url_shortener.Models.Repository.Interface;
using XYZRepository = url_shortener.Models.Repository.Implementations.XYZRepository;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<UrlShortenerContext>();
builder.Services.AddControllers();
builder.Services.AddScoped<IXYZRepository, XYZRepository>();
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
builder.Services.AddScoped<APIException>();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

using (var context = new UrlShortenerContext())
{
    context.Database.EnsureCreated();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();