using System.Collections.Generic;

namespace Web.Models
{
  public class CatsByOwnerGender
  {
    public string Gender { get; set; }
    public List<string> PetNames { get; set; }
  }
}
