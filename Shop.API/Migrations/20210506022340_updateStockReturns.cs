using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Shop.API.Migrations
{
    public partial class updateStockReturns : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "FromBranchId",
                table: "StockReturns",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "FromBranchId",
                table: "StockReturnItems",
                nullable: false,
                defaultValue: 0);

        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
          

            migrationBuilder.DropColumn(
                name: "FromBranchId",
                table: "StockReturnItems");

         
            migrationBuilder.AlterColumn<int>(
                name: "FromBranchId",
                table: "StockReturns",
                type: "int",
                nullable: true,
                oldClrType: typeof(int));
        }
    }
}
