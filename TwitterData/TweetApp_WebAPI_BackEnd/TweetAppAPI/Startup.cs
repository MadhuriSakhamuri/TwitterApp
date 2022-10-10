using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using TweetAppAPI.DbContext;
using TweetAppAPI.Models;
using TweetAppAPI.Repository;
using TweetAppAPI.Services;

namespace TweetAppAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton<IMongoClient, MongoClient>(s =>
             {
                 var uri = s.GetRequiredService<IConfiguration>()["MongoUri"];
                 return new MongoClient(uri);
             });
            services.Configure<SMTPConfig>(Configuration.GetSection("SMTPConfig"));
            services.AddTransient<IMongoDbContext, MongoDbContext>();
            services.AddTransient<IUserRepository, UserRepository>();
            services.AddTransient<ITweetRepository, TweetRepository>();
            services.AddTransient<IEmailService, EmailService>();
            services.AddControllers();
            // Register the Swagger generator, defining 1 or more Swagger documents
            services.AddSwaggerGen();
            services.AddCors();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            
            app.UseRouting();
            app.UseCors(x => x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            // Enable middleware to serve generated Swagger as a JSON endpoint.
            app.UseSwagger();

            app.UseSwaggerUI(c => {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
                c.RoutePrefix = "swagger";
            });
        }
    }
}
