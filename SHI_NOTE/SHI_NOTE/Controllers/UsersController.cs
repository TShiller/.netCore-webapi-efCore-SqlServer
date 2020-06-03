using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace SHI_NOTE.Controllers
{
    //访问接口方式为控制器加方法名
    [Route("[controller]/[action]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        /// <summary>
        /// 登录
        /// </summary>
        /// <param name="users">动态类型接收</param>
        [HttpPost]
        public string UserLogin(dynamic users)
        {
            var uname = users.Name;//大小写与前端参数一致
            var upwd = users.pwd;
            

        }
    }
}
