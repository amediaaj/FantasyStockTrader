using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TimeSeriesController(AppDbContext context) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<List<UserTimeSeries>>> GetTimeSeries()
        {
            return await context.TimeSeries.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserTimeSeries>> GetTimeSeriesDetail(string id)
        {
            var timeSeries = await context.TimeSeries.FindAsync(id);

            if(timeSeries == null) return NotFound();

            return timeSeries;
        }
    }
}
