using Microsoft.EntityFrameworkCore;
using SHI_NOTE.Commands;
using SHI_NOTE.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SHI_NOTE.SHI_DAL
{
    public class UpdateDAL
    {
        /// <summary>
        /// 根据实体模型修改
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="model"></param>
        /// <returns></returns>
        public static bool update_model<T>(T model) where T : class, new() {
            using (MyDbContext db = new MyDbContext())
            {
                db.Entry<T>(model).State = EntityState.Modified;
                return  db.SaveChanges()>0;
            }

        }


    }
}
