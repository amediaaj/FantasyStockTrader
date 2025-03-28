using Application.Core;
using Application.TimeSeries.DTOs;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.TimeSeries.Commands;

public class CreateUserTimeSeries
{
    public class Command : IRequest<Result<string>>
    {
        public required CreateUserTimeSeriesDto UserTimeSeriesDto { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command, Result<string>>
    {
        public async Task<Result<string>> Handle(Command request, CancellationToken cancellationToken)
        {
            var userTimeSeries = mapper.Map<UserTimeSeries>(request.UserTimeSeriesDto);

            context.UserTimeSeries.Add(userTimeSeries);

            var result = await context.SaveChangesAsync(cancellationToken) > 0;

            if (!result) return Result<string>.Failure("Failed to create the user time series", 404);

            return Result<string>.Success(userTimeSeries.Id); 
        }
    }
}
