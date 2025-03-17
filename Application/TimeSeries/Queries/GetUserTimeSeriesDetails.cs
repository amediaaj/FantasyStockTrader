using Domain;
using MediatR;
using Persistence;

namespace Application.TimeSeries.Queries;

public class GetUserTimeSeriesDetails
{
    public class Query : IRequest<UserTimeSeries>
    {
        public required string Id { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Query, UserTimeSeries>
    {
        public async Task<UserTimeSeries> Handle(Query request, CancellationToken cancellationToken)
        {
            var userTimeSeries = await context.UserTimeSeries.FindAsync([request.Id], cancellationToken) 
                ?? throw new Exception("Resource not found");
                
            return userTimeSeries;
        }
    }
}
