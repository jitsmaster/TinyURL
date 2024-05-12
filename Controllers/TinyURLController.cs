using Microsoft.AspNetCore.Mvc;
using tinyurl.Models;
using TinyURL.Models;

namespace TinyURL.Controllers;

[ApiController]
[Route("[controller]")]
public class TinyURLController : ControllerBase
{
	private readonly ILogger<TinyURLController> _logger;
	private ITinyURL _tinyUrl;

	public TinyURLController(ILogger<TinyURLController> logger, ITinyURL tinyUrl)
	{
		_logger = logger;
		_tinyUrl = tinyUrl;
	}

	//note: using post method, since retrieving long url from short url also updates it's visited count
	[HttpPost("retrieve")]
	public async Task<string> Retrieve(string shortUrl)
	{
		return await _tinyUrl.RetrieveAndVisit(shortUrl);
	}

	[HttpPut("add")]
	public async Task<string> Add(string url = "", string customUrl = "")
	{
		//note: custom url is optional, if not provided, shorturl is auto-generated.
		if (string.IsNullOrEmpty(customUrl))
		{
			return await _tinyUrl.GenerateShortURL(url);
		}

		return await _tinyUrl.AddCustomURL(customUrl, url);
	}

	[HttpDelete("remove")]
	public async Task<bool> Remove(string shortUrl)
	{
		if (string.IsNullOrEmpty(shortUrl))
		{
			return false;
		}

		return await _tinyUrl.DeleteURL(shortUrl);
	}

	[HttpGet("list")]
	public async Task<IUrlListing> List(int startIndex = 0, int pageSize = 25, string filter = "")
	{
		return await _tinyUrl.List(startIndex, pageSize, filter);
	}
}
