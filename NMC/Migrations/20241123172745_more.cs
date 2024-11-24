using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NMC.Migrations
{
    /// <inheritdoc />
    public partial class more : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImageTag",
                table: "Servers",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Volumes",
                table: "Servers",
                type: "TEXT",
                nullable: false,
                defaultValue: "{}");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageTag",
                table: "Servers");

            migrationBuilder.DropColumn(
                name: "Volumes",
                table: "Servers");
        }
    }
}
