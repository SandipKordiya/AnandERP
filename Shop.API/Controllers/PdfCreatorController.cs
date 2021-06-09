using System.IO;
using System.Threading.Tasks;
using DinkToPdf;
using DinkToPdf.Contracts;
using Microsoft.AspNetCore.Mvc;
using Shop.API.Data;
using Shop.API.Helpers;

namespace Shop.API.Controllers
{

    [Route("api/pdfcreator")]
    [ApiController]
    public class PdfCreatorController : ControllerBase
    {
        private IConverter _converter;
        private readonly TemplateGenerator _temp;
        private readonly IShopRepository _repo;
        // private readonly UserListPdfExporter _userListPdfExporter;
        public PdfCreatorController(TemplateGenerator temp, IShopRepository repo, IConverter converter)
        {
            // _userListPdfExporter = userListPdfExporter;
            _repo = repo;
            _temp = temp;
            _converter = converter;
        }



        // [HttpGet("DownloadAsPdfAsync")]
        // public async Task<ActionResult> DownloadAsPdfAsync()
        // {
        //     var file = await _userListPdfExporter.GetUsersAsPdfAsync();

        //     var doc = new HtmlToPdfDocument()
        //     {
        //         GlobalSettings = {
        //             PaperSize = PaperKind.A4,
        //             Orientation = Orientation.Portrait
        //         },
        //         Objects = {
        //             new ObjectSettings()
        //             {
        //                   HtmlContent = _temp.GetInvoiceString(4),
        //                 //   WebSettings = { DefaultEncoding = "utf-8", UserStyleSheet = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/assets", "invoice.css") },
        //             }
        //         }
        //     };

        //     return File(_converter.Convert(doc), "application/pdf");
        // }

        [HttpGet("purchase/{id}")]
        public async Task<IActionResult> CreatePDF(int id)
        {
            var globalSettings = new GlobalSettings
            {
                ColorMode = ColorMode.Color,
                Orientation = Orientation.Landscape,
                PaperSize = PaperKind.A5,
                Margins = new MarginSettings { Top = 2, Left = 4, Right = 3, Bottom = 2 },
                DocumentTitle = "PDF Report",
                // Out = @"D:\PDFCreator\Employee_Report.pdf"
            };
            var objectSettings = new ObjectSettings
            {
                PagesCount = true,
                HtmlContent = _temp.GetInvoiceString(id),
                // WebSettings = { DefaultEncoding = "utf-8", UserStyleSheet = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/assets", "invoice.css") },

                // HeaderSettings = { FontName = "Arial", FontSize = 9, Right = "Page [page] of [toPage]", Line = true },
                // FooterSettings = { FontName = "Arial", FontSize = 9, Line = true, Center = "Report Footer" }
            };
            var pdf = new HtmlToPdfDocument()
            {
                GlobalSettings = globalSettings,
                Objects = { objectSettings }
            };

            var file = _converter.Convert(pdf);
            // _converter.Convert(pdf);
            // return Ok("Successfully created PDF document.");
            return File(file, "application/pdf");
            // return File(file, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "test");


        }


        [HttpGet("purchaseA4/{id}")]
        public async Task<IActionResult> CreatePDFA4(int id)
        {
            var globalSettings = new GlobalSettings
            {
                ColorMode = ColorMode.Color,
                Orientation = Orientation.Portrait,
                PaperSize = PaperKind.A4,
                Margins = new MarginSettings { Top = 2, Left = 4, Right = 3, Bottom = 2 },
                DocumentTitle = "PDF Report",
                // Out = @"D:\PDFCreator\Employee_Report.pdf"
            };
            var objectSettings = new ObjectSettings
            {
                PagesCount = true,
                HtmlContent = _temp.GetInvoiceString(id),
                // WebSettings = { DefaultEncoding = "utf-8", UserStyleSheet = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/assets", "invoice.css") },
                // HeaderSettings = { FontName = "Arial", FontSize = 9, Right = "Page [page] of [toPage]", Line = true },
                // FooterSettings = { FontName = "Arial", FontSize = 9, Line = true, Center = "Report Footer" }
            };
            var pdf = new HtmlToPdfDocument()
            {
                GlobalSettings = globalSettings,
                Objects = { objectSettings }
            };
            var file = _converter.Convert(pdf);
            // _converter.Convert(pdf);
            // return Ok("Successfully created PDF document.");
            return File(file, "application/pdf");

        }


        [HttpGet("sale/{id}")]
        public async Task<IActionResult> CreatePDFSale(int id)
        {
            var globalSettings = new GlobalSettings
            {
                ColorMode = ColorMode.Color,
                Orientation = Orientation.Landscape,
                PaperSize = PaperKind.A5,
                Margins = new MarginSettings { Top = 2, Left = 4, Right = 3, Bottom = 2 },
                DocumentTitle = "PDF Report",
                // Out = @"D:\PDFCreator\Employee_Report.pdf"
            };
            var objectSettings = new ObjectSettings
            {
                PagesCount = true,
                HtmlContent = await _temp.GetSaleInvoiceString(id),
                // WebSettings = { DefaultEncoding = "utf-8", UserStyleSheet = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/assets", "invoice.css") },
                // HeaderSettings = { FontName = "Arial", FontSize = 9, Right = "Page [page] of [toPage]", Line = true },
                // FooterSettings = { FontName = "Arial", FontSize = 9, Line = true, Center = "Report Footer" }
            };
            var pdf = new HtmlToPdfDocument()
            {
                GlobalSettings = globalSettings,
                Objects = { objectSettings }
            };
            var file = _converter.Convert(pdf);
            // _converter.Convert(pdf);
            // return Ok("Successfully created PDF document.");
            return File(file, "application/pdf");

        }


        [HttpGet("saleA4/{id}")]
        public async Task<IActionResult> CreatePDFSaleA4(int id)
        {
            var globalSettings = new GlobalSettings
            {
                ColorMode = ColorMode.Color,
                Orientation = Orientation.Portrait,
                PaperSize = PaperKind.A4,
                Margins = new MarginSettings { Top = 2, Left = 4, Right = 3, Bottom = 2 },
                DocumentTitle = "PDF Report",
                // Out = @"D:\PDFCreator\Employee_Report.pdf"
            };
            var objectSettings = new ObjectSettings
            {
                PagesCount = true,
                HtmlContent = await _temp.GetSaleInvoiceString(id),
                // WebSettings = { DefaultEncoding = "utf-8", UserStyleSheet = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/assets", "invoice.css") },
                // HeaderSettings = { FontName = "Arial", FontSize = 9, Right = "Page [page] of [toPage]", Line = true },
                // FooterSettings = { FontName = "Arial", FontSize = 9, Line = true, Center = "Report Footer" }
            };
            var pdf = new HtmlToPdfDocument()
            {
                GlobalSettings = globalSettings,
                Objects = { objectSettings }
            };
            var file = _converter.Convert(pdf);
            // _converter.Convert(pdf);
            // return Ok("Successfully created PDF document.");
            return File(file, "application/pdf");

        }
    }
}