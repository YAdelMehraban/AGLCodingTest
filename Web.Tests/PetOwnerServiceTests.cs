using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Interfaces;
using Core.Models;
using Core.Services;
using Moq;
using Xunit;

namespace Web.Tests
{
  public class PetOwnerServiceTests
  {
    [Fact]
    public async Task GivenNoDataIsReturnedByAPi_WhenGetMethodIsCalled_ThenItShouldReturnEmptyCollection()
    {
      var mockHttpService = new Mock<IHttpClient>();
      mockHttpService.Setup(x=> x.GetStringAsync(It.IsAny<string>())).ReturnsAsync(string.Empty);

      var petOwnerService = new PetOwnerService(mockHttpService.Object);

      var result = await petOwnerService.GetAllCatsByOwnerGenderAsync();

      Assert.Empty(result);
    }

    [Fact]
    public async Task GivenDataIsReturnedByAPi_WhenGetMethodIsCalled_ThenItShouldReturnTheCatNamesSorted()
    {
      var jsonString =
        @"[{'name':'Bob','gender':'Male','age':23,'pets':[{'name':'Garfield','type':'Cat'}, {'name':'Fido','type':'Dog'}]},
            {'name':'Jennifer','gender':'Female','age':18,'pets':[{'name':'Garfield','type':'Cat'}]},
            {'name':'Steve','gender':'Male','age':45,'pets':null},
            {'name':'Fred','gender':'Male','age':40,'pets':[{'name':'Tom','type':'Cat'},{'name':'Max','type':'Cat'},{'name':'Sam','type':'Dog'},{'name':'Jim','type':'Cat'}]},
            {'name':'Samantha','gender':'Female','age':40,'pets':[{'name':'Tabby','type':'Cat'}]},
            {'name':'Alice','gender':'Female','age':64,'pets':[{'name':'Simba','type':'Cat'},{'name':'Nemo','type':'Fish'}]}]";

      var mockHttpService = new Mock<IHttpClient>();
      mockHttpService.Setup(x => x.GetStringAsync(It.IsAny<string>())).ReturnsAsync(jsonString);

      var petOwnerService = new PetOwnerService(mockHttpService.Object);

      var list = await petOwnerService.GetAllCatsByOwnerGenderAsync();

      Assert.Equal("Garfield", list.Last().PetNames[0]);
      Assert.Equal("Tabby", list.Last().PetNames[1]);
      Assert.Equal("Simba", list.Last().PetNames[2]);
    }
  }
}
