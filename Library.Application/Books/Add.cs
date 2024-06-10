using FluentValidation;
using Library.Application.Core;
using Library.Domain;
using Library.Persistence;
using MediatR;

namespace Library.Application.Books
{
    public class Add
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Book Book { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(_ => _.Book).SetValidator(new BookValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Books.Add(request.Book);
                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to add book");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
