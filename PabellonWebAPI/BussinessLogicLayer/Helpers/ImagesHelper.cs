using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;

namespace BussinessLogicLayer.Helpers
{
    public class ImagesHelper
    {
        private readonly IConfiguration _configuration;

        public ImagesHelper(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public string GetImage(string imgPath)
        {
            var folderPath = _configuration["ImagenesFolderPath"];
            if (!Directory.Exists(folderPath))
            {
                throw new Exception(GlobalResourses.ResourceAccessor.GetString("ImgFolderNonExist"));
            }

            string searchPattern = $"{imgPath}.*";
            try
            {
                var file = Directory.GetFiles(folderPath, searchPattern).First();
                var img = $"data:image/jpeg;base64,{Convert.ToBase64String(System.IO.File.ReadAllBytes(file))}";
                return img;
            }
            catch
            {
                throw new Exception(string.Format(GlobalResourses.ResourceAccessor.GetString("ImgNotFound"), imgPath));
            }
        }

        public async Task<string> SaveImage(IFormFile img)
        {
            var folderPath = _configuration["ImagenesFolderPath"];
            if (!Directory.Exists(folderPath))
            {
                throw new Exception(GlobalResourses.ResourceAccessor.GetString("ImgFolderNonExist"));
            }

            var fileName = $"{Guid.NewGuid().ToString()}{Path.GetExtension(img.FileName)}";
            var filePath = Path.Combine(folderPath, fileName);
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await img.CopyToAsync(stream);
            }

            return filePath;
        }
    }
}
