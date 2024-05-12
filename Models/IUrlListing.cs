using TinyURL.Models;

namespace tinyurl.Models
{
	public interface IUrlListing
	{
		IEnumerable<UrlEntry> Entries { get; set; }
		int NextIndex { get; set; }
		int StartIndex { get; set; }
		int TotalCount { get; set; }
	}
}
