using System.Text.Json;
using System.Text.Json.Serialization;

namespace FractionalAssessment.Server.Converters
{
	public class BaseballPlayerAgeThatYearConverter : JsonConverter<int>
	{
		public override int Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
		{
			if(reader.TokenType == JsonTokenType.String)
			{
				var s = reader.GetString();

				if( int.TryParse(s, out int n))
				{
					return n;
				}
			}

			if(reader.TokenType == JsonTokenType.Number) { 
				return reader.GetInt32();
			}

			return 0;
		}

		public override void Write(Utf8JsonWriter writer, int value, JsonSerializerOptions options)
		{
			writer.WriteNumberValue(value);
		}
	}
}
