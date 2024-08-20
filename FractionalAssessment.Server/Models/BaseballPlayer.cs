using System.Text.Json.Serialization;
using FractionalAssessment.Server.Converters;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using System.Text.Json;

namespace FractionalAssessment.Server.Models
{
	public enum Handedness
	{
		L = 'L', // Left
		R = 'R', // Right
		Uknown = 'U'
	}

	public class BaseballPlayer
	{
		[JsonPropertyName("id")]
		public int ID { get; set; }

		[JsonPropertyName("Player")]
		public string Name { get; set; } = string.Empty;

		[JsonPropertyName("AgeThatYear")]
		[JsonConverter(typeof(BaseballPlayerAgeThatYearConverter))]
		public int AgeThatYear { get; set; }

		[JsonPropertyName("Hits")]
		public int Hits { get; set;}

		[JsonPropertyName("Year")]
		public int Year { get; set;}

		[JsonPropertyName("Bats")]
		[JsonConverter(typeof(BaseballPlayerHandednessConverter))]
		public Handedness Handedness { get; set; }

		public string Description { get; set; } = string.Empty;
	}
}
