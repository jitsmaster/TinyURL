using Microsoft.AspNetCore.Mvc;

namespace Jitsmaster.Controllers;

[ApiController]
[Route("[controller]")]
public class TinyURLController : ControllerBase
{
	private readonly ILogger<TinyURLController> _logger;
	private readonly TinyURL _tinyURL = new TinyURL();

	public TinyURLController(ILogger<TinyURLController> logger)
	{
		_logger = logger;
	}

	[HttpGet(Name = "get-long-url")]
	public async string Get()
	{

	}
}
