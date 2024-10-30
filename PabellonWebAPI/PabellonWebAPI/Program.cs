
using Microsoft.EntityFrameworkCore;
using Pabellon.Core;

namespace PabellonWebAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            var solutionDirectory = Directory.GetParent(AppContext.BaseDirectory).Parent.Parent.Parent.Parent.FullName;

            // Construir la ruta a la base de datos
            var databasePath = Path.Combine(solutionDirectory, "Pabellon.Context.Core", "DataBase", "pabellon.db");

            builder.Services.AddDbContext<PabellonDbContext>(options =>
                options.UseSqlite($"Data Source={databasePath}"));

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
