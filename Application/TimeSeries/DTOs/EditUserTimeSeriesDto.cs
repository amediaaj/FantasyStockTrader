using System;

namespace Application.TimeSeries.DTOs;

public class EditUserTimeSeriesDto : BaseUserTimeSeriesDto
{
   public string Id { get; set; } = string.Empty;
}
