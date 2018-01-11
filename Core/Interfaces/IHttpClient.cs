using System.Threading.Tasks;

namespace Core.Interfaces
{
  public interface IHttpClient
  {
    Task<string> GetStringAsync(string uri);
  }
}
