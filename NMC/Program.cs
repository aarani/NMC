using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using NMC.Caches;

namespace NMC;

public class Program
{
    public static async Task Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Services.AddMemoryCache();
        builder.Services.AddAuthorization();
        
        builder.Services
            .AddIdentityApiEndpoints<IdentityUser>(options =>
            {
                options.SignIn.RequireConfirmedEmail = false;
            })
            .AddEntityFrameworkStores<NMCDbContext>();

        // Add services to the container.

        builder.Services.AddSingleton<ITemplateCache, TemplateCache>();
        
        builder.Services.AddControllers();
        
        builder.Services.AddCors(options =>
        {
            options.AddPolicy("MyCors",
                policy =>
                {
                    policy
                        .WithOrigins("http://localhost:5173")
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials();
                });
        });

        
        // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
        builder.Services.AddOpenApi();

        builder.Services.AddDbContext<NMCDbContext>(
            options => options.UseSqlite("Data Source=nmc.db;"));
        
        var app = builder.Build();

        using (var scope = app.Services.CreateScope())
        {
            var services = scope.ServiceProvider;
            var dbContext = services.GetRequiredService<NMCDbContext>();
            var strategy = dbContext.Database.CreateExecutionStrategy();
            await strategy.ExecuteAsync(async () =>
            {
                await dbContext.Database.MigrateAsync();
            });

            var userManager = services.GetRequiredService<UserManager<IdentityUser>>();
            var user = await userManager.FindByEmailAsync("root@root.com");
            if (user is null)
            {
                user = new IdentityUser();
                await userManager.SetUserNameAsync(user, "root@root.com");
                await userManager.SetEmailAsync(user, "root@root.com");
                var result = await userManager.CreateAsync(user, builder.Configuration["InitialPassword"] ?? throw new InvalidOperationException());
                
            }
        }

        await app
            .Services
            .GetRequiredService<ITemplateCache>()
            .Refresh();
        
        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.MapOpenApi().RequireAuthorization();
        }

        app.UseCors("MyCors");

        app.UseAuthorization();
        
        app.MapControllers();

        app.Run();
    }
}