using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using DinkToPdf;
using DinkToPdf.Contracts;
using Shop.API.Data;
using Shop.API.ViewModels;

namespace Shop.API.Helpers
{
    public class UserListPdfExporter
    {
        private readonly IConverter _converter;
        private readonly IShopRepository _repo;

        public UserListPdfExporter(IShopRepository repo, IConverter converter)
        {
            _repo = repo;
            _converter = converter;
        }
        public async Task<FileDto> GetUsersAsPdfAsync()
        {
            // var users = await _userRepository.GetAllListAsync();
            var Order = _repo.GetPurchaseOrderModelFromSP(4).Result;
            string amountInWords = CurrencyInWords.ConvertToWords(Order.NetAmount.ToString());
            var OrderItems = _repo.GetPurchaseOrderItemsModelsFromSP(4).Result;
            var html = ConvertUserListToHtmlTable(OrderItems);

            var doc = new HtmlToPdfDocument()
            {
                GlobalSettings = {
                    PaperSize = PaperKind.A4,
                    Orientation = Orientation.Portrait
                },
                Objects = {
                    new ObjectSettings()
                    {
                        HtmlContent = html
                    }
                }
            };
            return new FileDto("UserList.pdf", _converter.Convert(doc));
        }
        private string ConvertUserListToHtmlTable(List<PurchaseOrderItemsModel> users)
        {
            var header1 = "<th>Username</th>";
            var header2 = "<th>Name</th>";
            var header3 = "<th>Surname</th>";
            var header4 = "<th>Email Address</th>";
            var headers = $"<tr>{header1}{header2}{header3}{header4}</tr>";
            var rows = new StringBuilder();
            foreach (var user in users)
            {
                var column1 = $"<td>{user.MRP}</td>";
                var column2 = $"<td>{user.BatchNo}</td>";
                var column3 = $"<td>{user.ProductName}</td>";
                var column4 = $"<td>{user.Rate}</td>";
                var row = $"<tr>{column1}{column2}{column3}{column4}</tr>";
                rows.Append(row);
            }
            return $"<table>{headers}{rows.ToString()}</table>";
        }
    }
    public class FileDto
    {
        public string FileName { get; set; }
        public byte[] FileBytes { get; set; }
        public FileDto(string fileName, byte[] fileBytes)
        {
            FileName = fileName;
            FileBytes = fileBytes;
        }
    }
}