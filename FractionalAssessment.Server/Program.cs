
using FractionalAssessment.Server.Data;
using MySqlConnector;

using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql;
using Microsoft.Extensions.Configuration;
using FractionalAssessment.Server.Services;

namespace FractionalAssessment.Server
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

			builder.Services.AddDbContext<DefaultContext>( options =>
			{
				var connectionString = builder.Configuration.GetConnectionString("Default");

				if(connectionString != null )
					options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
			});

			builder.Services.AddTransient<BaseballPlayerService, BaseballPlayerService>();
			builder.Services.AddTransient<BaseballPlayerDescriptionService, BaseballPlayerDescriptionService>();

			builder.Services.AddHttpClient();

			var app = builder.Build();

			app.UseDefaultFiles();
			app.UseStaticFiles();

			// Configure the HTTP request pipeline.
			if (app.Environment.IsDevelopment())
			{
				app.UseSwagger();
				app.UseSwaggerUI();
			}

			app.UseHttpsRedirection();

			app.UseAuthorization();

			app.UseCors(builder => builder
				.AllowAnyOrigin()
				.AllowAnyMethod()
				.AllowAnyHeader());

			app.MapControllers();

			app.MapFallbackToFile("/index.html");

			app.Run();
		}
	}
}
