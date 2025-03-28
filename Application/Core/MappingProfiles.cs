using Application.TimeSeries.DTOs;
using AutoMapper;
using Domain;

namespace Application.Core;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<UserTimeSeries, UserTimeSeries>();
        CreateMap<CreateUserTimeSeriesDto, UserTimeSeries>();
    }
}
