using Microsoft.EntityFrameworkCore;
using SHI_NOTE.Commands;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SHI_NOTE.SHI_DAL
{
    public class InsertDAL
    {
        /// <summary>
        ///根据模型进行添加
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="model"></param>
        /// <returns></returns>
        public static bool InsertModel<T>(T model) where T : class, new() {
            using (MyDbContexts db = new MyDbContexts())
            {
                db.Entry<T>(model).State = EntityState.Added;
                return db.SaveChanges() > 0;
            }
        }
    }
}
