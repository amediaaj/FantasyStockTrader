using System;
using Application.TimeSeries.Commands;
using Application.TimeSeries.DTOs;
using FluentValidation;

namespace Application.TimeSeries.Validators;

public class EditUserTimeSeriesValidator : BaseUserTimeSeriesValidator<EditUserTimeSeries.Command, EditUserTimeSeriesDto>
{
    public EditUserTimeSeriesValidator() : base(x => x.UserTimeSeriesDto)
    {
        RuleFor(x => x.UserTimeSeriesDto.Id)
            .NotEmpty().WithMessage("Id is required");
    }
}
