using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;

namespace Jitsmaster
{
	public class TinyURL
	{
		private Dictionary<string, string> urlMap = new Dictionary<string, string>();

		public TinyURL()
		{
		}

		public string GenerateShortURL(string longURL)
		{
			using (MD5 md5 = MD5.Create())
			{
				byte[] hashBytes = md5.ComputeHash(Encoding.UTF8.GetBytes(longURL));
				string hash = BitConverter.ToString(hashBytes).Replace("-", "").Substring(0, 8);
				string shortURL = $"https://tinyurl.com/{hash}";

				if (!urlMap.ContainsKey(shortURL))
				{
					urlMap.Add(shortURL, longURL);
				}

				return shortURL;
			}
		}

		public void AddCustomURL(string shortURL, string longURL)
		{
			if (!urlMap.ContainsKey(shortURL))
			{
				urlMap.Add(shortURL, longURL);
			}
			else
			{
				throw new ArgumentException($"Short URL \"{shortUrl}\" already exists.");
			}
		}

		public bool DeleteURL(string shortURL)
		{
			return urlMap.Remove(shortURL);
		}
	}
}