using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.TimeSeries.Commands;

public class EditUserTimeSeries
{
    public class Command : IRequest
    {
        public required UserTimeSeries UserTimeSeries { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command>
    {
        public async Task Handle(Command request, CancellationToken cancellationToken)
        {
            var userTimeSeries = await context.UserTimeSeries.FindAsync([request.UserTimeSeries.Id], cancellationToken) 
                ?? throw new Exception("Resource not found");

            mapper.Map(request.UserTimeSeries, userTimeSeries);
            
            userTimeSeries.TickerSymbol = request.UserTimeSeries.TickerSymbol;
            await context.SaveChangesAsync(cancellationToken);
        }
    }
}
