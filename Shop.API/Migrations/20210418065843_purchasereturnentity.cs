using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Shop.API.Migrations
{
    public partial class purchasereturnentity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
           

            migrationBuilder.CreateTable(
                name: "PurchaseReturns",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BranchId = table.Column<int>(nullable: false),
                    PartyId = table.Column<int>(nullable: false),
                    UserId = table.Column<int>(nullable: false),
                    Created = table.Column<DateTime>(nullable: false),
                    InvoiceNo = table.Column<string>(nullable: true),
                    PurchaseReturnDate = table.Column<DateTime>(nullable: false),
                    TaxGroupId = table.Column<int>(nullable: false),
                    Status = table.Column<string>(nullable: true),
                    IsPaid = table.Column<bool>(nullable: false),
                    GrossAmount = table.Column<decimal>(nullable: false),
                    DiscountAmount = table.Column<decimal>(nullable: false),
                    TaxAmount = table.Column<decimal>(nullable: false),
                    Other = table.Column<decimal>(nullable: false),
                    RoundOff = table.Column<decimal>(nullable: false),
                    NetAmount = table.Column<decimal>(nullable: false),
                    Description = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PurchaseReturns", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PurchaseReturns_Branches_BranchId",
                        column: x => x.BranchId,
                        principalTable: "Branches",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PurchaseReturns_Parties_PartyId",
                        column: x => x.PartyId,
                        principalTable: "Parties",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_PurchaseReturns_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

           
            migrationBuilder.CreateTable(
                name: "PurchaseReturnItems",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PurchaseOrderId = table.Column<int>(nullable: false),
                    BranchId = table.Column<int>(nullable: false),
                    TaxId = table.Column<int>(nullable: false),
                    ProductId = table.Column<int>(nullable: false),
                    Created = table.Column<DateTime>(nullable: false),
                    BatchNo = table.Column<string>(nullable: true),
                    ExpireDate = table.Column<DateTime>(nullable: false),
                    Quantity = table.Column<int>(nullable: false),
                    SchQuantity = table.Column<int>(nullable: false),
                    SaleQuantity = table.Column<int>(nullable: false),
                    MRP = table.Column<decimal>(nullable: false),
                    Rate = table.Column<decimal>(nullable: false),
                    SaleRate = table.Column<decimal>(nullable: false),
                    Discount = table.Column<decimal>(nullable: false),
                    OtherDiscount = table.Column<decimal>(nullable: false),
                    Amount = table.Column<decimal>(nullable: false),
                    PurchaseReturnId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PurchaseReturnItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PurchaseReturnItems_Branches_BranchId",
                        column: x => x.BranchId,
                        principalTable: "Branches",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_PurchaseReturnItems_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_PurchaseReturnItems_PurchaseReturns_PurchaseReturnId",
                        column: x => x.PurchaseReturnId,
                        principalTable: "PurchaseReturns",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PurchaseReturnItems_Taxes_TaxId",
                        column: x => x.TaxId,
                        principalTable: "Taxes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PurchaseReturnItems_BranchId",
                table: "PurchaseReturnItems",
                column: "BranchId");

            migrationBuilder.CreateIndex(
                name: "IX_PurchaseReturnItems_ProductId",
                table: "PurchaseReturnItems",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_PurchaseReturnItems_PurchaseReturnId",
                table: "PurchaseReturnItems",
                column: "PurchaseReturnId");

            migrationBuilder.CreateIndex(
                name: "IX_PurchaseReturnItems_TaxId",
                table: "PurchaseReturnItems",
                column: "TaxId");

            migrationBuilder.CreateIndex(
                name: "IX_PurchaseReturns_BranchId",
                table: "PurchaseReturns",
                column: "BranchId");

            migrationBuilder.CreateIndex(
                name: "IX_PurchaseReturns_PartyId",
                table: "PurchaseReturns",
                column: "PartyId");

            migrationBuilder.CreateIndex(
                name: "IX_PurchaseReturns_UserId",
                table: "PurchaseReturns",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PurchaseReturnItems");

         
            migrationBuilder.DropTable(
                name: "PurchaseReturns");

          
        }
    }
}
