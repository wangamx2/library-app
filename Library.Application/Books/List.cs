using Library.Application.Core;
using Library.Domain;
using Library.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Library.Application.Books
{
    public class List
    {
        public class Query : IRequest<Result<List<Book>>> { }
        public class Handler : IRequestHandler<Query, Result<List<Book>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Result<List<Book>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Book>>.Success(await _context.Books.ToListAsync());
            }
        }
    }
}
