using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Shop.API.Migrations
{
    public partial class updatePartyModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.AddColumn<DateTime>(
                name: "BillingActionDate",
                table: "Parties",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "BlockedDate",
                table: "Parties",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsBillingEnabled",
                table: "Parties",
                nullable: true,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsBlocked",
                table: "Parties",
                nullable: true,
                defaultValue: false);

           
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
         
            migrationBuilder.DropColumn(
                name: "BillingActionDate",
                table: "Parties");

            migrationBuilder.DropColumn(
                name: "BlockedDate",
                table: "Parties");

            migrationBuilder.DropColumn(
                name: "IsBillingEnabled",
                table: "Parties");

            migrationBuilder.DropColumn(
                name: "IsBlocked",
                table: "Parties");

        }
    }
}
