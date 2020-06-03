using Microsoft.EntityFrameworkCore;
using SHI_NOTE.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SHI_NOTE.Commands
{
    /// <summary>
    /// 自定义上下文对象:MyDbContext
    /// </summary>
    public class MyDbContext:DbContext
    {
        //添加模型集合
        /// <summary>
        /// 用户信息
        /// </summary>
        public DbSet<SHI_Users> SHI_Users { get; set; }

        //重写OnConfiguring方法，配置数据库连接(可选)
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(" Data Source = 127.0.0.1; Initial Catalog = data2; User ID = sa; Password = 123");

        }
    }
}
