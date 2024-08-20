using FractionalAssessment.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace FractionalAssessment.Server.Data
{
	public class DefaultContext : DbContext
	{
		public DefaultContext(DbContextOptions<DefaultContext> options) : base(options) { }

		public DbSet<BaseballPlayer> BaseballPlayers { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{			
			base.OnModelCreating(modelBuilder);
		}
	}
}
