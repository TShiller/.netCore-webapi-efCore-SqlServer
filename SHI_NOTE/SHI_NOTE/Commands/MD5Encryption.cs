using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace SHI_NOTE.Commands
{
    public class MD5Encryption
    {
        /// <summary>  
        /// 32位MD5密码加密(不可逆转)  
        /// </summary>  
        /// <param name="decryptString">需要加密的字符串</param>  
        /// <returns></returns>  
        public static string Md5_32(string decryptString) //加密，不可逆  
        {
            MD5CryptoServiceProvider md5 = new MD5CryptoServiceProvider();
            string str = BitConverter.ToString(md5.ComputeHash(UTF8Encoding.Default.GetBytes(decryptString)));
            str = str.Replace("-", "");
            return str;
        }
    }
}
