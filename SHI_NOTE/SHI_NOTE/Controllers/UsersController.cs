using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SHI_NOTE.Commands;
using SHI_NOTE.Models;
using SHI_NOTE.SHI_DAL;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Microsoft.AspNetCore.Cors;

namespace SHI_NOTE.Controllers
{
    //访问接口方式为控制器加方法名
    [Route("api/Users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        /// <summary>
        /// 用户登录ActionResult<object>
        /// </summary>
        /// <param name="user">动态类型接收</param>
        [HttpPost("UserLogin")]
        public string UserLogin(object jData)
        {
            //参数赋值
            JObject t = JObject.Parse(jData.ToString());
            JToken juser_email = t.SelectToken("UserEmail");//UserEmail与前端保持一致
            JToken juser_pwd = t.SelectToken("UserPwd");

            SHI_Users users = QueryDAL.GetModelTowhereExp<SHI_Users>
                (u => u.UserEmail == juser_email.ToString() && u.UserPwd == juser_pwd.ToString());
            if (users != null)
            {
                //创建token：根据用户名+时间通过MD5加密后保证唯一性
                users.UserToken = MD5Encryption.Md5_32(juser_email.ToString() + DateTime.Now.ToString());
                //更新到数据库，登录成功后每次访问数据都带上token
                UpdateDAL.update_model<SHI_Users>(users);
                return JsonConvert.SerializeObject(new { shi_name = users.UserName, shi_token = users.UserToken});
                }
            return JsonConvert.SerializeObject("-1");
        }

        /// <summary>
        /// 用户注册
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        [HttpPost("UserSignUp")]
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
