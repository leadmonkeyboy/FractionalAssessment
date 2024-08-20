using FractionalAssessment.Server.Data;
using FractionalAssessment.Server.Models;
using GenerativeAI;
using GenerativeAI.Models;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel;

namespace FractionalAssessment.Server.Services
{
[GenerativeAIFunctions]
public interface IBaseballPlayerFunctions
{
    [Description("Get the current baseball player by their player name")]
    public Task<BaseballPlayer?> GetCurrentBaseballPlayerAsync(
        [Description("The name of the player, e.g. Ichiro Suzuki")] string playerName, CancellationToken cancellationToken = default);
}

	public class BaseballPlayerService : IBaseballPlayerFunctions
	{
		private readonly DefaultContext context;

		public BaseballPlayerService(DefaultContext context)
		{
			this.context = context;
		}

		async Task<BaseballPlayer?> IBaseballPlayerFunctions.GetCurrentBaseballPlayerAsync(
			[Description("The name of the player, e.g. Ichiro Suzuki")] string playerName, 
			CancellationToken cancellationToken)
		{
			return await context.BaseballPlayers.FirstOrDefaultAsync( o => o.Name == playerName );
		}
	}

	public class BaseballPlayerDescriptionService
	{
		private readonly BaseballPlayerService baseballPlayerService;

		public BaseballPlayerDescriptionService(BaseballPlayerService baseballPlayerService)
		{
			this.baseballPlayerService = baseballPlayerService;
		}

		public async Task<string?> GenerateDescription(BaseballPlayer baseballPlayer)
		{
			var apiKey = "AIzaSyD0mmylE8FJAsORUrBuvShopcMUhfuq2HI";

			var model = new GenerativeModel(apiKey);

			model.AddGlobalFunctions(baseballPlayerService.AsGoogleFunctions(), baseballPlayerService.AsGoogleCalls());

			var result = await model.GenerateContentAsync($"You are a sports journalist. Describe the player {baseballPlayer.Name}?");

			return result;
		}
	}
}
