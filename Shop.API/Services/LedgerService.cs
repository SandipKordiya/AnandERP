using System.Threading.Tasks;
using Shop.API.Data;
using Shop.API.Dtos;
using System.Security.Claims;
using Shop.API.Interfaces;
using Shop.API.Models;
using System;

namespace Shop.API.Services
{
    public class LedgerService : ILedgerService
    {
        private readonly IShopRepository _repo;
        private readonly ILedgerRepository _ledgerRepo;
        public LedgerService(IShopRepository repo, ILedgerRepository ledgerRepo)
        {
            _ledgerRepo = ledgerRepo;
            _repo = repo;
        }



        public async Task<bool> CreateSaleLedger(int userId, string type, LedgerDto model)
        {
            try
            {
                var ledger = new Ledger();
                var partyLedger = await _ledgerRepo.GetLedgerBalanceByParty(model.PartyId, type);
                decimal credit = 0;
                decimal debit = 0;
                decimal closingAmount = 0;
                if (partyLedger != null)
                {
                    credit = model.NetAmount;
                    debit = 0;
                    closingAmount = partyLedger.Closing + model.NetAmount;
                }

                if (partyLedger == null)
                {
                    credit = model.NetAmount;
                    debit = 0;
                    closingAmount = model.NetAmount;
                }

                ledger = new Ledger
                {
                    BranchId = model.BranchId,
                    UserId = userId,
                    PartyId = model.PartyId,
                    OrderId = model.OrderId,
                    OrderType = "Cr",
                    Created = DateTime.Now,
                    Debit = debit,
                    Credit = credit,
                    Closing = closingAmount,
                    Type = type,
                    Remark = type + " Invoice " + model.InvoiceNo
                };

                _repo.Add(ledger);
                if (await _repo.SaveAll())
                    return true;

                return false;
            }
            catch (System.Exception)
            {
                return false;
            }
        }
        public async Task<bool> CreateSaleReturnLedger(int userId, string type, LedgerDto model)
        {
            try
            {
                var ledger = new Ledger();
                var partyLedger = await _ledgerRepo.GetLedgerBalanceByParty(model.PartyId, type);
                decimal credit = 0;
                decimal debit = 0;
                decimal closingAmount = 0;
                if (partyLedger != null)
                {
                    credit = 0;
                    debit = model.NetAmount;
                    closingAmount = partyLedger.Closing - model.NetAmount;
                }

                if (partyLedger == null)
                {
                    credit = 0;
                    debit = model.NetAmount;
                    closingAmount = model.NetAmount;
                }

                ledger = new Ledger
                {
                    BranchId = model.BranchId,
                    UserId = userId,
                    PartyId = model.PartyId,
                    OrderId = model.OrderId,
                    OrderType = type,
                    Created = DateTime.Now,
                    Debit = debit,
                    Credit = credit,
                    Closing = closingAmount,
                    Type = type,
                    Remark = type + " Sale Return " + model.InvoiceNo
                };

                _repo.Add(ledger);
                if (await _repo.SaveAll())
                    return true;

                return false;
            }
            catch (System.Exception)
            {
                return false;
            }
        }

        public async Task<bool> UpdateLedger(int userId, string type, LedgerDto model)
        {
            try
            {
                var ledger = new Ledger();
                var partyLedger = await _ledgerRepo.GetLedgerBalanceByParty(model.PartyId, type);
                decimal credit = 0;
                decimal debit = 0;
                decimal closingAmount = 0;
                var description = "";
                if (partyLedger != null)
                {
                    if (model.NetAmount > model.OldNetAmount)
                    {
                        debit = 0;
                        credit = model.NetAmount - model.OldNetAmount;
                        closingAmount = partyLedger.Closing + credit;
                        description = "credit note";
                    }

                    if (model.NetAmount < model.OldNetAmount)
                    {
                        credit = 0;
                        debit = model.OldNetAmount - model.NetAmount;
                        closingAmount = partyLedger.Closing - (model.OldNetAmount - model.NetAmount);
                        description = "debit note";
                    }
                }

                ledger = new Ledger
                {
                    BranchId = model.BranchId,
                    UserId = userId,
                    PartyId = model.PartyId,
                    OrderId = model.OrderId,
                    OrderType = type,
                    Created = DateTime.Now,
                    Debit = debit,
                    Credit = credit,
                    Closing = closingAmount,
                    Type = type,
                    Remark = type + "Invoice updated" + model.InvoiceNo,
                    Description = description
                };

                _repo.Add(ledger);
                if (await _repo.SaveAll())
                    return true;

                return false;
            }
            catch (System.Exception)
            {
                return false;
            }
        }

        //purchase
        public async Task<bool> CreatePurchaseLedger(int userId, string type, LedgerDto model)
        {
           try
            {
                var ledger = new Ledger();
                var partyLedger = await _ledgerRepo.GetLedgerBalanceByParty(model.PartyId, type);
                decimal credit = 0;
                decimal debit = 0;
                decimal closingAmount = 0;
                if (partyLedger != null)
                {
                    debit = model.NetAmount;
                    closingAmount = partyLedger.Closing + model.NetAmount;
                }

                if (partyLedger == null)
                {
                    debit = model.NetAmount;
                    closingAmount = model.NetAmount;
                }

                ledger = new Ledger
                {
                    BranchId = model.BranchId,
                    UserId = userId,
                    PartyId = model.PartyId,
                    OrderId = model.OrderId,
                    OrderType = "Dr",
                    Created = DateTime.Now,
                    Debit = debit,
                    Credit = credit,
                    Closing = closingAmount,
                    Type = type,
                    Remark = type + " Invoice " + model.InvoiceNo
                };

                _repo.Add(ledger);
                if (await _repo.SaveAll())
                    return true;

                return false;
            }
            catch (System.Exception)
            {
                return false;
            }
        }

        public async Task<bool> CreatePurchaseReturnLedger(int userId, string type, LedgerDto model)
        {
             try
            {
                var ledger = new Ledger();
                var partyLedger = await _ledgerRepo.GetLedgerBalanceByParty(model.PartyId, type);
                decimal credit = 0;
                decimal debit = 0;
                decimal closingAmount = 0;
                if (partyLedger != null)
                {
                    credit = model.NetAmount;
                    closingAmount = partyLedger.Closing - model.NetAmount;
                }

                if (partyLedger == null)
                {
                    credit = model.NetAmount;
                    closingAmount = -model.NetAmount;
                }

                ledger = new Ledger
                {
                    BranchId = model.BranchId,
                    UserId = userId,
                    PartyId = model.PartyId,
                    OrderId = model.OrderId,
                    OrderType = "Cr",
                    Created = DateTime.Now,
                    Debit = debit,
                    Credit = credit,
                    Closing = closingAmount,
                    Type = type,
                    Remark = type + " Invoice " + model.InvoiceNo
                };

                _repo.Add(ledger);
                if (await _repo.SaveAll())
                    return true;

                return false;
            }
            catch (System.Exception)
            {
                return false;
            }
        }
    }
}