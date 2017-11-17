using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace Web.Util
{
  public class AngularRouteMiddleware
  {
    private readonly RequestDelegate _next;

    public AngularRouteMiddleware(RequestDelegate next)
    {
      _next = next;
    }

    public async Task Invoke(HttpContext context)
    {
      await _next(context);

      if (context.Response.StatusCode == 404 && !Path.HasExtension(context.Request.Path.Value) &&
          !context.Request.Path.Value.StartsWith("api"))
      {
        context.Request.Path = "/index.html";
        context.Response.StatusCode = 200;
        await _next(context);
      }
    }
  }
}
