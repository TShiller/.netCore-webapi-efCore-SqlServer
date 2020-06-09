using SHI_NOTE.Commands;
using SHI_NOTE.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace SHI_NOTE.SHI_DAL
{
    public class QueryDAL
    {
        /// <summary>
        /// 通过Lambda作为参数传递，返回查询出的模型数据
        /// </summary>
        /// <typeparam name="T">实体模型</typeparam>
        /// <param name="wherestr">Lambda作为参数</param>
        /// <returns></returns>
        public static T GetModelTowhereExp<T>(Expression<Func<T, bool>> wherestr) where T:class,new()
        {
            using (MyDbContext db=new MyDbContext())
            {
              return  db.Set<T>().Where(wherestr).FirstOrDefault();
            }
        }

        /// <summary>
        /// 通过sql语句作为参数传递，返回查询出的模型数据
        /// </summary>
        /// <typeparam name="T">实体模型</typeparam>
        /// <param name="sql">sql语句</param>
        /// <returns></returns>
        public static T GetModelTowhereSql<T>(string sql) where T : class, new()
        {
            using (MyDbContext db = new MyDbContext())
            {
                return db.Database.SqlQuery<T>(sql).FirstOrDefault();
            }
        }


        /// <summary>
        /// 通过Lambda作为参数传递，返回集合
        /// </summary>
        /// <typeparam name="T">实体模型</typeparam>
        /// <param name="wherestr">Lambda作为参数</param>
        /// <returns></returns>
        public static  List<T> GetListTowhereExp<T>(Expression<Func<T, bool>> wherestr) where T : class, new()
        {
            using (MyDbContext db = new MyDbContext())
            {
                return db.Set<T>().Where(wherestr).ToList();
            }
        }

        /// <summary>
        /// 通过sql语句作为参数传递，返回集合
        /// </summary>
        /// <typeparam name="T">实体模型</typeparam>
        /// <param name="wherestr">sql 语句</param>
        /// <returns></returns>
        public static List<T> GetListTowhereSql<T>(string sql) where T : class, new()
        {
            using (MyDbContext db = new MyDbContext())
            {
                return db.Database.SqlQuery<T>(sql).ToList();
            }
        }

    }
}
