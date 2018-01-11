using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Models;

namespace Core.Interfaces
{
  public interface IPetOwnerService
  {
    Task<IEnumerable<Person>> GetAllPetOwnersAsync();
    Task<IEnumerable<CatsByOwnerGender>> GetAllCatsByOwnerGenderAsync();
  }
}
