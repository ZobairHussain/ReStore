using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class productsController : BaseAoiController
    {
        private readonly StoreContext _context;
        public productsController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts()
        {
            return await _context.Products.ToListAsync();
        }

        [HttpGet("{id}")] //api/products/3 
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product =  await _context.Products.FindAsync(id);
            if(product == null) return NotFound();
            return product;
        }

    }
}