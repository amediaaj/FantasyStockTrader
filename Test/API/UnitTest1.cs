using API.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace Test.API;

public class BuggyControllerTest
{
    [Fact]
    public void Test1()
    {
        var controller = new BuggyController();

        var result = controller.GetBadRequest();

        Assert.Equal(typeof(BadRequestObjectResult), result.GetType());
    }
}
