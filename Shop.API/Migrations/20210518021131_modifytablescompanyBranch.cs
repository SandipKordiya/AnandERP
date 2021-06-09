using Microsoft.EntityFrameworkCore.Migrations;

namespace Shop.API.Migrations
{
    public partial class modifytablescompanyBranch : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CityId",
                table: "Companies",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "StateId",
                table: "Companies",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CityId",
                table: "Branches",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "StateId",
                table: "Branches",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Companies_CityId",
                table: "Companies",
                column: "CityId");

            migrationBuilder.CreateIndex(
                name: "IX_Companies_StateId",
                table: "Companies",
                column: "StateId");

            migrationBuilder.CreateIndex(
                name: "IX_Branches_CityId",
                table: "Branches",
                column: "CityId");

            migrationBuilder.CreateIndex(
                name: "IX_Branches_StateId",
                table: "Branches",
                column: "StateId");

            migrationBuilder.AddForeignKey(
                name: "FK_Branches_Cities_CityId",
                table: "Branches",
                column: "CityId",
                principalTable: "Cities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Branches_States_StateId",
                table: "Branches",
                column: "StateId",
                principalTable: "States",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Companies_Cities_CityId",
                table: "Companies",
                column: "CityId",
                principalTable: "Cities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Companies_States_StateId",
                table: "Companies",
                column: "StateId",
                principalTable: "States",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Branches_Cities_CityId",
                table: "Branches");

            migrationBuilder.DropForeignKey(
                name: "FK_Branches_States_StateId",
                table: "Branches");

            migrationBuilder.DropForeignKey(
                name: "FK_Companies_Cities_CityId",
                table: "Companies");

            migrationBuilder.DropForeignKey(
                name: "FK_Companies_States_StateId",
                table: "Companies");

            migrationBuilder.DropIndex(
                name: "IX_Companies_CityId",
                table: "Companies");

            migrationBuilder.DropIndex(
                name: "IX_Companies_StateId",
                table: "Companies");

            migrationBuilder.DropIndex(
                name: "IX_Branches_CityId",
                table: "Branches");

            migrationBuilder.DropIndex(
                name: "IX_Branches_StateId",
                table: "Branches");

            migrationBuilder.DropColumn(
                name: "CityId",
                table: "Companies");

            migrationBuilder.DropColumn(
                name: "StateId",
                table: "Companies");

            migrationBuilder.DropColumn(
                name: "CityId",
                table: "Branches");

            migrationBuilder.DropColumn(
                name: "StateId",
                table: "Branches");
        }
    }
}
