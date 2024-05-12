using TinyURL.Models;

namespace tinyurl.Models
{
	public class UrlListing : IUrlListing
	{
		public IEnumerable<UrlEntry> Entries { get; set; } = [];
		public int TotalCount { get; set; } = 0;
		public int StartIndex { get; set; } = 0;
		public int NextIndex { get; set; } = 0;
	}
}
