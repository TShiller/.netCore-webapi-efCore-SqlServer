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
        /// 用户登录
        /// </summary>
        /// <param name="jData">动态</param>
        /// <returns></returns>
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
                DateTime gettime = DateTime.Now;
                users.UserToken = MD5Encryption.Md5_32(juser_email.ToString() + gettime.ToString());
                users.Token_endtiem = gettime;
                //更新到数据库，登录成功后每次访问数据都带上token
                UpdateDAL.update_model<SHI_Users>(users);
                return  users.UserToken;
                        
            }
            // return JsonConvert.SerializeObject("-1");
            return "-1";
        }

        /// <summary>
        /// 用户注册
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        [HttpPost("UserSignUp")]
        public string UserSignUp(object user) {
            JObject jdata = JObject.Parse(user.ToString());
            string uemail = jdata.SelectToken("UserEmail").ToString();//邮箱
            string upwd = jdata.SelectToken("UserPwd").ToString();//密码
            string uname = jdata.SelectToken("UserName").ToString();//昵称
            //获取默认账号和用户名
            int account = QueryDAL.GetModelTowhereSql<SHI_Users>
                ("select top 1 * from SHI_Users order by Key_No desc").Key_No;
            string uaccname = "shi00"+(account + 1); 
            SHI_Users users = new SHI_Users();
            users.UserEmail = uemail;
            users.UserPwd = upwd;
            users.UserName = uname;
            users.Account = uaccname;
            users.UserSex = 2;//默认为私密
            //创建token：根据用户名+时间通过MD5加密后保证唯一性
            DateTime gettime = DateTime.Now;
            users.UserToken = MD5Encryption.Md5_32(uname.ToString() + gettime.ToString());
            users.Token_endtiem = gettime;
            if (InsertDAL.InsertModel<SHI_Users>(users))
            {
                return users.UserToken;
            }
            return "-1";
        }

        /// <summary>
        /// 判断邮箱或昵称是否存在
        /// </summary>
        /// <param name="users"></param>
        /// <returns></returns>
        [HttpPost("existemailandname")]
        public string existemailandname(object users) {
            JObject jdata = JObject.Parse(users.ToString());
            string email = jdata.SelectToken("UserEmail").ToString();
            string uname = jdata.SelectToken("UserName").ToString();
            //查询是否存在
            SHI_Users exuser = QueryDAL.GetModelTowhereExp<SHI_Users>(u => u.UserEmail == email || u.UserName == uname);
            if (exuser!=null)
            {
                if (exuser.UserName==uname)
                {
                    return "昵称已被使用，请您重新输入！";
                }
                if (exuser.UserEmail==email)
                {
                    return "邮箱已被使用，请您重新输入或登录！";
                }
            }
            return "0";
        }
    }
}
