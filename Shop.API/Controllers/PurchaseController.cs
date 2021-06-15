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
using Shop.API.Models;
using Shop.API.Interfaces;

namespace Shop.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PurchaseController : ControllerBase
    {
        private readonly IShopRepository _repo;
        private readonly IMapper _mapper;
        private readonly ILedgerRepository _ledgerRepo;
        private readonly ILedgerService _ledgerService;
        public PurchaseController(IShopRepository repo, ILedgerService ledgerService, IMapper mapper, ILedgerRepository ledgerRepo)
        {
            _ledgerService = ledgerService;
            _ledgerRepo = ledgerRepo;
            _mapper = mapper;
            _repo = repo;
        }


        [HttpGet("AllPurchase/{branchId}")]
        public async Task<IActionResult> GetAllPurchase(int branchId)
        {
            var partiesFromRepo = await _repo.GetPurchaseListFromSP(branchId);
            return Ok(partiesFromRepo);
        }

        [HttpGet("PurchaseReturn/{branchId}")]
        public async Task<IActionResult> GetAllPurchaseReturn(int branchId)
        {
            var partiesFromRepo = await _repo.GetPurchaseReturnListFromSP(branchId);
            return Ok(partiesFromRepo);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetPurchase(int id)
        {
            var messageFromRepo = await _repo.GetPurchase(id);

            if (messageFromRepo == null)
                return NotFound();

            return Ok(messageFromRepo);
        }

        [HttpGet("GetPurchaseOrder/{id}")]
        public async Task<IActionResult> GetPurchaseOrder(int id)
        {
            var messageFromRepo = await _repo.GetPurchaseOrderModelFromSP(id);

            if (messageFromRepo == null)
                return NotFound();

            return Ok(messageFromRepo);
        }

        [HttpGet("GetPurchaseItems/{purchaseId}")]
        public async Task<IActionResult> GetPurchaseItems(int purchaseId)
        {
            var messageFromRepo = await _repo.GetPurchaseOrderItemsByPurchaseId(purchaseId);

            if (messageFromRepo == null)
                return NotFound();

            return Ok(messageFromRepo);
        }

        [HttpGet("GetPurchaseItemsFromSP/{purchaseId}")]
        public async Task<IActionResult> GetPurchaseItemsFromSP(int purchaseId)
        {
            var messageFromRepo = await _repo.GetPurchaseOrderItemsModelsFromSP(purchaseId);

            if (messageFromRepo == null)
                return NotFound();

            return Ok(messageFromRepo);
        }


        [HttpPost("{userId}")]
        public async Task<IActionResult> CreatePurchase(int userId, PurchaseForCreateDto purchaseForCreateDto)
        {

            // if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            //     return Unauthorized();
            // var sourceUserId = User.GetUserId();
            purchaseForCreateDto.Created = DateTime.Now;
            purchaseForCreateDto.UserId = userId;

            var purchaseOrder = _mapper.Map<PurchaseOrder>(purchaseForCreateDto);
            purchaseOrder.Created = DateTime.Now;
            _repo.Add(purchaseOrder);

            // var messageToReturn = _mapper.Map<PurchaseForCreateDto>(purchaseOrder);

            if (await _repo.SaveAll())
            {
                var ledgerModel = new LedgerDto
                {
                    BranchId = purchaseOrder.BranchId,
                    UserId = userId,
                    PartyId = purchaseOrder.PartyId,
                    OrderId = purchaseOrder.Id,
                    OrderType = "Purchase",
                    OldNetAmount = 0,
                    NetAmount = purchaseOrder.NetAmount

                };
                var result = await _ledgerService.CreatePurchaseLedger(userId, "Purchase", ledgerModel);
                if (result == true)
                    return Ok();

                return BadRequest("Ledger not added. please add manually or contact backoffice");
            }
            return BadRequest("Something wrong");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePurchase(int id, PurchaseModelForUpdateDto model)
        {
            // var userId = id;
            // if (id == 0)
            //     return Unauthorized();

            var purchaseFromRepo = await _repo.GetPurchase(id);
            var purchaseOldAmount = purchaseFromRepo.NetAmount;

            if (purchaseFromRepo == null)
                return BadRequest("Something wrong");

            model.PurchaseForUpdateDto.UserId = purchaseFromRepo.UserId;
            _mapper.Map(model.PurchaseForUpdateDto, purchaseFromRepo);

            // Delete children
            // foreach (var existingChild in purchaseFromRepo.PurchaseOrderItems)
            // {
            //     var itemFromRepo = await _repo.GetPurchaseOrderItem(id);
            //     _repo.Delete(itemFromRepo);
            // }

            // Update and Insert children
            foreach (var childModel in model.PurchaseOrderItems)
            {
                var existingChild = purchaseFromRepo.PurchaseOrderItems
                    .Where(c => c.Id == childModel.Id)
                    .SingleOrDefault();
                childModel.PurchaseOrderId = id;
                if (existingChild != null)
                    // Update child
                    _mapper.Map(childModel, existingChild);
                else
                {
                    // Insert child
                    var purchaseOrderItem = _mapper.Map<PurchaseOrderItem>(childModel);
                    purchaseOrderItem.Created = DateTime.Now;
                    _repo.Add(purchaseOrderItem);
                }
            }


            if (await _repo.SaveAll())
            {
                if (model.PurchaseForUpdateDto.NetAmount < purchaseOldAmount)
                {
                    var partyLedger = await _ledgerRepo.GetLedgerBalanceByParty(model.PurchaseForUpdateDto.PartyId, "Purchase");
                    decimal closingAmount = 0;
                    if (partyLedger != null)
                        closingAmount = partyLedger.Closing;

                    var ledger = new Ledger
                    {
                        BranchId = model.PurchaseForUpdateDto.BranchId,
                        UserId = purchaseFromRepo.UserId,
                        PartyId = model.PurchaseForUpdateDto.PartyId,
                        OrderId = purchaseFromRepo.Id,
                        OrderType = "Purchase",
                        Created = DateTime.Now,
                        Debit = purchaseOldAmount - model.PurchaseForUpdateDto.NetAmount,
                        Credit = 0,
                        Closing = partyLedger.Closing,
                        Type = "Purchase",
                        Remark = "Purchase Invoice updated" + purchaseFromRepo.InvoiceNo
                    };

                    _repo.Add(ledger);
                    if (await _repo.SaveAll())
                        return Ok(purchaseFromRepo.Id);
                }

                if (model.PurchaseForUpdateDto.NetAmount > purchaseOldAmount)
                {
                    var partyLedger = await _ledgerRepo.GetLedgerBalanceByParty(model.PurchaseForUpdateDto.PartyId, "Purchase");
                    decimal closingAmount = 0;
                    if (partyLedger != null)
                        closingAmount = partyLedger.Closing;

                    var ledger = new Ledger
                    {
                        BranchId = model.PurchaseForUpdateDto.BranchId,
                        UserId = purchaseFromRepo.UserId,
                        PartyId = model.PurchaseForUpdateDto.PartyId,
                        OrderId = purchaseFromRepo.Id,
                        OrderType = "Purchase",
                        Created = DateTime.Now,
                        Debit = purchaseFromRepo.NetAmount - model.PurchaseForUpdateDto.NetAmount,
                        Credit = 0,
                        Closing = partyLedger.Closing,
                        Type = "Purchase",
                        Remark = "Purchase Invoice updated" + purchaseFromRepo.InvoiceNo
                    };

                    _repo.Add(ledger);
                    if (await _repo.SaveAll())
                        return Ok(purchaseFromRepo.Id);
                }
                return Ok(purchaseFromRepo.Id);
            }

            return BadRequest("Something wrong");
        }


        [HttpPost("return/{userId}")]
        public async Task<IActionResult> CreatePurchaseReturn(int userId, PurchaseReturnForCreateDto purchaseForCreateDto)
        {

            // if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            //     return Unauthorized();
              if (userId == 0)
                return Unauthorized();

            purchaseForCreateDto.Created = DateTime.Now;
            purchaseForCreateDto.UserId = userId;

            var purchaseOrder = _mapper.Map<PurchaseReturn>(purchaseForCreateDto);
            purchaseOrder.Created = DateTime.Now;
            _repo.Add(purchaseOrder);

            if (await _repo.SaveAll())
            {
                var ledgerModel = new LedgerDto
                {
                    BranchId = purchaseOrder.BranchId,
                    UserId = userId,
                    PartyId = purchaseOrder.PartyId,
                    OrderId = purchaseOrder.Id,
                    OrderType = "Purchase",
                    OldNetAmount = 0,
                    NetAmount = purchaseOrder.NetAmount

                };
                var result = await _ledgerService.CreatePurchaseReturnLedger(userId, "PurchaseReturn", ledgerModel);
                if (result == true)
                    return Ok();

                return BadRequest("Ledger not added. please add manually or contact backoffice");
            }

            return BadRequest("Something wrong");
        }


        //reporting
        [HttpGet("ItemwisePurchase")]
        public async Task<IActionResult> GetPartyLedger([FromQuery] ItemWiseParams Params)
        {
            var partiesFromRepo = await _repo.GetItemWisePurchaseViewModels(Params);
            return Ok(partiesFromRepo);
        }

    }
}