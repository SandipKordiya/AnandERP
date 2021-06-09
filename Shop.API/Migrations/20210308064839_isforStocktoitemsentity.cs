using Microsoft.EntityFrameworkCore.Migrations;

namespace Shop.API.Migrations
{
    public partial class isforStocktoitemsentity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StockTransferItems_StockTransfers_StockTransferId",
                table: "StockTransferItems");

            migrationBuilder.DropIndex(
                name: "IX_StockTransferItems_StockTransferId",
                table: "StockTransferItems");

            migrationBuilder.DropColumn(
                name: "StockTransferId",
                table: "StockTransferItems");

            migrationBuilder.AddColumn<bool>(
                name: "IsForStock",
                table: "StockTransferItems",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "StockTransferId",
                table: "StockTransferItems",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "IsForStock",
                table: "StockReturnItems",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsForStock",
                table: "StockItems",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateIndex(
                name: "IX_StockTransferItems_StockTransferId",
                table: "StockTransferItems",
                column: "StockTransferId");

            migrationBuilder.AddForeignKey(
                name: "FK_StockTransferItems_StockTransfers_StockTransferId",
                table: "StockTransferItems",
                column: "StockTransferId",
                principalTable: "StockTransfers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StockTransferItems_StockTransfers_StockTransferId",
                table: "StockTransferItems");

            migrationBuilder.DropIndex(
                name: "IX_StockTransferItems_StockTransferId",
                table: "StockTransferItems");

            migrationBuilder.DropColumn(
                name: "IsForStock",
                table: "StockTransferItems");

            migrationBuilder.DropColumn(
                name: "StockTransferId",
                table: "StockTransferItems");

            migrationBuilder.DropColumn(
                name: "IsForStock",
                table: "StockReturnItems");

            migrationBuilder.DropColumn(
                name: "IsForStock",
                table: "StockItems");

            migrationBuilder.AddColumn<int>(
                name: "StockTransferId",
                table: "StockTransferItems",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_StockTransferItems_StockTransferId",
                table: "StockTransferItems",
                column: "StockTransferId");

            migrationBuilder.AddForeignKey(
                name: "FK_StockTransferItems_StockTransfers_StockTransferId",
                table: "StockTransferItems",
                column: "StockTransferId",
                principalTable: "StockTransfers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
