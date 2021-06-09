using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Shop.API.Migrations
{
    public partial class StockReturnEntities : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "StockReturns",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BranchId = table.Column<int>(nullable: false),
                    UserId = table.Column<int>(nullable: false),
                    Created = table.Column<DateTime>(nullable: false),
                    InvoiceNo = table.Column<string>(nullable: true),
                    PurchaseDate = table.Column<DateTime>(nullable: false),
                    Status = table.Column<string>(nullable: true),
                    IsPaid = table.Column<bool>(nullable: false),
                    GrossAmount = table.Column<decimal>(nullable: false),
                    DiscountAmount = table.Column<decimal>(nullable: false),
                    TaxAmount = table.Column<decimal>(nullable: false),
                    Other = table.Column<decimal>(nullable: false),
                    RoundOff = table.Column<decimal>(nullable: false),
                    NetAmount = table.Column<decimal>(nullable: false),
                    Description = table.Column<string>(nullable: true),
                    IsForStock = table.Column<bool>(nullable: false),
                    FromBranchId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StockReturns", x => x.Id);
                    table.ForeignKey(
                        name: "FK_StockReturns_Branches_BranchId",
                        column: x => x.BranchId,
                        principalTable: "Branches",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_StockReturns_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "StockReturnItems",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StockReturnId = table.Column<int>(nullable: false),
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
                    MRPDiscount = table.Column<decimal>(nullable: false),
                    Rate = table.Column<decimal>(nullable: false),
                    SaleRate = table.Column<decimal>(nullable: false),
                    Discount = table.Column<decimal>(nullable: false),
                    OtherDiscount = table.Column<decimal>(nullable: false),
                    Amount = table.Column<decimal>(nullable: false),
                    Type = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StockReturnItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_StockReturnItems_Branches_BranchId",
                        column: x => x.BranchId,
                        principalTable: "Branches",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_StockReturnItems_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_StockReturnItems_StockReturns_StockReturnId",
                        column: x => x.StockReturnId,
                        principalTable: "StockReturns",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_StockReturnItems_Taxes_TaxId",
                        column: x => x.TaxId,
                        principalTable: "Taxes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateIndex(
                name: "IX_StockReturnItems_BranchId",
                table: "StockReturnItems",
                column: "BranchId");

            migrationBuilder.CreateIndex(
                name: "IX_StockReturnItems_ProductId",
                table: "StockReturnItems",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_StockReturnItems_StockReturnId",
                table: "StockReturnItems",
                column: "StockReturnId");

            migrationBuilder.CreateIndex(
                name: "IX_StockReturnItems_TaxId",
                table: "StockReturnItems",
                column: "TaxId");

            migrationBuilder.CreateIndex(
                name: "IX_StockReturns_BranchId",
                table: "StockReturns",
                column: "BranchId");

            migrationBuilder.CreateIndex(
                name: "IX_StockReturns_UserId",
                table: "StockReturns",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "StockReturnItems");

            migrationBuilder.DropTable(
                name: "StockReturns");
        }
    }
}
