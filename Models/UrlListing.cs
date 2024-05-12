using TinyURL.Models;

namespace tinyurl.Models
{
	public class UrlListing : IUrlListing
	{
		public IEnumerable<UrlEntry> Entries { get; set; } = [];
		public int TotalCount { get; set; } = 0;
		public int CurrentIndex { get; set; } = 0;
	}
}
