using Microsoft.AspNetCore.Mvc;

namespace TinyURL.Controllers
{
	public class HomeController : Controller
	{
		public IActionResult Index()
		{
			return View();
		}
	}
}