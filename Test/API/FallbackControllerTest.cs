using System;
using System.IO;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;
using API.Controllers;

namespace Test.API
{
    public class FallbackControllerTest
    {
        private readonly FallbackController _controller;

        public FallbackControllerTest()
        {
            _controller = new FallbackController();
        }

        [Fact]
        public void Index_ReturnsPhysicalFileResult_WithCorrectFilePath()
        {
            var expectedFilePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "index.html");

            var result = _controller.Index();

            var physicalFileResult = Assert.IsType<PhysicalFileResult>(result);
            Assert.Equal(expectedFilePath, physicalFileResult.FileName);
            Assert.Equal("text/HTML", physicalFileResult.ContentType);
        }
    }
}
