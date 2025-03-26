
namespace Application.TimeSeries.DTOs;

public class CreateUserTimeSeriesDto
{
    public string UserId { get; set; } = string.Empty;
    public string TickerSymbol { get; set; } = string.Empty;
    public string Function { get; set; } = string.Empty;
}
