using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Web.Services;

namespace Web.Controllers
{
  [Route("api/[controller]")]
  public class PetOwnerController : Controller
  {
    private readonly IPetOwnerService _petOwnerService;
    public PetOwnerController(IPetOwnerService petOwnerService)
    {
      _petOwnerService = petOwnerService;
    }

    public async Task<ActionResult> Get()
    {
      var people = await _petOwnerService.GetAllPetOwnersAsync();
      return Ok(people);
    }

    [HttpGet]
    [Route("catsbyownergender")]
    public async Task<ActionResult> GetCatsByOwnerGender()
    {
      var cats = await _petOwnerService.GetAllCatsByOwnerGenderAsync();

      return Ok(cats);
    }
  }
}
