using BussinessLogicLayer.Helpers;
using BussinessLogicLayer.Services.Catalogs;
using BussinessLogicLayer.Services.Login;
using BussinessLogicLayer.Services.Options;
using BussinessLogicLayer.Services.Products;
using BussinessLogicLayer.Services.Setting;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using Pabellon.Context.Core.Repositories.CatalogRepository;
using Pabellon.Context.Core.Repositories.OptionRepository;
using Pabellon.Context.Core.Repositories.OptionsRepository;
using Pabellon.Context.Core.Repositories.ProductRepository;
using Pabellon.Context.Core.Repositories.SettingsRepository;
using Pabellon.Context.Core.Repositories.UserRepository;
using Pabellon.Core;
using System.Text;

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

     
            builder.Services.AddScoped<IProductService, ProductService>();
            builder.Services.AddScoped<ICatalogService, CatalogService>();
            builder.Services.AddScoped<ILoginService, LoginService>();
            builder.Services.AddScoped<IOptionService, OptionService>();
            builder.Services.AddScoped<ISettingsService, SettingsService>();
            builder.Services.AddScoped<ImagesHelper>();
            builder.Services.AddScoped<IProductRepository, ProductRepository>();
            builder.Services.AddScoped<ICatalogRepository, CatalogRepository>();
            builder.Services.AddScoped<IOptionRepository, OptionRepository>();
            builder.Services.AddScoped<IUserRepository, UserRepository>();
            builder.Services.AddScoped<ISettingsRepository, SettingsRepository>();

            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = false,
                        ValidateAudience = false,
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration.GetSection("JWT:Key").Value))
                    };
                });


            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowSpecificOrigins", policy =>
                {
                    policy.AllowAnyOrigin() // Dominios permitidos
                          .AllowAnyHeader() // Permite cualquier encabezado
                          .AllowAnyMethod(); // Permite cualquier método HTTP
                });
            });

            builder.WebHost.UseUrls("http://localhost:7115");

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

            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(Path.Combine("C:\\", "Pabellon", "Imagenes")),
                RequestPath = "/uploads"
            });

            //app.UseHttpsRedirection();

            app.UseAuthentication();

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
