using System;
using System.ComponentModel;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence;

public class DbInitializer
{
    public static async Task SeedData(AppDbContext context, UserManager<User> UserManager)
    {
        if (!UserManager.Users.Any())
        {
            var users = new List<User>
            {
                new() {DisplayName = "Alex", UserName="aamedia@asu.edu", Email = "aamedia@asu.edu"},
                new() {DisplayName = "Cassidy", UserName="cassidyhare@gmail.com", Email = "cassidyhare@gmail.com"},
                new() {DisplayName = "Bill", UserName="billy_twoshoes520@gmail.com", Email = "billy_twoshoes520@gmail.com"}
            };

            foreach (var user in users)
            {
                await UserManager.CreateAsync(user, "Pa$$w0rd");
            }
        }

        if (context.UserTimeSeries.Any()) return;

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
                TickerSymbol="AAPL",
                Function="TIME_SERIES_DAILY"
            },
            new() {
                UserId = Guid.NewGuid().ToString(),
                TickerSymbol="NVDA",
                Function="TIME_SERIES_DAILY"
            },

        };

        context.AddRange(timeSeries);
        await context.SaveChangesAsync();
    }
}
