using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Shop.API.Migrations
{
    public partial class updatestockentity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "FromBranchId",
                table: "StockTransferItems",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "FromBranchId",
                table: "StockReturns",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "FromBranchId",
                table: "StockItems",
                nullable: true);

           

            migrationBuilder.CreateIndex(
                name: "IX_StockItems_FromBranchId",
                table: "StockItems",
                column: "FromBranchId");

            migrationBuilder.AddForeignKey(
                name: "FK_StockItems_Branches_FromBranchId",
                table: "StockItems",
                column: "FromBranchId",
                principalTable: "Branches",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StockItems_Branches_FromBranchId",
                table: "StockItems");

    

            migrationBuilder.DropIndex(
                name: "IX_StockItems_FromBranchId",
                table: "StockItems");

            migrationBuilder.DropColumn(
                name: "FromBranchId",
                table: "StockTransferItems");

            migrationBuilder.DropColumn(
                name: "FromBranchId",
                table: "StockItems");

            migrationBuilder.AlterColumn<int>(
                name: "FromBranchId",
                table: "StockReturns",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);
        }
    }
}
