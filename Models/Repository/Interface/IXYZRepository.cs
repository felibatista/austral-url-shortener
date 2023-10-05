using url_shortener.Entities;

namespace url_shortener.Models.Repository.Interface;

public interface IXYZRepository
{
    public List<XYZ> GetAll();
    public XYZ? getUrlLongByShort(string urlShort);
    public XYZ createUrl(XYZForCreationDto creationDto);
}