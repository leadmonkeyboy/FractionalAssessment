using FractionalAssessment.Server.Models;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace FractionalAssessment.Server.Converters
{
	public class BaseballPlayerHandednessConverter : JsonConverter<Handedness>
	{
		public override Handedness Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
		{
			if(reader.TokenType == JsonTokenType.String)
			{
				var s = reader.GetString();

				if( Handedness.TryParse(s, out Handedness h ) ) {
					return h;
				}
			}

			return Handedness.Uknown;
		}

		public override void Write(Utf8JsonWriter writer, Handedness value, JsonSerializerOptions options)
		{
			writer.WriteStringValue( value == Handedness.L ? "Left" : "Right");
		}
	}
}
