using System.Collections.Generic;

namespace Core.Models
{
  public class Person
  {
    public string Name { get; set; }
    public Gender Gender { get; set; }
    public ICollection<Pet> Pets { get; set; }
  }
}
