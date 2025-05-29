using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Pabellon.Context.Core.Migrations
{
    /// <inheritdoc />
    public partial class AddingDisabledPropIntoProducts : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Disabled",
                table: "Product",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Disabled",
                table: "Product");
        }
    }
}
