using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NMC.Migrations
{
    /// <inheritdoc />
    public partial class moreServerInfo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<Guid>(
                name: "ServerId",
                table: "Servers",
                type: "TEXT",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER")
                .OldAnnotation("Sqlite:Autoincrement", true);

            migrationBuilder.AddColumn<string>(
                name: "EnvironmentVariables",
                table: "Servers",
                type: "TEXT",
                nullable: false,
                defaultValue: "{}");

            migrationBuilder.AddColumn<string>(
                name: "ImageName",
                table: "Servers",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EnvironmentVariables",
                table: "Servers");

            migrationBuilder.DropColumn(
                name: "ImageName",
                table: "Servers");

            migrationBuilder.AlterColumn<int>(
                name: "ServerId",
                table: "Servers",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "TEXT")
                .Annotation("Sqlite:Autoincrement", true);
        }
    }
}
