using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Pabellon.Context.Core.Migrations
{
    /// <inheritdoc />
    public partial class AddAllowsQuantityInOptions : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Value",
                table: "Settings",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.AddColumn<bool>(
                name: "AllowsQuantity",
                table: "Options",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AllowsQuantity",
                table: "Options");

            migrationBuilder.AlterColumn<string>(
                name: "Value",
                table: "Settings",
                type: "TEXT",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);
        }
    }
}
