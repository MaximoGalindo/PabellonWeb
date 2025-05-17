using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Pabellon.Context.Core.Migrations
{
    /// <inheritdoc />
    public partial class AddExpirationDateToCatalog : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "ExpirationDate",
                table: "Catalog",
                type: "TEXT",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ExpirationDate",
                table: "Catalog");
        }
    }
}
