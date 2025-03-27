using Application.Core;
using Application.TimeSeries.DTOs;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.TimeSeries.Commands;

public class EditUserTimeSeries
{
    public class Command : IRequest<Result<Unit>>
    {
        public required EditUserTimeSeriesDto UserTimeSeriesDto { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var userTimeSeries = await context.UserTimeSeries.FindAsync([request.UserTimeSeriesDto.Id], cancellationToken);

            if(userTimeSeries is null) return Result<Unit>.Failure("User time series not found", 404);

            mapper.Map(request.UserTimeSeriesDto, userTimeSeries);

            var result = await context.SaveChangesAsync(cancellationToken) > 0;

            if (!result) return Result<Unit>.Failure("Failed to update the user time series", 404);

            return Result<Unit>.Success(Unit.Value); 
        }
    }
}
