using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Pabellon.Context.Core.Migrations
{
    /// <inheritdoc />
    public partial class RemoveScheduleAndAddSettings : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Schedule");

            migrationBuilder.CreateTable(
                name: "Settings",
                columns: table => new
                {
                    Key = table.Column<string>(type: "TEXT", nullable: false),
                    Value = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Settings", x => x.Key);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Settings");

            migrationBuilder.CreateTable(
                name: "Schedule",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    CloseTime = table.Column<TimeOnly>(type: "TEXT", nullable: true),
                    Day = table.Column<int>(type: "INTEGER", nullable: true),
                    DayOff = table.Column<bool>(type: "INTEGER", nullable: false),
                    OpenTime = table.Column<TimeOnly>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Schedule", x => x.Id);
                });
        }
    }
}
