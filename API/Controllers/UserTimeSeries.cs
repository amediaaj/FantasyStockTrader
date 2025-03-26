using Application.TimeSeries.Commands;
using Application.TimeSeries.DTOs;
using Application.TimeSeries.Queries;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class UserTimeSeriesController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<UserTimeSeries>>> GetTimeSeries()
        {
            return await Mediator.Send(new GetUserTimeSeriesList.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserTimeSeries>> GetTimeSeriesDetail(string id)
        {
            return HandleResult(await Mediator.Send(new GetUserTimeSeriesDetails.Query{Id = id}));
        }

        [HttpPost]
        public async Task<ActionResult<string>> CreateUserTimeSeries(CreateUserTimeSeriesDto userTimeSeriesDto)
        {
            return await Mediator.Send(new CreateUserTimeSeries.Command{UserTimeSeriesDto = userTimeSeriesDto});
        }

        [HttpPut]
        public async Task<ActionResult> EditUserTimeSeries(UserTimeSeries userTimeSeries)
        {
            await Mediator.Send(new EditUserTimeSeries.Command{UserTimeSeries = userTimeSeries});

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteUserTimeSeries(string id)
        {
            await Mediator.Send(new DeleteUserTimeSeries.Command{Id = id});

            return Ok();
        }
    }
}
