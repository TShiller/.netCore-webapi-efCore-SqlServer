using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SHI_NOTE.Commands;
using SHI_NOTE.Models;
using SHI_NOTE.SHI_DAL;

namespace SHI_NOTE.Controllers
{
    //访问接口方式为控制器加方法名
    [Route("[controller]/[action]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        [HttpGet]
        public string ss() {
            return "ssss";
        }
        /// <summary>
        /// 用户登录
        /// </summary>
        /// <param name="user">动态类型接收</param>
        [HttpPost]
        public ActionResult<object> UserLogin(dynamic user)
        {
            string uname = user.name.ToString();//大小写与前端参数一致
            string upwd = user.pwd.ToString();
            SHI_Users users = QueryDAL.GetModelTowhereExp<SHI_Users>
                (u => u.UserEmail == uname && u.UserPwd == upwd);
            if (users!=null)
            {
                //创建token：根据用户名+时间通过MD5加密后保证唯一性
                users.UserToken = MD5Encryption.Md5_32(uname+DateTime.Now.ToString());
                //更新到数据库，登录成功后每次访问数据都带上token
                UpdateDAL.update_model<SHI_Users>(users);
                return users;
            }
            return "-1";
        }

        /// <summary>
        /// 用户注册
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        [HttpPost]
        public string UserSignUp(dynamic user) {
            //大小写与前端参数一致
            string uemail = user.email.ToString();//邮箱
            string upwd = user.pwd.ToString();//密码
            //获取默认账号和用户名
            string uaccname = "shi00"+QueryDAL.GetModelTowhereSql<SHI_Users>
                ("select top 1 * from SHI_Users order by Key_No desc").Key_No+1; 
            SHI_Users users = new SHI_Users();
            users.UserEmail = uemail;
            users.UserPwd = upwd;
            users.UserName = uaccname;
            users.Account = uaccname;
            users.UserSex = 2;//默认为私密
            if (InsertDAL.InsertModel<SHI_Users>(users))
            {
                return "Registration Successful";
            }
            return "Registration Failed";
        }
    }
}
