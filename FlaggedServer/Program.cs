using FlaggedServer.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// SQLite Bağlantısı
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

// --- CORS AYARI BAŞLANGIÇ (Vercel'in Backend'e erişmesi için) ---
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});
// --- CORS AYARI BİTİŞ ---

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Otomatik Veritabanı Oluşturma
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated(); 
}

// Swagger'ı her zaman aktif edelim (Render'da görmek için if bloğunu dışarı aldık)
app.UseSwagger();
app.UseSwaggerUI();

// --- CORS'U AKTİF ET (Build'den hemen sonra olmalı) ---
app.UseCors();

app.UseHttpsRedirection();
app.MapControllers();
app.Run();