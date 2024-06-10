using AutoMapper;
using Library.Domain;

namespace Library.Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Book, Book>();
        }
    }
}
