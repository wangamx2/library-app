using FluentValidation;
using Library.Domain;

namespace Library.Application.Books
{
    public class BookValidator : AbstractValidator<Book>
    {
        public BookValidator()
        {
            RuleFor(_ => _.Title).NotEmpty();
            RuleFor(_ => _.Author).NotEmpty();
        }
    }
}
