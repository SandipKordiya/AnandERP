using Microsoft.EntityFrameworkCore.Migrations;

namespace Shop.API.Migrations
{
    public partial class updatepurchasereturn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PurchaseReturnItems_PurchaseReturns_PurchaseReturnId",
                table: "PurchaseReturnItems");

            migrationBuilder.DropColumn(
                name: "PurchaseOrderId",
                table: "PurchaseReturnItems");


            migrationBuilder.AlterColumn<int>(
                name: "PurchaseReturnId",
                table: "PurchaseReturnItems",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PartyId",
                table: "PurchaseReturnItems",
                nullable: false,
                defaultValue: 0);
         

            migrationBuilder.CreateIndex(
                name: "IX_PurchaseReturnItems_PartyId",
                table: "PurchaseReturnItems",
                column: "PartyId");

            migrationBuilder.AddForeignKey(
                name: "FK_PurchaseReturnItems_Parties_PartyId",
                table: "PurchaseReturnItems",
                column: "PartyId",
                principalTable: "Parties",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PurchaseReturnItems_PurchaseReturns_PurchaseReturnId",
                table: "PurchaseReturnItems",
                column: "PurchaseReturnId",
                principalTable: "PurchaseReturns",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PurchaseReturnItems_Parties_PartyId",
                table: "PurchaseReturnItems");

            migrationBuilder.DropForeignKey(
                name: "FK_PurchaseReturnItems_PurchaseReturns_PurchaseReturnId",
                table: "PurchaseReturnItems");

            migrationBuilder.DropIndex(
                name: "IX_PurchaseReturnItems_PartyId",
                table: "PurchaseReturnItems");

            migrationBuilder.DropColumn(
                name: "PartyId",
                table: "PurchaseReturnItems");


            migrationBuilder.AlterColumn<int>(
                name: "PurchaseReturnId",
                table: "PurchaseReturnItems",
                type: "int",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddColumn<int>(
                name: "PurchaseOrderId",
                table: "PurchaseReturnItems",
                type: "int",
                nullable: false,
                defaultValue: 0);


            migrationBuilder.AddForeignKey(
                name: "FK_PurchaseReturnItems_PurchaseReturns_PurchaseReturnId",
                table: "PurchaseReturnItems",
                column: "PurchaseReturnId",
                principalTable: "PurchaseReturns",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
