using Microsoft.EntityFrameworkCore.Migrations;

namespace Shop.API.Migrations
{
    public partial class updatepaymententity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SaleReturnId",
                table: "Payments",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "StockId",
                table: "Payments",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "StockReturnId",
                table: "Payments",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "StockTransferId",
                table: "Payments",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Payments_SaleReturnId",
                table: "Payments",
                column: "SaleReturnId");

            migrationBuilder.CreateIndex(
                name: "IX_Payments_StockId",
                table: "Payments",
                column: "StockId");

            migrationBuilder.CreateIndex(
                name: "IX_Payments_StockReturnId",
                table: "Payments",
                column: "StockReturnId");

            migrationBuilder.CreateIndex(
                name: "IX_Payments_StockTransferId",
                table: "Payments",
                column: "StockTransferId");

            migrationBuilder.AddForeignKey(
                name: "FK_Payments_SaleReturns_SaleReturnId",
                table: "Payments",
                column: "SaleReturnId",
                principalTable: "SaleReturns",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_Payments_Stocks_StockId",
                table: "Payments",
                column: "StockId",
                principalTable: "Stocks",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_Payments_StockReturns_StockReturnId",
                table: "Payments",
                column: "StockReturnId",
                principalTable: "StockReturns",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Payments_StockTransfers_StockTransferId",
                table: "Payments",
                column: "StockTransferId",
                principalTable: "StockTransfers",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Payments_SaleReturns_SaleReturnId",
                table: "Payments");

            migrationBuilder.DropForeignKey(
                name: "FK_Payments_Stocks_StockId",
                table: "Payments");

            migrationBuilder.DropForeignKey(
                name: "FK_Payments_StockReturns_StockReturnId",
                table: "Payments");

            migrationBuilder.DropForeignKey(
                name: "FK_Payments_StockTransfers_StockTransferId",
                table: "Payments");

            migrationBuilder.DropIndex(
                name: "IX_Payments_SaleReturnId",
                table: "Payments");

            migrationBuilder.DropIndex(
                name: "IX_Payments_StockId",
                table: "Payments");

            migrationBuilder.DropIndex(
                name: "IX_Payments_StockReturnId",
                table: "Payments");

            migrationBuilder.DropIndex(
                name: "IX_Payments_StockTransferId",
                table: "Payments");

            migrationBuilder.DropColumn(
                name: "SaleReturnId",
                table: "Payments");

            migrationBuilder.DropColumn(
                name: "StockId",
                table: "Payments");

            migrationBuilder.DropColumn(
                name: "StockReturnId",
                table: "Payments");

            migrationBuilder.DropColumn(
                name: "StockTransferId",
                table: "Payments");
        }
    }
}
