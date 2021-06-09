using System;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Shop.API.Data;
using Shop.API.Dtos;
using Shop.API.Extensions;
using Shop.API.Helpers;
using Shop.API.Models;

namespace Shop.API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class StockController : ControllerBase
    {
        private readonly IShopRepository _repo;
        private readonly IMapper _mapper;
        private readonly ILedgerRepository _ledgerRepo;
        public StockController(IShopRepository repo, IMapper mapper, ILedgerRepository ledgerRepo)
        {
            _ledgerRepo = ledgerRepo;
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet("GetAllStocks/{branchId}")]
        public async Task<IActionResult> GetAllStocks(int branchId)
        {
            var partiesFromRepo = await _repo.GetStockListByBranchIdFromSP(branchId);
            return Ok(partiesFromRepo);
        }

        [HttpGet("GetAllStockReturns/{branchId}")]
        public async Task<IActionResult> GetAllStockReturns(int branchId)
        {
            var partiesFromRepo = await _repo.GetStockReturnListByBranchIdFromSP(branchId);
            return Ok(partiesFromRepo);
        }

        [HttpGet("GetAllStockTransfer/{branchId}")]
        public async Task<IActionResult> GetAllStockTransfer(int branchId)
        {
            var partiesFromRepo = await _repo.GetStockTransferListByBranchIdFromSP(branchId);
            return Ok(partiesFromRepo);
        }


        [HttpGet("{id}", Name = "GetStock")]
        public async Task<IActionResult> GetStock(int userId, int id)
        {
            var messageFromRepo = await _repo.GetStock(id);

            if (messageFromRepo == null)
                return NotFound();

            return Ok(messageFromRepo);
        }

        [HttpGet("GetProductFromBranchIdAndProductId/{branchId}/{productId}")]
        public async Task<IActionResult> GetProductFromBranchIdAndProductId(int branchId, int productId)
        {
            var messageFromRepo = await _repo.GetProductStockItemsModelsFromBranchIdAndProductId(branchId, productId);

            if (messageFromRepo == null)
                return NotFound();

            return Ok(messageFromRepo);
        }


        [HttpPost("{userId}")]
        public async Task<IActionResult> Create(int userId, StockForCreateDto purchaseForCreateDto)
        {

            if (userId == 0)
                return Unauthorized();

            purchaseForCreateDto.Created = DateTime.Now;
            purchaseForCreateDto.UserId = userId;

            var purchaseOrder = _mapper.Map<Stock>(purchaseForCreateDto);
            purchaseOrder.Created = DateTime.Now;
            purchaseOrder.IsReceivedConfirm = false;
            _repo.Add(purchaseOrder);

            if (await _repo.SaveAll())
                return Ok();

            return BadRequest("Something wrong");
        }


        [HttpPost("return/{userId}")]
        public async Task<IActionResult> CreateReturn(int userId, StockReturnForCreateDto purchaseForCreateDto)
        {

            // if (userId != User.GetUserId())
            //     return Unauthorized();

            if (userId == 0)
                return Unauthorized();

            purchaseForCreateDto.Created = DateTime.Now;
            purchaseForCreateDto.UserId = userId;

            var purchaseOrder = _mapper.Map<StockReturn>(purchaseForCreateDto);
            purchaseOrder.Created = DateTime.Now;
            purchaseOrder.IsReceivedConfirm = false;

            _repo.Add(purchaseOrder);
            if (await _repo.SaveAll())
                return Ok();
            return BadRequest("Something wrong");
        }


        [HttpPost("transfer/{userId}")]
        public async Task<IActionResult> CreateTransfer(int userId, StockTransferForCreateDto purchaseForCreateDto)
        {

            // if (userId != User.GetUserId())
            //     return Unauthorized();

            if (userId == 0)
                return Unauthorized();

            purchaseForCreateDto.Created = DateTime.Now;
            purchaseForCreateDto.UserId = userId;

            var purchaseOrder = _mapper.Map<StockTransfer>(purchaseForCreateDto);
            purchaseOrder.Created = DateTime.Now;
            purchaseOrder.IsReceivedConfirm = false;

            _repo.Add(purchaseOrder);

            if (await _repo.SaveAll())
                return Ok(purchaseOrder.Id);

            return BadRequest("Something wrong");
        }

        //reporting
        [HttpGet("GetStockLedger")]
        public async Task<IActionResult> GetStockLedger([FromQuery] StockLedgerParams Params)
        {
            var repoData = await _ledgerRepo.GetStockLedgerViewModels(Params);
            return Ok(repoData);
        }

        [HttpGet("GetStockByWareHouse")]
        public async Task<IActionResult> GetStockByWareHouse([FromQuery] StockWarehouseParams Params)
        {
            var repoData = await _ledgerRepo.GetStockWarehouseViewModels(Params);
            return Ok(repoData);
        }

    }
}