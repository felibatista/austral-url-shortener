using url_shortener.Data;
using url_shortener.Entities;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
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

    var grd1 = new XYZ() { Name = "Test", UrlLong = "Test"};

    context.Urls.Add(grd1);

    context.SaveChanges();

    foreach (var s in context.Urls) {
        Console.WriteLine($"Name: {s.Name}, URL long: {s.UrlLong}");
    }
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();