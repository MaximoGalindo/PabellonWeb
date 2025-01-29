using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;

namespace BussinessLogicLayer.Helpers
{
    public class ImagesHelper
    {
        private readonly IConfiguration _configuration;
        private readonly string _folderPath;

        public ImagesHelper(IConfiguration configuration)
        {
            _configuration = configuration;
            _folderPath = CheckImagesFolder();
        }

        public string CheckImagesFolder()
        {
            var folderPath = _configuration["ImagenesFolderPath"];
            if (!Directory.Exists(folderPath))
            {
                throw new Exception(GlobalResourses.ResourceAccessor.GetString("ImgFolderNonExist"));
            }
            return folderPath;
        }

        public string GetImage(string imgPath)
        {            
            try
            {   
                var img = $"data:image/jpeg;base64,{Convert.ToBase64String(System.IO.File.ReadAllBytes(imgPath))}";
                return img;
            }
            catch
            {
                throw new Exception(string.Format(GlobalResourses.ResourceAccessor.GetString("ImgNotFound"), imgPath));
            }
        }

        public async Task<string> SaveImage(IFormFile img)
        {
            var fileName = $"{Guid.NewGuid().ToString()}{Path.GetExtension(img.FileName)}";
            var filePath = Path.Combine(_folderPath, fileName);
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await img.CopyToAsync(stream);
            }

            return filePath;
        }
    }
}
