using API.Controllers;
using API.DTOs;
using Domain;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Moq;
using System.Security.Claims;
using System.Threading.Tasks;
using Xunit;

namespace Test.API;

public class AccountControllerTests
{
    private readonly Mock<UserManager<User>> _mockUserManager;
    private readonly Mock<SignInManager<User>> _mockSignInManager;
    private readonly AccountController _controller;

    public AccountControllerTests()
    {
        var userStoreMock = new Mock<IUserStore<User>>();
        _mockUserManager = new Mock<UserManager<User>>(
            userStoreMock.Object,
            Mock.Of<IOptions<IdentityOptions>>(),
            Mock.Of<IPasswordHasher<User>>(),
            new IUserValidator<User>[0],
            new IPasswordValidator<User>[0],
            Mock.Of<ILookupNormalizer>(),
            Mock.Of<IdentityErrorDescriber>(),
            Mock.Of<IServiceProvider>(),
            Mock.Of<ILogger<UserManager<User>>>()
        );

        _mockSignInManager = new Mock<SignInManager<User>>(
            _mockUserManager.Object,
            Mock.Of<IHttpContextAccessor>(),
            Mock.Of<IUserClaimsPrincipalFactory<User>>(),
            Mock.Of<IOptions<IdentityOptions>>(),
            Mock.Of<ILogger<SignInManager<User>>>(),
            Mock.Of<IAuthenticationSchemeProvider>(),
            Mock.Of<IUserConfirmation<User>>()
        );

        _controller = new AccountController(_mockUserManager.Object, _mockSignInManager.Object);
    }

    [Fact]
    public async Task RegisterUser_Success_ReturnsOk()
    {
        // Arrange
        var registerDto = new RegisterDto
        {
            Email = "test@example.com",
            DisplayName = "Test User",
            Password = "P@ssw0rd"
        };
        var user = new User { UserName = registerDto.Email, Email = registerDto.Email, DisplayName = registerDto.DisplayName };

        _mockUserManager.Setup(m => m.CreateAsync(It.IsAny<User>(), registerDto.Password))
                        .ReturnsAsync(IdentityResult.Success);

        // Act
        var result = await _controller.RegisterUser(registerDto);

        // Assert
        var actionResult = Assert.IsType<OkResult>(result);
    }

    [Fact]
    public async Task RegisterUser_Failure_ReturnsValidationProblem()
    {
        // Arrange
        var registerDto = new RegisterDto
        {
            Email = "test@example.com",
            DisplayName = "Test User",
            Password = "P@ssw0rd"
        };

        var errors = new IdentityError[] { new IdentityError { Code = "Error", Description = "Something went wrong." } };
        _mockUserManager.Setup(m => m.CreateAsync(It.IsAny<User>(), registerDto.Password))
                        .ReturnsAsync(IdentityResult.Failed(errors));

        // Act
        var result = await _controller.RegisterUser(registerDto);

        // Assert
        var objectResult = Assert.IsType<ObjectResult>(result); // Check if it's an ObjectResult
        var validationProblemDetails = Assert.IsType<ValidationProblemDetails>(objectResult.Value); // Extract and check the value
        Assert.Equal("Error", validationProblemDetails.Errors.Keys.First()); // Assert that the error is present
    }

    [Fact]
    public async Task GetUserInfo_WhenUserIsAuthenticated_ReturnsOk()
    {
        // Arrange
        var user = new User
        {
            Id = "123",
            DisplayName = "Test User",
            Email = "test@example.com"
        };

        var identity = new ClaimsIdentity("TestAuth"); // AuthenticationType makes it authenticated
        var claimsPrincipal = new ClaimsPrincipal(identity);

        _mockUserManager
            .Setup(m => m.GetUserAsync(It.IsAny<ClaimsPrincipal>()))
            .ReturnsAsync(user);

        _controller.ControllerContext = new ControllerContext
        {
            HttpContext = new DefaultHttpContext { User = claimsPrincipal }
        };

        // Act
        var result = await _controller.GetUserInfo();

        // Assert
        Assert.IsType<OkObjectResult>(result);
    }

    [Fact]
    public async Task GetUserInfo_UnauthenticatedUser_ReturnsNoContent()
    {
        // Arrange: create an unauthenticated user
        var identity = new ClaimsIdentity(); // No authentication type = IsAuthenticated == false
        var claimsPrincipal = new ClaimsPrincipal(identity);

        _controller.ControllerContext = new ControllerContext
        {
            HttpContext = new DefaultHttpContext { User = claimsPrincipal }
        };

        // Act
        var result = await _controller.GetUserInfo();

        // Assert
        Assert.IsType<NoContentResult>(result);
    }

    [Fact]
    public async Task Logout_Success_ReturnsNoContent()
    {
        // Act
        var result = await _controller.Logout();

        // Assert
        Assert.IsType<NoContentResult>(result);
    }
}
