using System.Reflection.Metadata.Ecma335;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.TimeSeries.Queries;

public class GetUserTimeSeriesDetails
{
    public class Query : IRequest<Result<UserTimeSeries>>
    {
        public required string Id { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Query, Result<UserTimeSeries>>
    {
        public async Task<Result<UserTimeSeries>> Handle(Query request, CancellationToken cancellationToken)
        {
            var userTimeSeries = await context.UserTimeSeries.FindAsync([request.Id], cancellationToken);

            if(userTimeSeries == null) return Result<UserTimeSeries>.Failure("User time series not foud", 404);
                
            return Result<UserTimeSeries>.Success(userTimeSeries);
        }
    }
}
