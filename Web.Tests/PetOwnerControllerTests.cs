using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Newtonsoft.Json;
using Web.Controllers;
using Core.Models;
using Core.Services;
using Core.Interfaces;
using Xunit;
using Microsoft.Extensions.Options;

namespace Web.Tests
{
  public class PetOwnerControllerTests
  {
    [Fact]
    public async Task GivenControllerIsInitilised_WhenNoDataIsReturned_ThenItShouldReturnNull()
    {
      
      var mockPetOwnerService = new Mock<IPetOwnerService>();

      mockPetOwnerService
        .Setup(c => c.GetAllPetOwnersAsync())
        .ReturnsAsync((IEnumerable<Person>)null);

      var controller = new PetOwnerController(mockPetOwnerService.Object);

      var result = await controller.Get();

      var contentResult = Assert.IsType<OkObjectResult>(result);

      Assert.Null(contentResult.Value);
    }

    [Theory]
    [MemberData(nameof(JsonProvider.TestData), MemberType = typeof(JsonProvider))]
    public async Task GivenControllerIsInitilised_WhenDataIsReturned_ThenItShouldReturnTheResult(int count, string jsonString)
    {

      var mockPetOwnerService = new Mock<IPetOwnerService>();
      
      mockPetOwnerService
        .Setup(c => c.GetAllPetOwnersAsync())
        .ReturnsAsync(JsonConvert.DeserializeObject<IEnumerable<Person>>(jsonString));

      var controller = new PetOwnerController(mockPetOwnerService.Object);

      var result = await controller.Get();

      var contentResult = Assert.IsType<OkObjectResult>(result);

      var list = contentResult.Value as List<Person>;
      Assert.NotNull(list);
      Assert.Equal(count, list.Count);
    }

    [Fact]
    public async Task GivenControllerIsInitilised_WhenGetCatByOwnerGenderMethodIsCalled_ThenItShouldReturnTheResult()
    {
      var jsonString =
        @"[{'name':'Bob','gender':'Male','age':23,'pets':[{'name':'Garfield','type':'Cat'}, {'name':'Fido','type':'Dog'}]},
            {'name':'Jennifer','gender':'Female','age':18,'pets':[{'name':'Garfield','type':'Cat'}]},
            {'name':'Steve','gender':'Male','age':45,'pets':null},
            {'name':'Fred','gender':'Male','age':40,'pets':[{'name':'Tom','type':'Cat'},{'name':'Max','type':'Cat'},{'name':'Sam','type':'Dog'},{'name':'Jim','type':'Cat'}]},
            {'name':'Samantha','gender':'Female','age':40,'pets':[{'name':'Tabby','type':'Cat'}]},
            {'name':'Alice','gender':'Female','age':64,'pets':[{'name':'Simba','type':'Cat'},{'name':'Nemo','type':'Fish'}]}]";

      var mockHttp = new Mock<IHttpClient>();
      mockHttp
        .Setup(c => c.GetStringAsync(It.IsAny<string>()))
        .ReturnsAsync(jsonString);

      var petOwnerService = new PetOwnerService(mockHttp.Object);

      var controller = new PetOwnerController(petOwnerService);

      var result = await controller.GetCatsByOwnerGender();

      var contentResult = Assert.IsType<OkObjectResult>(result);

      var list = contentResult.Value as List<CatsByOwnerGender>;

      Assert.NotNull(list);

      var firstGender = list.FirstOrDefault();

      Assert.NotNull(firstGender);

      Assert.Equal(Enum.GetName(typeof(Gender), Gender.Male), firstGender.Gender);
      Assert.Equal(4, firstGender.PetNames.Count);
    }

    [Fact]
    public async Task GivenControllerIsInitilised_WhenGetCatByOwnerGenderMethodIsCalled_ThenItShouldReturnTheCatsInAlphabeticalOrder()
    {
      var options = Options.Create(new AGLOptions());

      var jsonString =
        @"[{'name':'Bob','gender':'Male','age':23,'pets':[{'name':'Garfield','type':'Cat'}, {'name':'Fido','type':'Dog'}]},
            {'name':'Jennifer','gender':'Female','age':18,'pets':[{'name':'Garfield','type':'Cat'}]},
            {'name':'Steve','gender':'Male','age':45,'pets':null},
            {'name':'Fred','gender':'Male','age':40,'pets':[{'name':'Tom','type':'Cat'},{'name':'Max','type':'Cat'},{'name':'Sam','type':'Dog'},{'name':'Jim','type':'Cat'}]},
            {'name':'Samantha','gender':'Female','age':40,'pets':[{'name':'Tabby','type':'Cat'}]},
            {'name':'Alice','gender':'Female','age':64,'pets':[{'name':'Simba','type':'Cat'},{'name':'Nemo','type':'Fish'}]}]";

      var mockHttp = new Mock<IHttpClient>();
      mockHttp
        .Setup(c=> c.GetStringAsync(It.IsAny<string>()))
        .ReturnsAsync(jsonString);

      var petOwnerService = new PetOwnerService(mockHttp.Object);

      var controller = new PetOwnerController(petOwnerService);

      var result = await controller.GetCatsByOwnerGender();

      var contentResult = Assert.IsType<OkObjectResult>(result);

      var list = contentResult.Value as List<CatsByOwnerGender>;
      Assert.NotNull(list);
      Assert.Equal("Garfield", list.Last().PetNames[0]);
      Assert.Equal("Tabby", list.Last().PetNames[1]);
      Assert.Equal("Simba", list.Last().PetNames[2]);
    }

    [Fact]
    public async Task GivenServiceThrowsException_WhenTheContollerActionInCalled_ItShouldCatchItInGlobalExceptionHandler()
    {
      var petOwnerService = new Mock<IPetOwnerService>();
      petOwnerService.Setup(c => c.GetAllCatsByOwnerGenderAsync())
        .ThrowsAsync(new Exception("Test Exception Handling"));

      var controller = new PetOwnerController(petOwnerService.Object);

      Exception ex = await Assert.ThrowsAsync<Exception>(async () => await controller.GetCatsByOwnerGender());

      Assert.NotEqual(ex.Message.IndexOf("Test Exception Handling", StringComparison.Ordinal), -1);
    }
  }
}
