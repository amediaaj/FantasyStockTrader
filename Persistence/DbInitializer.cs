using System;
using Domain;

namespace Persistence;

public class DbInitializer
{
    public static async Task SeedData(AppDbContext context)
    {
        if (context.TimeSeries.Any()) return;

        var timeSeries = new List<UserTimeSeries> {
            new() {
                UserId = Guid.NewGuid().ToString(),
                TickerSymbol="MCD",
                Function="TIME_SERIES_DAILY"
            },
            new() {
                UserId = Guid.NewGuid().ToString(),
                TickerSymbol="MSFT",
                Function="TIME_SERIES_DAILY"
            },
            new() {
                UserId = Guid.NewGuid().ToString(),
                TickerSymbol="NKE",
                Function="TIME_SERIES_DAILY"
            },
            new() {
                UserId = Guid.NewGuid().ToString(),
                TickerSymbol="PFE",
                Function="TIME_SERIES_DAILY"
            },
            new() {
                UserId = Guid.NewGuid().ToString(),
                TickerSymbol="VZ",
                Function="TIME_SERIES_DAILY"
            },
            
        };

        context.AddRange(timeSeries);
        await context.SaveChangesAsync();
    }
}
