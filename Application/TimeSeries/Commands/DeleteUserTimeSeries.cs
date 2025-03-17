using MediatR;
using Persistence;

namespace Application.TimeSeries.Commands;

public class DeleteUserTimeSeries
{
    public class Command : IRequest
    {
        public required string Id { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Command>
    {
        public async Task Handle(Command request, CancellationToken cancellationToken)
        {
            var userTimeSeries = await context.UserTimeSeries.FindAsync([request.Id], cancellationToken) 
                ?? throw new Exception("Resource not found");

            context.Remove(userTimeSeries);
            await context.SaveChangesAsync(cancellationToken);   
        }
    }
}
