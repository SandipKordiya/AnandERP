using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Shop.API.Migrations
{
    public partial class updatePartyEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "BranchId",
                table: "Parties",
                nullable: true);

         

            migrationBuilder.CreateIndex(
                name: "IX_Parties_BranchId",
                table: "Parties",
                column: "BranchId");

            migrationBuilder.AddForeignKey(
                name: "FK_Parties_Branches_BranchId",
                table: "Parties",
                column: "BranchId",
                principalTable: "Branches",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Parties_Branches_BranchId",
                table: "Parties");

                     migrationBuilder.DropIndex(
                name: "IX_Parties_BranchId",
                table: "Parties");

            migrationBuilder.DropColumn(
                name: "BranchId",
                table: "Parties");
        }
    }
}
