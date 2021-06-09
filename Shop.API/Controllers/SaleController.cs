using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Shop.API.Data;
using Shop.API.Dtos;
using Shop.API.Extensions;
using Shop.API.Helpers;
using Shop.API.Interfaces;
using Shop.API.Models;

namespace Shop.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SaleController : ControllerBase
    {
        private readonly IShopRepository _repo;
        private readonly IMapper _mapper;
        private readonly ILedgerService _ledgerService;
        private readonly ISaleRepository _saleRepo;
        public SaleController(IShopRepository repo, IMapper mapper, ISaleRepository saleRepo,
        ILedgerService ledgerService)
        {
            _saleRepo = saleRepo;
            _ledgerService = ledgerService;
            _mapper = mapper;
            _repo = repo;
        }


        [HttpGet]
        public async Task<IActionResult> GetAllSales()
        {
            var partiesFromRepo = await _repo.GetSaleListFromSP();
            return Ok(partiesFromRepo);
        }

        [HttpGet("GetSale/{id}")]
        public async Task<IActionResult> GetSale(int id)
        {
            var messageFromRepo = await _repo.GetSale(id);

            if (messageFromRepo == null)
                return NotFound();

            return Ok(messageFromRepo);
        }

        [HttpGet("GetSaleOrder/{id}")]
        public async Task<IActionResult> GetSaleOrder(int id)
        {
            var messageFromRepo = await _repo.GetSaleOrderModelFromSP(id);

            if (messageFromRepo == null)
                return NotFound();

            return Ok(messageFromRepo);
        }

        [HttpGet("GetSaleItemsFromSP/{saleId}")]
        public async Task<IActionResult> GetSaleItemsFromSP(int saleId)
        {
            var messageFromRepo = await _repo.GetSaleOrderItemsModelsFromSP(saleId);

            if (messageFromRepo == null)
                return NotFound();

            return Ok(messageFromRepo);
        }




        [HttpPost("{userId}")]
        public async Task<IActionResult> Create(int userId, SaleForCreateDto saleForCreateDto)
        {

            // if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            //     return Unauthorized();
  if (userId == 0)
                return Unauthorized();
            saleForCreateDto.Created = DateTime.Now;
            saleForCreateDto.UserId = userId;

            var order = _mapper.Map<Sale>(saleForCreateDto);
            order.Created = DateTime.Now;
            _repo.Add(order);

            if (await _repo.SaveAll())
            {
                var ledgerModel = new LedgerDto
                {
                    BranchId = order.BranchId,
                    UserId = userId,
                    PartyId = order.PartyId,
                    OrderId = order.Id,
                    OrderType = "Sale",
                    OldNetAmount = 0,
                    NetAmount = order.NetAmount

                };
                var result = await _ledgerService.CreateSaleLedger(userId, "Sale", ledgerModel);
                if (result == true)
                    return Ok();

                return BadRequest("Ledger not added. please add manually or contact backoffice");

            }

            return BadRequest("Something wrong");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSale(int id, SaleModelForUpdateDto model)
        {
            var userId = id;
            if (userId == 0)
                return Unauthorized();

            var saleFromRepo = await _repo.GetSale(id);
            decimal SaleOldAmount = saleFromRepo.NetAmount;

            if (saleFromRepo == null)
                return BadRequest("Order Not Found");

            model.SaleForUpdateDto.UserId = userId;
            _mapper.Map(model.SaleForUpdateDto, saleFromRepo);

            // Delete children
            // foreach (var existingChild in purchaseFromRepo.PurchaseOrderItems)
            // {
            //     var itemFromRepo = await _repo.GetPurchaseOrderItem(id);
            //     _repo.Delete(itemFromRepo);
            // }

            // Update and Insert children
            foreach (var childModel in model.SalesItems)
            {
                var existingChild = saleFromRepo.SalesItems
                    .Where(c => c.Id == childModel.Id)
                    .SingleOrDefault();
                childModel.SaleId = id;
                if (existingChild != null)
                    // Update child
                    _mapper.Map(childModel, existingChild);
                else
                {
                    // Insert child
                    var saleOrderItem = _mapper.Map<SalesItem>(childModel);
                    saleOrderItem.Created = DateTime.Now;
                    _repo.Add(saleOrderItem);
                }
            }


            if (await _repo.SaveAll())
            {
                var result = false;
                if (saleFromRepo.NetAmount > SaleOldAmount || saleFromRepo.NetAmount < SaleOldAmount)
                {
                    var ledgerModel = new LedgerDto
                    {
                        BranchId = saleFromRepo.BranchId,
                        UserId = userId,
                        PartyId = saleFromRepo.PartyId,
                        OrderId = saleFromRepo.Id,
                        OrderType = "Sale",
                        OldNetAmount = SaleOldAmount,
                        NetAmount = saleFromRepo.NetAmount

                    };
                    result = await _ledgerService.UpdateLedger(userId, "Sale", ledgerModel);
                    if (result == true)
                        return Ok();
                }
                if (saleFromRepo.NetAmount == SaleOldAmount)
                    return Ok();

                return BadRequest("Ledger not added. please add manually or contact backoffice");
            }

            return BadRequest("Something wrong");
        }


        [HttpGet("GetAllSalesReturnList/{branchId}")]
        public async Task<IActionResult> GetAllSalesReturns(int branchId)
        {
            var partiesFromRepo = await _repo.GetSaleReturnListFromSP(branchId);
            return Ok(partiesFromRepo);
        }

        [HttpPost("salereturn/{userId}")]
        public async Task<IActionResult> CreateSaleReturn(int userId, SaleReturnForCreateDto saleReturnForCreateDto)
        {

             if (userId == 0)
                return Unauthorized();

            saleReturnForCreateDto.Created = DateTime.Now;
            saleReturnForCreateDto.UserId = userId;

            var order = _mapper.Map<SaleReturn>(saleReturnForCreateDto);
            order.Created = DateTime.Now;
            _repo.Add(order);

            // var messageToReturn = _mapper.Map<SaleReturnForCreateDto>(order);

            if (await _repo.SaveAll())
            {
                var ledgerModel = new LedgerDto
                {
                    BranchId = order.BranchId,
                    UserId = userId,
                    PartyId = order.PartyId,
                    OrderId = order.Id,
                    OrderType = "SaleReturn",
                    OldNetAmount = 0,
                    NetAmount = order.NetAmount

                };
                var result = await _ledgerService.CreateSaleReturnLedger(userId, "SaleReturn", ledgerModel);
                if (result == true)
                    return Ok();

                return BadRequest("Ledger not added. please add manually or contact backoffice");
            }

            return BadRequest("Something wrong");
        }


        //reporting
        [HttpGet("GetSalesDue/{branchId}")]
        public async Task<IActionResult> GetSalesDue(int branchId)
        {
            var messageFromRepo = await _saleRepo.GetSaleInvoiceDueListViewModels(branchId);

            if (messageFromRepo == null)
                return NotFound();

            return Ok(messageFromRepo);
        }


        [HttpGet("GetSalesDetails/{branchId}")]
        public async Task<IActionResult> GetSalesDetails(int branchId)
        {
            var messageFromRepo = await _saleRepo.GetSalesDetailViewModels(branchId, DateTime.Now, DateTime.Now);

            if (messageFromRepo == null)
                return NotFound();

            return Ok(messageFromRepo);
        }

        //reporting
        [HttpGet("ItemwiseSales")]
        public async Task<IActionResult> ItemwiseSales([FromQuery] ItemWiseParams Params)
        {
            var partiesFromRepo = await _repo.GetItemWiseSaleViewModels(Params);
            return Ok(partiesFromRepo);
        }


        [HttpGet("SalesDetails")]
        public async Task<IActionResult> SalesDetails([FromQuery] SaleDetailsParams Params)
        {
            var partiesFromRepo = await _repo.GetSalesDetails(Params);
            return Ok(partiesFromRepo);
        }
    }
}