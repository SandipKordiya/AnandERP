using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Shop.API.Data;
using Shop.API.Dtos;
using Shop.API.Helpers;
using Shop.API.Models;

namespace Shop.API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly IShopRepository _repo;
        private readonly IMapper _mapper;
        private readonly ILedgerRepository _ledgerRepo;
        private readonly IPaymentRepository _payRepo;
        public PaymentController(IShopRepository repo, IMapper mapper, IPaymentRepository payRepo, ILedgerRepository ledgerRepo)
        {
            _payRepo = payRepo;
            _ledgerRepo = ledgerRepo;
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetPayments()
        {
            var partiesFromRepo = await _payRepo.GetAllPayments();
            return Ok(partiesFromRepo);
        }

        [HttpGet("PaymentList/{branchId}")]
        public async Task<IActionResult> GetAllPaymentFromSP(int branchId)
        {
            var partiesFromRepo = await _payRepo.GetAllPaymentFromSP(branchId);
            return Ok(partiesFromRepo);
        }

        [HttpGet("GetPaymentFilter")]
        public async Task<ActionResult> GetPaymentFilter([FromQuery] PaymentParams paymentParams)
        {
            var users = await _payRepo.GetPaymentByFilter(paymentParams);

            return Ok(users);
        }

        [HttpPost("Purchase/{userId}")]
        public async Task<IActionResult> CreatePurchasePaid(int userId, PayOrderDto paymentForCreateDto)
        {
            // if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            //     return Unauthorized();

            if (userId == 0)
                return Unauthorized();
            try
            {
                foreach (var item in paymentForCreateDto.List)
                {
                    var orderFromRepo = await _repo.GetPurchase(item.Id);
                    if (orderFromRepo == null)
                        return BadRequest("Order not exists");

                    paymentForCreateDto.Model.Created = DateTime.Now;
                    paymentForCreateDto.Model.UserId = userId;

                    var order = _mapper.Map<Payment>(paymentForCreateDto.Model);
                    order.PurchaseOrderId = item.Id;
                    _repo.Add(order);

                    OrderStatusUpdate OrderStatusUpdate = new OrderStatusUpdate();
                    if (orderFromRepo.NetAmount > Convert.ToDecimal(item.Paid))
                    {
                        OrderStatusUpdate.Status = "PartialPaid";
                    }
                    else if (orderFromRepo.NetAmount < item.Paid)
                    {
                        return BadRequest("You are trying to pay higher then bill.");
                    }
                    else
                    {
                        OrderStatusUpdate.Status = "Paid";
                    }

                    _mapper.Map(OrderStatusUpdate, orderFromRepo);

                    await _repo.SaveAll();
                }

                return Ok(true);
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }


        [HttpPost("Sales/{userId}")]
        public async Task<IActionResult> CreateSalesPaid(int userId, PayOrderDto paymentForCreateDto)
        {
            // if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            //     return Unauthorized();

            if (userId == 0)
                return Unauthorized();

            try
            {
                foreach (var item in paymentForCreateDto.List)
                {
                    var orderFromRepo = await _repo.GetSale(item.Id);
                    if (orderFromRepo == null)
                        return BadRequest("Order not exists");


                    paymentForCreateDto.Model.Created = DateTime.Now;
                    paymentForCreateDto.Model.UserId = userId;

                    var order = _mapper.Map<Payment>(paymentForCreateDto.Model);
                    order.SaleId = item.Id;
                    _repo.Add(order);

                    OrderStatusUpdate OrderStatusUpdate = new OrderStatusUpdate();
                    if (orderFromRepo.NetAmount > Convert.ToDecimal(item.Paid))
                    {
                        OrderStatusUpdate.Status = "PartialPaid";
                    }
                    else if (orderFromRepo.NetAmount < item.Paid)
                    {
                        return BadRequest("You are trying to pay higher then bill.");
                    }
                    else
                    {
                        OrderStatusUpdate.Status = "Paid";
                    }

                    _mapper.Map(OrderStatusUpdate, orderFromRepo);

                    if (await _repo.SaveAll())
                    {
                        var ledger = new Ledger();
                        var partyLedger = await _ledgerRepo.GetLedgerBalanceByParty(order.PartyId, "Sale");
                        if (partyLedger == null)
                        {
                            ledger = new Ledger
                            {
                                BranchId = order.BranchId,
                                UserId = userId,
                                PartyId = order.PartyId,
                                OrderId = item.Id,
                                OrderType = "Sale",
                                Created = DateTime.Now,
                                Debit = order.Amount,
                                Credit = 0,
                                Closing = order.Amount,
                                Type = "Sale",
                                Remark = "Payment Received by " + order.PaymentMode
                            };
                        }
                        else
                        {
                            var dd = partyLedger.Closing - order.Amount;
                            ledger = new Ledger
                            {
                                BranchId = order.BranchId,
                                UserId = userId,
                                PartyId = order.PartyId,
                                OrderId = item.Id,
                                OrderType = "Sale",
                                Created = DateTime.Now,
                                Debit = order.Amount,
                                Credit = 0,
                                Closing = partyLedger.Closing - order.Amount,
                                Type = "Sale",
                                Remark = "Payment Received by " + order.PaymentMode
                            };
                        }
                        _repo.Add(ledger);
                        await _repo.SaveAll();
                    }
                }

                return Ok(true);
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}