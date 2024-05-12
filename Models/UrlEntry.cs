
namespace TinyURL.Models
{
	public class UrlEntryStorage
	{
		public string OriginalUrl { get; set; } = string.Empty;
		public int Visited { get; set; } = 0;
	}

	public class UrlEntry : UrlEntryStorage, IUrlEntry
	{
		public string ShortUrl { get; set; } = string.Empty;
	}

}
