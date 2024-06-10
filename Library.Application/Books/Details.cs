using Library.Application.Core;
using Library.Domain;
using Library.Persistence;
using MediatR;

namespace Library.Application.Books
{
    public class Details
    {
        public class Query : IRequest<Result<Book>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Book>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Result<Book>> Handle(Query request, CancellationToken cancellationToken)
            {
                var dish = await _context.Books.FindAsync(request.Id);

                return Result<Book>.Success(dish);
            }
        }
    }
}
