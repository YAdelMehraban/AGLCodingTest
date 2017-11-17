using System.Collections.Generic;
using System.Threading.Tasks;
using Web.Models;

namespace Web.Services
{
  public interface IPetOwnerService
  {
    Task<IEnumerable<Person>> GetAllPetOwnersAsync();
    Task<IEnumerable<CatsByOwnerGender>> GetAllCatsByOwnerGenderAsync();
  }
}
