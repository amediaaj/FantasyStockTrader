using API.Controllers;
using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Moq;
using Xunit;

namespace Test.API
{
    // Subclass for testing
    public class TestBaseApiController : BaseApiController
    {
        public ActionResult TestHandleResult<T>(Result<T> result)
        {
            return HandleResult(result);
        }
    }

    public class BaseApiControllerTest
    {
        private readonly TestBaseApiController _controller;
        private readonly Mock<IMediator> _mediatorMock;

        public BaseApiControllerTest()
        {
            _mediatorMock = new Mock<IMediator>();
            _controller = new TestBaseApiController();
            // Mock HttpContext.RequestServices to return the mock Mediator
            _controller.ControllerContext = new ControllerContext
            {
                HttpContext = new DefaultHttpContext()
            };
            _controller.ControllerContext.HttpContext.RequestServices = new ServiceCollection()
                .AddSingleton(_mediatorMock.Object)
                .BuildServiceProvider();
        }

        [Fact]
        public void HandleResult_Success_ReturnsOkObjectResult()
        {
            // Arrange
            var result = new Result<string> { IsSuccess = true, Value = "Success" };

            // Act
            var actionResult = _controller.TestHandleResult(result);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(actionResult);
            Assert.Equal("Success", okResult.Value);
        }

        [Fact]
        public void HandleResult_Failure_ReturnsBadRequestObjectResult()
        {
            // Arrange
            var result = new Result<string> { IsSuccess = false, Error = "Bad request error" };

            // Act
            var actionResult = _controller.TestHandleResult(result);

            // Assert
            var badRequestResult = Assert.IsType<BadRequestObjectResult>(actionResult);
            Assert.Equal("Bad request error", badRequestResult.Value);
        }

        [Fact]
        public void HandleResult_NotFound_ReturnsNotFoundResult()
        {
            // Arrange
            var result = new Result<string> { IsSuccess = false, Code = 404 };

            // Act
            var actionResult = _controller.TestHandleResult(result);

            // Assert
            Assert.IsType<NotFoundResult>(actionResult);
        }
    }
}
