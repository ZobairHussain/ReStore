using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using API.Extensions;
using API.RequestHelpers;
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
        public async Task<ActionResult<PagedList<Product>>> GetProducts([FromQuery]ProductParams productParams)
        {
            var query = _context.Products
            .Sort(productParams.orderBy)
            .Search(productParams.searchTerm)
            .Filter(productParams.brands, productParams.types)
            .AsQueryable();
            var products = await PagedList<Product>.ToPageList(query, productParams.PageNumber, productParams.PageSize);
            
            Response.AddPaginationHeader(products.metaData);
            return products;
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