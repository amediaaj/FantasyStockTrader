using System;
using Application.TimeSeries.Commands;
using Application.TimeSeries.DTOs;
using FluentValidation;

namespace Application.TimeSeries.Validators;

public class CreateUserTimeSeriesValidator 
   : BaseUserTimeSeriesValidator<CreateUserTimeSeries.Command, CreateUserTimeSeriesDto>
{
     public CreateUserTimeSeriesValidator() : base(x => x.UserTimeSeriesDto) {}
}
