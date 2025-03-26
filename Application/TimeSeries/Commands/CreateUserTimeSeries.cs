using Application.TimeSeries.DTOs;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.TimeSeries.Commands;

public class CreateUserTimeSeries
{
    public class Command : IRequest<string>
    {
        public required CreateUserTimeSeriesDto UserTimeSeriesDto { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command, string>
    {
        public async Task<string> Handle(Command request, CancellationToken cancellationToken)
        {
            var userTimeSeries = mapper.Map<UserTimeSeries>(request.UserTimeSeriesDto);

            context.UserTimeSeries.Add(userTimeSeries);

            await context.SaveChangesAsync(cancellationToken);

            return userTimeSeries.Id;
        }
    }
}
