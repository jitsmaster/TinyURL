using Microsoft.AspNetCore.Mvc;

namespace TinyURL.Controllers;

[ApiController]
[Route("[controller]")]
public class TinyURLController : ControllerBase
{
	private static readonly string[] Summaries = new[]
	{
		"Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
	};

	private readonly ILogger<TinyURLController> _logger;

	public TinyURLController(ILogger<TinyURLController> logger)
	{
		_logger = logger;
	}

	[HttpGet(Name = "get-long-url")]
	public async string Get()
	{

	}
}
