using System;
using tinyurl.Models;
using TinyURL.Models;

namespace TinyURL
{
	public interface ITinyURL
	{
		Task<string> AddCustomURL(string shortURL, string longURL);
		Task<bool> DeleteURL(string shortURL);
		Task<string> GenerateShortURL(string longURL);

		Task<IUrlListing> List(int startIndex = 0, int pageSize = 25, string filter = "");
		Task<string> RetrieveAndVisit(string shortUrl);
	}
}