using System;
using Domain;

namespace Persistence;

public class DbInitializer
{
    public static async Task SeedData(AppDbContext context)
    {
        if (context.TimeSeries.Any()) return;

        var timeSeries = new List<TimeSeries> {
            new() {
                TickerSymbol="MCD",
                Function="TIME_SERIES_INTRADAY"
            },
            new() {
                TickerSymbol="MSFT",
                Function="TIME_SERIES_DAILY"
            },
            new() {
                TickerSymbol="NKE",
                Function="TIME_SERIES_INTRADAY"
            },
            new() {
                TickerSymbol="PFE",
                Function="TIME_SERIES_DAILY"
            },
            new() {
                TickerSymbol="VZ",
                Function="TIME_SERIES_DAILY"
            },
            
        };

        context.AddRange(timeSeries);
        await context.SaveChangesAsync();
    }
}
