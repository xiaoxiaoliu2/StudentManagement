using System;
using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public class Students
    {
        [Key]
        public int id { get; set; }
        public string stname { get; set; }
        public string course { get; set; }
    }
}

