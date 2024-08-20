using FractionalAssessment.Server.Data;
using FractionalAssessment.Server.Models;
using FractionalAssessment.Server.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace FractionalAssessment.Server.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class BaseballPlayerController : ControllerBase
	{
		private readonly DefaultContext context;
		private readonly HttpClient httpClient;
		private readonly BaseballPlayerDescriptionService baseballPlayerDescriptionService;

		public BaseballPlayerController(DefaultContext context, HttpClient httpClient, BaseballPlayerDescriptionService baseballPlayerDescriptionService)
		{
			this.context = context;
			this.httpClient = httpClient;
			this.baseballPlayerDescriptionService = baseballPlayerDescriptionService;
		}

		[HttpGet("")]
		public IActionResult Index()
		{	
			return new OkObjectResult(context.BaseballPlayers.OrderByDescending(o => o.Hits).ToList());
		}

		[HttpGet("{id}")]
		public async Task<IActionResult> Get(int id)
		{
			var baseballPlayer = context.BaseballPlayers.FirstOrDefault( o => o.ID == id );

			if( baseballPlayer == null) {
				return new NotFoundResult();
			} else {
				if(string.IsNullOrEmpty(baseballPlayer.Description))
				{
					string? description = await baseballPlayerDescriptionService.GenerateDescription(baseballPlayer);

					if(!string.IsNullOrEmpty(description)){
						baseballPlayer.Description  = description;

						context.BaseballPlayers.Update(baseballPlayer);
						context.SaveChanges();
					}
				}

				return new OkObjectResult(baseballPlayer);
			}
		}

		[HttpPost("")]
		public async Task<IActionResult> Post(BaseballPlayer baseballPlayer) {
			var existingBaseballPlayer = context.BaseballPlayers.FirstOrDefault( o => o.ID == baseballPlayer.ID );

			if( existingBaseballPlayer == null) {
				return new NotFoundResult();
			} else {
				existingBaseballPlayer.Name = baseballPlayer.Name;
				existingBaseballPlayer.AgeThatYear = baseballPlayer.AgeThatYear;
				existingBaseballPlayer.Hits = baseballPlayer.Hits;
				existingBaseballPlayer.Year = baseballPlayer.Year;
				existingBaseballPlayer.Handedness = baseballPlayer.Handedness;
				existingBaseballPlayer.Description = baseballPlayer.Description;

				context.Update(existingBaseballPlayer);

				await context.SaveChangesAsync();

				return new OkResult();
			}
		}

		[HttpGet("init")]
		public async Task<IActionResult> Init()
		{			
			HttpResponseMessage httpResponseMessage = await httpClient.GetAsync("https://api.sampleapis.com/baseball/hitsSingleSeason");

			httpResponseMessage.EnsureSuccessStatusCode();

			string json = await httpResponseMessage.Content.ReadAsStringAsync();

			BaseballPlayer[]? baseballPlayers = JsonSerializer.Deserialize<BaseballPlayer[]>(json);

			if(baseballPlayers != null )
			{				
				await context.Database.ExecuteSqlRawAsync("truncate table baseballplayers");

				await context.BaseballPlayers.AddRangeAsync(baseballPlayers);

				await context.SaveChangesAsync();
			}

			return new OkResult();
		}
	}
}
