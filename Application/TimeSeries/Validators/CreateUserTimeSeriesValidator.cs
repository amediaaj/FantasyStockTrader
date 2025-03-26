using System;
using Application.TimeSeries.Commands;
using FluentValidation;

namespace Application.TimeSeries.Validators;

public class CreateUserTimeSeriesValidator : AbstractValidator<CreateUserTimeSeries.Command>
{
     public CreateUserTimeSeriesValidator()
     {
        RuleFor(x => x.UserTimeSeriesDto.UserId).NotEmpty().WithMessage("User Id is required");
        RuleFor(x => x.UserTimeSeriesDto.TickerSymbol).NotEmpty().WithMessage("Ticker Symbol is required");
     }
}
