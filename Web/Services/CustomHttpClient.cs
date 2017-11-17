using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using Web.Util;

namespace Web.Services
{
  public class CustomHttpClient : IHttpClient
  {
    private readonly Uri _baseAddress;

    public CustomHttpClient(IOptions<AGLOptions> options)
    {
      if (options?.Value == null)
      {
        throw new ArgumentNullException(nameof(options));
      }
      _baseAddress = new Uri(options.Value.APIEndpoint);
    }
    public async Task<string> GetStringAsync(string uri)
    {
      using (var httpClient = new HttpClient())
      {
        httpClient.BaseAddress = _baseAddress;
        httpClient.DefaultRequestHeaders.Clear();
        httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

        var response = await httpClient.GetStringAsync(uri);
        return response;
      }
    }
  }
}
