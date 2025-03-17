using MediatR;
using Domain;
using Persistence;
using Microsoft.EntityFrameworkCore;

namespace Application.TimeSeries.Queries;

public class GetUserTimeSeriesList
{
    public class Query : IRequest<List<UserTimeSeries>> {}

    public class Handler(AppDbContext context) : IRequestHandler<Query, List<UserTimeSeries>>
    {
        public async Task<List<UserTimeSeries>> Handle(Query request, CancellationToken cancellationToken)
        {
            return await context.UserTimeSeries.ToListAsync(cancellationToken);
        }
    }
}
