using System.Threading.Tasks;

namespace Web.Services
{
  public interface IHttpClient
  {
    Task<string> GetStringAsync(string uri);
  }
}
