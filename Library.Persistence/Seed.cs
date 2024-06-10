using Library.Domain;
using Microsoft.AspNetCore.Identity;

namespace Library.Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<User> userManager)
        {
            if (!userManager.Users.Any())
            {
                var users = new List<User>
                {
                    new User{ DisplayName="Joe", UserName = "joe", Email = "joe@test.com" },
                    new User{ DisplayName="Doe", UserName = "doe", Email = "doe@test.com" },
                    new User{ DisplayName="Jane", UserName = "jane", Email = "jane@test.com" }
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pass@word1");
                }
            }

            if (context.Books.Any()) return;

            var activities = new List<Book>
            {
                new Book
                {
                    Title = "Book 1",
                    Author = "Book one description",
                },
                new Book
                {
                    Title = "Book 2",
                    Author = "Book two description",
                },
                 new Book
                {
                    Title = "Book 3",
                    Author = "Book three description",
                }
            };

            await context.Books.AddRangeAsync(activities);
            await context.SaveChangesAsync();
        }
    }
}
