using Application.TimeSeries.Commands;
using Application.TimeSeries.DTOs;
using Application.TimeSeries.Queries;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Moq;
using Xunit;
using API.Controllers;
using Application.Core;

namespace Test.API
{
    public class UserTimeSeriesControllerTest
    {
        private readonly Mock<IMediator> _mediatorMock;
        private readonly UserTimeSeriesController _controller;

        public UserTimeSeriesControllerTest()
        {
            _mediatorMock = new Mock<IMediator>();
            _controller = new UserTimeSeriesController
            {
                ControllerContext = new ControllerContext
                {
                    HttpContext = new DefaultHttpContext()
                }
            };
            _controller.ControllerContext.HttpContext.RequestServices = new ServiceCollection()
                .AddSingleton(_mediatorMock.Object)
                .BuildServiceProvider();
        }

        [Fact]
        public async Task GetTimeSeriesDetail_ReturnsOkResult_WithUserTimeSeries()
        {
            var id = "1";
            var mockUserTimeSeries = new UserTimeSeries
            {
                Id = id,
                UserId = "user1",
                TickerSymbol = "AAPL",
                Function = "TIME_SERIES_DAILY"
            };

            _mediatorMock
                .Setup(m => m.Send(It.IsAny<GetUserTimeSeriesDetails.Query>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(new Result<UserTimeSeries> { IsSuccess = true, Value = mockUserTimeSeries });

            var result = await _controller.GetTimeSeriesDetail(id);
            var actionResult = Assert.IsType<ActionResult<UserTimeSeries>>(result);
            var okResult = Assert.IsType<OkObjectResult>(actionResult.Result);
            var returnValue = Assert.IsType<UserTimeSeries>(okResult.Value);
            Assert.Equal(mockUserTimeSeries, returnValue);
        }

        [Fact]
        public async Task GetTimeSeries_ReturnsActionResult_WithListOfUserTimeSeries()
        {
            var mockTimeSeriesList = new List<UserTimeSeries>
            {
                new UserTimeSeries { Id = "1", UserId = "user1", TickerSymbol = "AAPL", Function = "TIME_SERIES_DAILY" },
                new UserTimeSeries { Id = "2", UserId = "user2", TickerSymbol = "GOOG", Function = "TIME_SERIES_INTRADAY" }
            };

            _mediatorMock
                .Setup(m => m.Send(It.IsAny<GetUserTimeSeriesList.Query>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(mockTimeSeriesList);

            var result = await _controller.GetTimeSeries();
            var returnValue = Assert.IsType<ActionResult<List<UserTimeSeries>>>(result).Value;

            Assert.NotNull(returnValue);
            Assert.Equal(2, returnValue.Count);
            Assert.Equal("AAPL", returnValue[0].TickerSymbol);
            Assert.Equal("GOOG", returnValue[1].TickerSymbol);
            Assert.Equal("user1", returnValue[0].UserId);
        }

        [Fact]
        public async Task CreateUserTimeSeries_ReturnsOkResult_WithString()
        {
            var createDto = new CreateUserTimeSeriesDto
            {
                UserId = "user1",
                TickerSymbol = "AAPL",
                Function = "TIME_SERIES_DAILY"
            };

            _mediatorMock
                .Setup(m => m.Send(It.IsAny<CreateUserTimeSeries.Command>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(new Result<string> { IsSuccess = true, Value = "NewTimeSeriesId" });

            var result = await _controller.CreateUserTimeSeries(createDto);
            var actionResult = Assert.IsType<ActionResult<string>>(result);
            var okResult = Assert.IsType<OkObjectResult>(actionResult.Result);
            var returnValue = Assert.IsType<string>(okResult.Value);
            Assert.Equal("NewTimeSeriesId", returnValue);
        }

        [Fact]
        public async Task EditUserTimeSeries_ReturnsOkObjectResult()
        {
            var editDto = new EditUserTimeSeriesDto
            {
                Id = "1",
                UserId = "user1",
                TickerSymbol = "AAPL",
                Function = "TIME_SERIES_INTRADAY"
            };

            var mockResult = new Result<Unit> { IsSuccess = true, Value = new Unit() };

            _mediatorMock
                .Setup(m => m.Send(It.IsAny<EditUserTimeSeries.Command>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(mockResult);

            var response = await _controller.EditUserTimeSeries(editDto);
            var okResult = Assert.IsType<OkObjectResult>(response);
            Assert.Equal(mockResult.Value, okResult.Value);
        }

        [Fact]
        public async Task DeleteUserTimeSeries_ReturnsOkObjectResult()
        {
            var id = "1";

            _mediatorMock
                .Setup(m => m.Send(It.IsAny<DeleteUserTimeSeries.Command>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(new Result<Unit> { IsSuccess = true });

            var response = await _controller.DeleteUserTimeSeries(id);
            var okObjectResult = Assert.IsType<OkObjectResult>(response);
        }
    }
}
