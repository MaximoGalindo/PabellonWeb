using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Pabellon.Context.Core.Migrations
{
    /// <inheritdoc />
    public partial class AddPriceColumnInOptions : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "Price",
                table: "Options",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Price",
                table: "Options");
        }
    }
}
