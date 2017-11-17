using Microsoft.AspNetCore.Builder;

namespace Web.Util
{
  public static class MiddlewareExtensions
  {
    public static IApplicationBuilder UseAngularRoute(this IApplicationBuilder builder)
    {
      return builder.UseMiddleware<AngularRouteMiddleware>();
    }
  }
}
