using System.Collections.Generic;

namespace Web.Models
{
  public class Person
  {
    public string Name { get; set; }
    public Gender Gender { get; set; }
    public ICollection<Pet> Pets { get; set; }
  }
}
