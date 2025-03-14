namespace Domain;

public class TimeSeries
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public required string TickerSymbol { get; set; }
    public required string Function { get; set; }
}
