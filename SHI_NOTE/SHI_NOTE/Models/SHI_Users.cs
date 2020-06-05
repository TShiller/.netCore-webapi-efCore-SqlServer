using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SHI_NOTE.Models
{
    public class SHI_Users
    {
        [Key] //主键 
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]  //设置自增
        public int Key_No { get; set; }
        public string Account { get; set; }
        public string UserEmail { get; set; }
        public string UserName { get; set; }
        public int UserSex { get; set; }
        public string UserImg { get; set; }
        public string UserSign { get; set; }
        public string UserPwd { get; set; }
        public string UserToken { get; set; }

    }
}
