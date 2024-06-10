using AutoMapper;
using FluentValidation;
using Library.Application.Core;
using Library.Domain;
using Library.Persistence;
using MediatR;

namespace Library.Application.Books
{
    public class Edit
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
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var dish = await _context.Books.FindAsync(request.Book.Id);
                if (dish == null) return null;

                _mapper.Map(request.Book, dish);
                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to update book");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
