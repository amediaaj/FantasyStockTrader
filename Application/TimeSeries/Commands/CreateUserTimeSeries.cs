using Domain;
using MediatR;
using Persistence;

namespace Application.TimeSeries.Commands;

public class CreateUserTimeSeries
{
    public class Command : IRequest<string>
    {
        public required UserTimeSeries UserTimeSeries { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Command, string>
    {
        public async Task<string> Handle(Command request, CancellationToken cancellationToken)
        {
            context.UserTimeSeries.Add(request.UserTimeSeries);
            await context.SaveChangesAsync(cancellationToken);
            return request.UserTimeSeries.Id;
        }
    }
}
