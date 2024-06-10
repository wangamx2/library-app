using Microsoft.AspNetCore.Identity;

namespace Library.Domain
{
    public class User : IdentityUser
    {
        public string DisplayName { get; set; }
    }
}
