using System;

namespace Application.TimeSeries.DTOs;

public class BaseUserTimeSeriesDto
{
    public string UserId { get; set; } = string.Empty;
    public string TickerSymbol { get; set; } = string.Empty;
    public string Function { get; set; } = string.Empty;
}
