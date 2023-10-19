using url_shortener.Entities;

namespace url_shortener.Models.Repository.Interface;

public interface IXYZRepository
{
    public List<XYZ> GetAll();
    public XYZ? getUrlLongByShort(string urlShort);
    public XYZ createUrl(XYZForCreationDto creationDto);
    public bool isUrlShortExist(string urlShort);
    public bool isUrlLongExist(string urlLong);
    public void deleteUrl(int id);
    public void deleteUrl(string urlShort);
    public void updateUrl(int id, XYZForUpdateDto updateDto);

}