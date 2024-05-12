namespace TinyURL.Models
{
	public interface IUrlEntry
	{
		string OriginalUrl { get; set; }
		int Visited { get; set; }

		string ShortUrl { get; set; }
	}
}
