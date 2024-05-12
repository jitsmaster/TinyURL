using TinyURL.Models;

namespace tinyurl.Models
{
	public interface IUrlListing
	{
		IEnumerable<UrlEntry> Entries { get; set; }
		int CurrentIndex { get; set; }
		int TotalCount { get; set; }
	}
}
