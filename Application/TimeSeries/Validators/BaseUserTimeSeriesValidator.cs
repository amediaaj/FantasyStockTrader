using Application.TimeSeries.DTOs;
using FluentValidation;

namespace Application.TimeSeries.Validators;

public class BaseUserTimeSeriesValidator<T, TDto> : AbstractValidator<T> where TDto 
    : BaseUserTimeSeriesDto
{
    public BaseUserTimeSeriesValidator(Func<T, TDto> selector)
    {
        RuleFor(x => selector(x).UserId).NotEmpty().WithMessage("User Id is required");
        RuleFor(x => selector(x).TickerSymbol).NotEmpty().WithMessage("Ticker Symbol is required");
        RuleFor(x => selector(x).Function).NotEmpty().WithMessage("Function is required");
    }
}
