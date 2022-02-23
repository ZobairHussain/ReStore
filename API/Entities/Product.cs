using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Product
    {
        public int Id { get; set; } //Entity framework e use korar jonno property need to be public
        public string Name { get; set; }
        public string Description { get; set; }
        public long Price { get; set; } // sqlite dont understand decimal + need long for payment process
        public string PictureUrl { get; set; }
        public string Type { get; set; }
        public string Brand { get; set; }
        public int QuantityInStock { get; set; } 
    }
}