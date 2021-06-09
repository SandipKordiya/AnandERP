using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Shop.API.Data;
using Shop.API.Dtos;
using Shop.API.Models;

namespace Shop.API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IShopRepository _repo;
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        public OrderController(IShopRepository repo, IMapper mapper,
        DataContext context)
        {
            _context = context;
            _mapper = mapper;
            _repo = repo;
        }


        [HttpGet("PurchaseOrders/{partyId}")]
        public async Task<IActionResult> GetPurchaseOrders(int partyId)
        {            
            var orders = await _repo.GetPurchaseListByPartyIdFromSP(partyId);
            return Ok(orders);
        }

        [HttpGet("SalesOrders/{partyId}")]
        public async Task<IActionResult> GetSalesOrders(int partyId)
        {
            var orders = await _repo.GetSaleListByPartyIdFromSP(partyId);
            return Ok(orders);
        }

        [HttpGet("SalesOrders/payment/{partyId}")]
        public async Task<IActionResult> GetSalesOrdersForPayment(int partyId)
        {
            var orders = await _repo.GetSaleListByPartyIdFromSPForPayment(partyId);
            return Ok(orders);
        }


        // [HttpGet("{id}", Name = "GetOrder")]
        // public async Task<IActionResult> GetOrder(int userId, int id)
        // {
        //     var order = await _repo.GetOrder(id);

        //     if (order == null)
        //         return NotFound();

        //     return Ok(order);
        // }

        // [HttpPost("{userId}")]
        // public async Task<IActionResult> CreateOrder(int userId, OrderForCreateDto orderForCreateDto)
        // {
        //     if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
        //         return Unauthorized();

        //     var order = _mapper.Map<Order>(orderForCreateDto);
        //     order.Created = DateTime.Now;
        //     order.UserId = userId;
        //     _repo.Add(order);

        //     var messageToReturn = _mapper.Map<OrderForCreateDto>(order);

        //     if (await _repo.SaveAll())
        //     {
        //         // foreach (var item in orderForCreateDto.OrderItems)
        //         // {
        //         //     var orderitems = _mapper.Map<OrderItem>(item);
        //         //     orderitems.OrderId = order.Id;
        //         //     orderitems.Created = DateTime.Now;
        //         //     _repo.Add(orderitems);
        //         //     await _repo.SaveAll();
        //         // }
        //         //  return CreatedAtRoute("GetPurchase", new { id = order.Id }, messageToReturn);
        //         return Ok(order.Id);
        //     }

        //     return BadRequest("Failed to create purchase");
        //     // throw new Exception("Creating the message failed to save");
        // }


        // // [HttpGet("Stock/{productId}")]
        // // public async Task<IActionResult> GetStockForProduct(int productId)
        // // {
        // //     var stockPurchase = _context.OrderItems.Where(m => m.ProductId == productId
        // //     && m.OrderType == OrderType.Purchase
        // //     && m.IsSell != true).Sum(m => m.Quantity);

        // //     var stockSell = _context.OrderItems.Where(m => m.ProductId == productId
        // //   && m.OrderType == OrderType.Sell
        // //   && m.IsSell != true).Sum(m => m.Quantity);

        // //     var stock = stockPurchase - stockSell;
        // //     return Ok(stock);
        // // }

        // [HttpGet("find/sellproducts/{search}")]
        // public async Task<IActionResult> sellproducts(string search)
        // {
        //     var products = await (from item in _context.Products
        //                           where item.ProductName.Contains(search)
        //                           //   join db in _context.OrderItems on item.Id equals db.ProductId
        //                           from db in _context.OrderItems.Where(x => x.ProductId == item.Id && x.OrderType == OrderType.Purchase).DefaultIfEmpty()

        //                           select new
        //                           {
        //                               Id = item.Id,
        //                               ProductName = item.ProductName,
        //                               ProductSKU = item.ProductSKU,
        //                               ProductCode = item.ProductCode,
        //                               BatchNo = db.BatchNo,
        //                               ExpireDate = db.ExpireDate,
        //                               Rate = db.Rate,
        //                               PurchageRate = db.PurchageRate,
        //                               SaleMargin = db.SaleMargin,
        //                               MRP = db.MRP,
        //                               SaleRate = db.SaleRate,
        //                               IsReturnable = item.IsReturnable,
        //                               IsAllowMinStockSale = item.IsAllowMinStockSale,
        //                               Remark = item.Remark,
        //                               TaxId = db.TaxId,
        //                               Tax = db.Tax.Rate,
        //                               PurchaseQuantity = Convert.ToDecimal(_context.OrderItems.Where(m => m.OrderType == OrderType.Purchase && m.ProductId == item.Id).Sum(m => m.Quantity)),
        //                               SellQuantity = Convert.ToDecimal(_context.OrderItems.Where(m => m.OrderType == OrderType.Sell && m.ProductId == item.Id).Sum(m => m.Quantity)),
        //                               //   Stock = Convert.ToDecimal(_context.OrderItems.Where(m => m.OrderType == OrderType.Purchase && m.ProductId == item.Id).Sum(m => m.Quantity)) -
        //                               //     Convert.ToDecimal(_context.OrderItems.Where(m => m.OrderType == OrderType.Sell && m.ProductId == item.Id).Sum(m => m.Quantity))
        //                               //   Stock = 4.0 - Convert.ToDouble(_context.OrderItems.Where(m => m.OrderType == OrderType.Sell && m.ProductId == item.Id).Sum(m => m.Quantity))
        //                           }
        //               ).ToListAsync();
        //     var result = products.Where(p => p.ProductName != null).GroupBy(p => p.Id).Select(grp => grp.FirstOrDefault());


        //     // var products = await (from item in _context.Products
        //     //                       where item.ProductName.Contains(search)
        //     //                       from e in _context.OrderItems.Where(x => x.ProductId == item.Id && x.OrderType == OrderType.Purchase).DefaultIfEmpty()
        //     //                       select new
        //     //                       {
        //     //                           Id = item.Id,
        //     //                           ProductName = item.ProductName,
        //     //                           ProductSKU = item.ProductSKU,
        //     //                           ProductCode = item.ProductCode,
        //     //                           BatchNo = e.BatchNo,
        //     //                           ExpireDate = e.ExpireDate,
        //     //                           Rate = e.Rate,
        //     //                           PurchageRate = e.PurchageRate,
        //     //                           SaleMargin = e.SaleMargin,
        //     //                           MRP = e.MRP,
        //     //                           SaleRate = e.SaleRate,
        //     //                           IsReturnable = item.IsReturnable,
        //     //                           IsAllowMinStockSale = item.IsAllowMinStockSale,
        //     //                           Remark = item.Remark,
        //     //                           TaxId = e.TaxId,
        //     //                           Tax = e.Tax.Rate,
        //     //                           PurchaseQuantity = _context.OrderItems.Where(m => m.OrderType == OrderType.Purchase && m.ProductId == item.Id).Sum(m => m.Quantity),
        //     //                           SellQuantity = _context.OrderItems.Where(m => m.OrderType == OrderType.Sell && m.ProductId == item.Id).Sum(m => m.Quantity)

        //     //                       }
        //     // ).Distinct().ToListAsync();

        //     return Ok(result);
        // }

        // [HttpGet("Stocks")]
        // public async Task<IActionResult> GetStocks()
        // {

        //     var products = await (from item in _context.Products
        //                           join db in _context.OrderItems on item.Id equals db.ProductId
        //                           group db by db.OrderType into g
        //                           select new
        //                           {

        //                               abc = g.Sum(m => m.Quantity)
        //                               // abc = g.Key.Sum()
        //                               //   Quantity = g.Where(m => m.OrderType == OrderType.Purchase).Sum(m => m.Quantity),
        //                               //   PQuantity = g.Where(m => m.OrderType == OrderType.Sell).Sum(m => m.Quantity)


        //                           }
        //     //   select new
        //     //   {
        //     //     //  PurchaseQuantity = db.ProductId
        //     //     //   SellQuantity = _context.OrderItems.Where(m => m.OrderType == OrderType.Sell && m.ProductId == item.Id).Sum(m => m.Quantity),
        //     //     //   Stock = _context.OrderItems.Where(m => m.OrderType == OrderType.Purchase && m.ProductId == item.Id).Sum(m => m.Quantity) -
        //     //     //   _context.OrderItems.Where(m => m.OrderType == OrderType.Sell && m.ProductId == item.Id).Sum(m => m.Quantity)
        //     //   }
        //     ).ToListAsync();
        //     //                   var  PurchaseQuantity =    products.Where(m =>m.xyz == "Purchase").FirstOrDefault();
        //     //                   var  SellQuantity =    products.Where(m=>m.xyz =="Sell").FirstOrDefault();
        //     //                   var itemdata = new {
        //     // PurchaseQuantity = PurchaseQuantity,
        //     // SellQuantity = SellQuantity
        //     //                   };
        //     return Ok(products);
        // }

        // [HttpGet("GetStocks")]
        // public async Task<IActionResult> GetStocksList()
        // {

        //     var products = await (from item in _context.Products
        //                           where item.ProductName.Contains("Product")
        //                           //   join db in _context.OrderItems on item.Id equals db.ProductId
        //                           from db in _context.OrderItems.Where(x => x.ProductId == item.Id && x.OrderType == OrderType.Purchase).DefaultIfEmpty()

        //                           select new
        //                           {
        //                               PurchaseQuantity = Convert.ToDecimal(_context.OrderItems.Where(m => m.OrderType == OrderType.Purchase && m.ProductId == item.Id).Sum(m => m.Quantity)),
        //                               SellQuantity = Convert.ToDecimal(_context.OrderItems.Where(m => m.OrderType == OrderType.Sell && m.ProductId == item.Id).Sum(m => m.Quantity)),
        //                               //   Stock = Convert.ToDecimal(_context.OrderItems.Where(m => m.OrderType == OrderType.Purchase && m.ProductId == item.Id).Sum(m => m.Quantity)) -
        //                               //     Convert.ToDecimal(_context.OrderItems.Where(m => m.OrderType == OrderType.Sell && m.ProductId == item.Id).Sum(m => m.Quantity))
        //                               //   Stock = 4.0 - Convert.ToDouble(_context.OrderItems.Where(m => m.OrderType == OrderType.Sell && m.ProductId == item.Id).Sum(m => m.Quantity))
        //                           }
        //     ).Distinct().ToListAsync();
        //     //                   var  PurchaseQuantity =    products.Where(m =>m.xyz == "Purchase").FirstOrDefault();
        //     //                   var  SellQuantity =    products.Where(m=>m.xyz =="Sell").FirstOrDefault();
        //     //                   var itemdata = new {
        //     // PurchaseQuantity = PurchaseQuantity,
        //     // SellQuantity = SellQuantity
        //     //                   };
        //     return Ok(products);
        // }

    }
}