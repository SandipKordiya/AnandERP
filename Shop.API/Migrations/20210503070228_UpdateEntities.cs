using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Shop.API.Migrations
{
    public partial class UpdateEntities : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsReceivedConfirm",
                table: "StockTransfers",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ReceivedDateTime",
                table: "StockTransfers",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsReceivedConfirm",
                table: "Stocks",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ReceivedDateTime",
                table: "Stocks",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsReceivedConfirm",
                table: "StockReturns",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ReceivedDateTime",
                table: "StockReturns",
                nullable: true);

            migrationBuilder.AlterColumn<bool>(
                name: "IsBlocked",
                table: "Parties",
                nullable: true,
                oldClrType: typeof(bool),
                oldType: "bit");

            migrationBuilder.AlterColumn<bool>(
                name: "IsBillingEnabled",
                table: "Parties",
                nullable: true,
                oldClrType: typeof(bool),
                oldType: "bit");

            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "Branches",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "City",
                table: "Branches",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ContactPerson",
                table: "Branches",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Branches",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Phone",
                table: "Branches",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "State",
                table: "Branches",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ZipCode",
                table: "Branches",
                nullable: true);

        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsReceivedConfirm",
                table: "StockTransfers");

            migrationBuilder.DropColumn(
                name: "ReceivedDateTime",
                table: "StockTransfers");

            migrationBuilder.DropColumn(
                name: "IsReceivedConfirm",
                table: "Stocks");

            migrationBuilder.DropColumn(
                name: "ReceivedDateTime",
                table: "Stocks");

            migrationBuilder.DropColumn(
                name: "IsReceivedConfirm",
                table: "StockReturns");

            migrationBuilder.DropColumn(
                name: "ReceivedDateTime",
                table: "StockReturns");

            migrationBuilder.DropColumn(
                name: "Address",
                table: "Branches");

            migrationBuilder.DropColumn(
                name: "City",
                table: "Branches");

            migrationBuilder.DropColumn(
                name: "ContactPerson",
                table: "Branches");

            migrationBuilder.DropColumn(
                name: "Email",
                table: "Branches");

            migrationBuilder.DropColumn(
                name: "Phone",
                table: "Branches");

            migrationBuilder.DropColumn(
                name: "State",
                table: "Branches");

            migrationBuilder.DropColumn(
                name: "ZipCode",
                table: "Branches");

            migrationBuilder.AlterColumn<bool>(
                name: "IsBlocked",
                table: "Parties",
                type: "bit",
                nullable: true,
                oldClrType: typeof(bool),
                oldNullable: true);

            migrationBuilder.AlterColumn<bool>(
                name: "IsBillingEnabled",
                table: "Parties",
                type: "bit",
                nullable: true,
                oldClrType: typeof(bool),
                oldNullable: true);
        }
    }
}
