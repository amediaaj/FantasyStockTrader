namespace Domain;

public class UserTimeSeries
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public required string UserId { get; set; }
    public required string TickerSymbol { get; set; }
    public required string Function { get; set; }
}
