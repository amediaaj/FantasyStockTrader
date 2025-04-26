using API.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace Test.API
{
    public class BuggyControllerTest
    {
        private readonly BuggyController _controller;

        public BuggyControllerTest()
        {
            _controller = new BuggyController();
        }

        [Fact]
        public void GetNotFound_ReturnsNotFoundResult()
        {
            var result = _controller.GetNotFound();

            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public void GetBadRequest_ReturnsBadRequestObjectResult_WithMessage()
        {
            var result = _controller.GetBadRequest();

            var badRequest = Assert.IsType<BadRequestObjectResult>(result);
            Assert.Equal("This is a bad request", badRequest.Value);
        }

        [Fact]
        public void GetServerError_ThrowsException()
        {
            var exception = Assert.Throws<Exception>(() => _controller.GetServerError());
            Assert.Equal("This is a server error", exception.Message);
        }

        [Fact]
        public void GetUnauthorized_ReturnsUnauthorizedResult()
        {
            var result = _controller.GetUnauthorized();

            Assert.IsType<UnauthorizedResult>(result);
        }
    }
}
