using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;
using tinyurl.Models;
using TinyURL.Models;

namespace TinyURL
{
	public class TinyURL : ITinyURL
	{
		/// <summary>
		/// This is just for demo only. The production service should be able to set host address
		/// </summary>
		const string HOST = "http://localhost:5056";

		/// <summary>
		/// In memory approach, using un unsigned 64 bit integer to for next id
		/// This allows up to 4,294,967,295 ids to be generated
		/// </summary>
		static uint _id = 1;

		//alpha numberic with upper case allows selection from 62 characters to make up the tinyurl string
		static char[] CharMap = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".ToCharArray();

		static readonly object loc = new object();

		private ConcurrentDictionary<uint, UrlEntryStorage> longUrlById = new ConcurrentDictionary<uint, UrlEntryStorage>();

		public TinyURL()
		{
		}

		public async Task<string> AddCustomURL(string shortUrl, string longURL)
		{
			var id = getIdFromShortUrl(shortUrl.ToList());
			if (!longUrlById.ContainsKey(id))
			{
				longUrlById.TryAdd(id, new UrlEntryStorage
				{
					OriginalUrl = longURL
				});
			}
			else
			{
				throw new ArgumentException($"Short URL \"{shortUrl}\" already exists.");
			}

			return shortUrl;
		}

		public async Task<bool> DeleteURL(string shortUrl)
		{
			var id = getIdFromShortUrl(shortUrl.ToList());
			if (id == 0)
				return await Task.FromResult(false);

			var removed = longUrlById.Remove(id, out var longUrl);

			return await Task.FromResult(removed);
		}

		public async Task<string> GenerateShortURL(string longURL)
		{

			lock (loc)
			{
				_id++;
			}
			var newId = _id;
			List<char> shortUrlChars = generateShortUrlFromId(newId);

			// Reverse shortURL to complete base conversion  
			return await Task.FromResult(new string(shortUrlChars.ToArray()));
		}

		private List<char> generateShortUrlFromId(ulong newId)
		{
			List<char> shortUrlChars = new List<char>();

			while (newId > 0)
			{
				shortUrlChars.Add(CharMap[newId % 62]);
				newId = (ulong)Math.Floor((decimal)newId / 62);
			}

			reverse(shortUrlChars);
			return shortUrlChars;
		}

		private uint getIdFromShortUrl(List<char> shortUrl)
		{
			uint id = 0;
			for (int i = 0; i < shortUrl.Count; i++)
			{
				if ('a' <= shortUrl[i]
					&& shortUrl[i] <= 'z')
					id = id * 62 + shortUrl[i] - 'a';
				if ('A' <= shortUrl[i]
					&& shortUrl[i] <= 'Z')
					id = id * 62 + shortUrl[i] - 'A' + 26;
				if ('0' <= shortUrl[i]
					&& shortUrl[i] <= '9')
					id = id * 62 + shortUrl[i] - '0' + 52;
			}
			return id;
		}

		private void reverse(List<char> shortUrlChars)
		{
			//use 2 pointers approach to quickly revert
			var left = 0;
			var right = shortUrlChars.Count - 1;
			while (left < right)
			{
				var tmp = shortUrlChars[left];
				shortUrlChars[left] = shortUrlChars[right];
				shortUrlChars[right] = tmp;

				left++;
				right--;
			}
		}

		/// <summary>
		/// Retrieve paginated filtered result listing of url entries, with total count of the filtered result
		/// </summary>
		/// <param name="startIndex"></param>
		/// <param name="pageSize"></param>
		/// <param name="filter"></param>
		/// <returns></returns>
		public async Task<IUrlListing> List(int startIndex = 0, int pageSize = 25, string filter = "")
		{
			//potential todo for production: add toggle for case sensitivity.
			//note: listing method is safe by default, only retrieve a page of filtered result
			//however, passing in startIndex -1, or pageSize of -1 will retrieve all records

			filter = filter.Trim().ToLowerInvariant();

			var filteredList = longUrlById
				.Select(entry => new UrlEntry
				{
					ShortUrl = new string(generateShortUrlFromId(entry.Key).ToArray()),
					OriginalUrl = entry.Value.OriginalUrl,
					Visited = entry.Value.Visited
				})
				.Where(entry => string.IsNullOrWhiteSpace(filter)
					|| entry.ShortUrl.ToLowerInvariant().Contains(filter)
					|| entry.OriginalUrl.ToLowerInvariant().Contains(filter))
				.ToArray();

			//note: for SQL or Document SQL, the count of filtered list will be returned from server,
			//so .ToArray() will not be necessary.
			int count = filteredList.Length;

			var pageList = (startIndex < 0 || pageSize < 0)
				? filteredList
				: filteredList.Skip(startIndex).Take(pageSize);

			var nextIndex = startIndex + pageSize;
			if (nextIndex >= count)
			{
				nextIndex = -1;
			}

			return await Task.FromResult(new UrlListing
			{
				Entries = pageList,
				TotalCount = count,
				StartIndex = startIndex,
				NextIndex = startIndex + pageSize
			});
		}

		public async Task<string> RetrieveAndVisit(string shortUrl)
		{
			var id = getIdFromShortUrl(shortUrl.ToList());
			if (!longUrlById.ContainsKey(id))
			{
				return string.Empty;
			}

			var entry = longUrlById[id];
			//update the visited count
			entry.Visited++;

			return await Task.FromResult(entry.OriginalUrl);
		}
	}
}