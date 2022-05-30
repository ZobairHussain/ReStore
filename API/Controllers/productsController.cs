using System;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.RequestHelpers;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Stripe;
using Product = API.Entities.Product;

namespace API.Controllers
{
    public class productsController : BaseApiController
    {
        private readonly StoreContext _context;
        private readonly IMapper _mapper;
        public productsController(StoreContext context, IMapper mapper)
        {
            _mapper = mapper;
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

        [HttpGet("{id}", Name = "GetProduct")] //api/products/3 
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product =  await _context.Products.FindAsync(id);
            if(product == null) return NotFound();
            return product;
        }

        [HttpGet("filters")]
        public async Task<IActionResult> GetFilters()
        {
            var brands = await _context.Products.Select(p => p.Brand).Distinct().ToListAsync();
            var types = await _context.Products.Select(p => p.Type).Distinct().ToListAsync();

            return Ok(new {brands, types});
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult<Product>> CreateProduct(CreateProductDto productDto)
        {
            var product = _mapper.Map<Product>(productDto);
            _context.Products.Add(product);

            var result = await _context.SaveChangesAsync() > 0;
            if(result) return CreatedAtRoute("GetProduct", new {Id = product.Id}, product);

            return BadRequest(new ProblemDetails{ Title = "Problem Creating new product"});
        }

    }
}