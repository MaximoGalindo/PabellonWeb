using BussinessLogicLayer.Helpers;
using BussinessLogicLayer.Services.Catalog;
using BussinessLogicLayer.Services.Products;
using Microsoft.EntityFrameworkCore;
using Pabellon.Context.Core.Repositories.CatalogRepository;
using Pabellon.Context.Core.Repositories.OptionRepository;
using Pabellon.Context.Core.Repositories.OptionsRepository;
using Pabellon.Context.Core.Repositories.ProductRepository;
using Pabellon.Context.Core.Repositories.UserRepository;
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
            var databasePath = Path.Combine(solutionDirectory, "Pabellon.Context.Core", "DataBase", "pabellon.db");

            builder.Services.AddDbContext<PabellonDbContext>(options =>
                options.UseSqlite($"Data Source={databasePath}"));

     
            builder.Services.AddScoped<ProductService>();
            builder.Services.AddScoped<CatalogService>();
            builder.Services.AddScoped<ImagesHelper>();
            builder.Services.AddScoped<IProductRepository, ProductRepository>();
            builder.Services.AddScoped<ICatalogRepository, CatalogRepository>();
            builder.Services.AddScoped<IOptionRepository, OptionRepository>();

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowSpecificOrigins", policy =>
                {
                    policy.AllowAnyOrigin() // Dominios permitidos
                          .AllowAnyHeader() // Permite cualquier encabezado
                          .AllowAnyMethod(); // Permite cualquier método HTTP
                });
            });


            string basePath = Path.Combine("C:\\", "Pabellon", "Imagenes");
            if (!Directory.Exists(basePath))
            {
                Directory.CreateDirectory(basePath);
            }

            var app = builder.Build();
            app.UseCors("AllowSpecificOrigins");
            app.UseMiddleware<ExceptionHandlerMiddleware>();

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
