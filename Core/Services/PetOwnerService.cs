using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Core.Models;
using Core.Interfaces;

namespace Core.Services
{
  public class PetOwnerService : IPetOwnerService
  {
    private readonly IHttpClient _client;
    public PetOwnerService(IHttpClient client)
    {
      _client = client;
    }
    public async Task<IEnumerable<Person>> GetAllPetOwnersAsync()
    {
      var response = await _client.GetStringAsync("people.json");
      if (string.IsNullOrWhiteSpace(response))
      {
        return null;
      }
      //Deserializing the response recieved from web api and storing into the Employee list  
      return JsonConvert.DeserializeObject<List<Person>>(response);
    }

    public async Task<IEnumerable<CatsByOwnerGender>> GetAllCatsByOwnerGenderAsync()
    {
      var result = new List<CatsByOwnerGender>();
      var allOwners = await GetAllPetOwnersAsync();
      var people = allOwners?.ToList();
      if (people != null && people.Any())
      {
        result = people.Where(x => x.Pets != null && x.Pets.Any(pet => pet.Type == PetType.Cat))
          .GroupBy(x => x.Gender)
          .Select(x => new CatsByOwnerGender
          {
            Gender = Enum.GetName(typeof(Gender), x.Key),
            PetNames = x.SelectMany(pet => pet.Pets
                                          .Where(z => z.Type == PetType.Cat)
                                          .Select(y => y.Name)).ToList()
          })
          .ToList();
      }

      return result;
    }
  }
}
