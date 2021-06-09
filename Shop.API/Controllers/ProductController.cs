using System;
using System.Data;
using System.Data.OleDb;
using System.Data.SqlClient;
using System.IO;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Shop.API.Data;
using Shop.API.Dtos;
using Shop.API.Models;

namespace Shop.API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IShopRepository _repo;
        private readonly IMapper _mapper;
        private readonly IProductRepository _prod;
        private IHostingEnvironment _host;
        public ProductController(IShopRepository repo, IMapper mapper, IProductRepository prod,
        IHostingEnvironment host)
        {
            _prod = prod;
            _mapper = mapper;
            _repo = repo;
            _host = host;
        }



        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            var partiesFromRepo = await _prod.GetProductLists();
            return Ok(partiesFromRepo);
        }

        [HttpGet("find/{search}")]
        public async Task<IActionResult> GetSearchProducts(string search)
        {
            var partiesFromRepo = await _prod.GetSearchProducts(search);
            return Ok(partiesFromRepo);
        }
        [HttpGet("find/purchase/{search}")]
        public async Task<IActionResult> GetProductSearchPurchase(string search)
        {
            var list = await _prod.GetProductSearchModels(search);
            return Ok(list);
        }

        [HttpGet("find/sell/{search}")]
        public async Task<IActionResult> GetSearchSellProducts(string search)
        {
            var partiesFromRepo = await _prod.GetSearchProducts(search);
            return Ok(partiesFromRepo);
        }

        [HttpGet("find/batch/{id}")]
        public async Task<IActionResult> GetSearchProductsByBatch(int id)
        {
            var partiesFromRepo = await _repo.GetSearchProductsBatchbyProductId(id);
            return Ok(partiesFromRepo);
        }

        [HttpGet("find/batchlist/{productId}")]
        public async Task<IActionResult> GetProductsWithBatchsByProductId(int productId)
        {
            var partiesFromRepo = await _prod.GetSearchProductsByProductId(productId);
            return Ok(partiesFromRepo);
        }

        [HttpGet("find/batchlistByParty/{productId}/{partyId}/{branchId}")]
        public async Task<IActionResult> GetProductsWithBatchsByProductIdAndParty(int productId, int partyId, int branchId)
        {
            var partiesFromRepo = await _prod.GetSearchProductsByProductIdAndParty(productId, partyId, branchId);
            return Ok(partiesFromRepo);
        }

        [HttpGet("find/batchlistByBatch/{productId}/{branchId}")]
        public async Task<IActionResult> GetProductsWithBatchsByProductIdAndBatch(int productId, int branchId)
        {
            var partiesFromRepo = await _prod.GetSearchProductsByProductIdAndBatch(productId, branchId);
            return Ok(partiesFromRepo);
        }

        [HttpGet("find/purchase/batchlist/{productId}/{partyId}")]
        public async Task<IActionResult> GetProductsWithBatchsByProductIdAndClientId(int productId, int partyId)
        {
            var partiesFromRepo = await _repo.GetPurchaseOrderItemsModelsFromParty(productId, partyId);
            return Ok(partiesFromRepo);
        }

        [HttpGet("find/sale/batchlist/{productId}/{partyId}")]
        public async Task<IActionResult> GetProductsSaleWithBatchsByProductIdAndClientId(int productId, int partyId)
        {
            var partiesFromRepo = await _prod.GetProductSaleOrderItemsModels(productId, partyId);
            return Ok(partiesFromRepo);
        }

        [HttpGet("find/stock/batchlist/{productId}/{branchId}")]
        public async Task<IActionResult> GetProductsWithBatchsByProductIdAndStockItems(int productId, int branchId)
        {
            var partiesFromRepo = await _repo.GetProductStockItemsModelsFromBranchIdAndProductId(branchId, productId);
            return Ok(partiesFromRepo);
        }


        [HttpGet("{id}", Name = "GetProduct")]
        public async Task<IActionResult> GetProduct(int userId, int id)
        {
            var messageFromRepo = await _repo.GetProduct(id);

            if (messageFromRepo == null)
                return NotFound();

            return Ok(messageFromRepo);
        }

        [HttpGet("GetProductInfo/{id}")]
        public async Task<IActionResult> GetProductInfo(int id)
        {
            var messageFromRepo = await _repo.GetProduct(id);

            if (messageFromRepo == null)
                return NotFound();

            return Ok(messageFromRepo);
        }

        [HttpPost]
        public async Task<IActionResult> CreateProduct(ProductForCreateDto partyForCreateDto)
        {

            try
            {
                var product = _mapper.Map<Product>(partyForCreateDto);
                product.Created = DateTime.Now;
                if (partyForCreateDto.TaxEffectDate == null)
                    partyForCreateDto.TaxEffectDate = DateTime.Now;
                _repo.Add(product);

                if (await _repo.SaveAll())
                    return Ok();

                throw new Exception("Creating the message failed to save");
            }
            catch (System.Exception ex)
            {
                throw ex;
            }

        }


        [HttpPost("ImportExcelFile")]
        public async Task<IActionResult> ImportExcelFile(IFormFile FormFile)
        {

            //get file name
            var filename = ContentDispositionHeaderValue.Parse(FormFile.ContentDisposition).FileName.Trim('"');

            //get path
            var MainPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Uploads");

            //create directory "Uploads" if it doesn't exists
            if (!Directory.Exists(MainPath))
            {
                Directory.CreateDirectory(MainPath);
            }

            //get file path 
            var filePath = Path.Combine(MainPath, FormFile.FileName);
            using (System.IO.Stream stream = new FileStream(filePath, FileMode.Create))
            {
                await FormFile.CopyToAsync(stream);
            }

            //get extension
            string extension = Path.GetExtension(filename);


            string conString = string.Empty;

            switch (extension)
            {
                case ".xls": //Excel 97-03.
                    conString = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" + filePath + ";Extended Properties='Excel 8.0;HDR=YES'";
                    break;
                case ".xlsx": //Excel 07 and above.
                    conString = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source=" + filePath + ";Extended Properties='Excel 8.0;HDR=YES'";
                    break;
            }

            DataTable dt = new DataTable();
            conString = string.Format(conString, filePath);

            using (OleDbConnection connExcel = new OleDbConnection(conString))
            {
                using (OleDbCommand cmdExcel = new OleDbCommand())
                {
                    using (OleDbDataAdapter odaExcel = new OleDbDataAdapter())
                    {
                        cmdExcel.Connection = connExcel;

                        //Get the name of First Sheet.
                        connExcel.Open();
                        DataTable dtExcelSchema;
                        dtExcelSchema = connExcel.GetOleDbSchemaTable(OleDbSchemaGuid.Tables, null);
                        string sheetName = dtExcelSchema.Rows[0]["TABLE_NAME"].ToString();
                        connExcel.Close();

                        //Read Data from First Sheet.
                        connExcel.Open();
                        cmdExcel.CommandText = "SELECT * From [" + sheetName + "]";
                        odaExcel.SelectCommand = cmdExcel;
                        odaExcel.Fill(dt);
                        connExcel.Close();
                    }
                }
            }
            //your database connection string
            //conString = @"Data Source=.;Initial Catalog=AnandERP;Integrated Security=True;";
            conString = @"Data Source=103.235.106.17;Initial Catalog=AnandERP;User ID=AnandERP;Password=UveshPC@321;Integrated Security=False;Connect Timeout=15;Encrypt=False;Packet Size=4096;";

            using (SqlConnection con = new SqlConnection(conString))
            {
                using (SqlBulkCopy sqlBulkCopy = new SqlBulkCopy(con))
                {
                    //Set the database table name.
                    sqlBulkCopy.DestinationTableName = "dbo.Products";

                    // Map the Excel columns with that of the database table, this is optional but good if you do
                    // 
                    sqlBulkCopy.ColumnMappings.Add("BrandId", "BrandId");
                    sqlBulkCopy.ColumnMappings.Add("CategoryId", "CategoryId");
                    sqlBulkCopy.ColumnMappings.Add("Description", "Description");
                    sqlBulkCopy.ColumnMappings.Add("ProductName", "ProductName");
                    sqlBulkCopy.ColumnMappings.Add("ProductCode", "ProductCode");
                    sqlBulkCopy.ColumnMappings.Add("ProductSKU", "ProductSKU");
                    sqlBulkCopy.ColumnMappings.Add("TaxEffectDate", "TaxEffectDate");
                    sqlBulkCopy.ColumnMappings.Add("HSNCode", "HSNCode");
                    sqlBulkCopy.ColumnMappings.Add("PurchageRate", "PurchageRate");
                    sqlBulkCopy.ColumnMappings.Add("SaleMargin", "SaleMargin");
                    sqlBulkCopy.ColumnMappings.Add("MRP", "MRP");
                    sqlBulkCopy.ColumnMappings.Add("SaleRate", "SaleRate");
                    sqlBulkCopy.ColumnMappings.Add("IsReturnable", "IsReturnable");
                    sqlBulkCopy.ColumnMappings.Add("IsAllowMinStockSale", "IsAllowMinStockSale");
                    sqlBulkCopy.ColumnMappings.Add("IsStockable", "IsStockable");
                    sqlBulkCopy.ColumnMappings.Add("Remark", "Remark");
                    sqlBulkCopy.ColumnMappings.Add("WarrantyMonth", "WarrantyMonth");
                    sqlBulkCopy.ColumnMappings.Add("Created", "Created");
                    sqlBulkCopy.ColumnMappings.Add("TaxId", "TaxId");

                    con.Open();
                    sqlBulkCopy.WriteToServer(dt);
                    con.Close();
                }
            }
            //if the code reach here means everthing goes fine and excel data is imported into database
            // ViewBag.Message = "File Imported and excel data saved into database";
            return Ok(true);
            // throw new Exception("Creating the message failed to save");
        }
    }
}