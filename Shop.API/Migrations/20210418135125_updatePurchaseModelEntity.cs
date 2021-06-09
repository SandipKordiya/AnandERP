using Microsoft.EntityFrameworkCore.Migrations;

namespace Shop.API.Migrations
{
    public partial class updatePurchaseModelEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PartyId",
                table: "PurchaseOrderItems",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_PurchaseOrderItems_PartyId",
                table: "PurchaseOrderItems",
                column: "PartyId");

            migrationBuilder.AddForeignKey(
                name: "FK_PurchaseOrderItems_Parties_PartyId",
                table: "PurchaseOrderItems",
                column: "PartyId",
                principalTable: "Parties",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PurchaseOrderItems_Parties_PartyId",
                table: "PurchaseOrderItems");

            migrationBuilder.DropIndex(
                name: "IX_PurchaseOrderItems_PartyId",
                table: "PurchaseOrderItems");

            migrationBuilder.DropColumn(
                name: "PartyId",
                table: "PurchaseOrderItems");
        }
    }
}
