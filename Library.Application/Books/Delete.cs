using Library.Application.Core;
using Library.Persistence;
using MediatR;

namespace Library.Application.Books
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
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
                var dish = await _context.Books.FindAsync(request.Id);
                if (dish == null) return null;

                _context.Remove(dish);
                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to delete dish");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
