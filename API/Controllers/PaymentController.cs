using System.IO;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities.OrderAggregate;
using API.Extensions;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.VisualBasic;
using Stripe;

namespace API.Controllers
{
    public class PaymentController : BaseApiController
    {
        private readonly PaymentService _paymentService;
        private readonly StoreContext _storeContext;
        private readonly IConfiguration _config;
        public PaymentController(PaymentService paymentService, StoreContext storeContext, IConfiguration config)
        {
            _config = config;
            _storeContext = storeContext;
            _paymentService = paymentService;
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<BasketDto>> CreateOrUpdatePaymentIntent()
        {
            var basket = await _storeContext.Baskets
            .RetriveBasketWithItems(User.Identity.Name)
            .FirstOrDefaultAsync();

            if(basket == null) return NotFound();

            var intent = await _paymentService.CreateOrUpdatePaymentIntent(basket);

            if(intent == null) return BadRequest(new ProblemDetails{Title = "Problem creating payment intent"});

            basket.PaymentIntentId = basket.PaymentIntentId ?? intent.Id;
            basket.ClientSecret = basket.ClientSecret ?? intent.ClientSecret;

            _storeContext.Update(basket);

            var result = await _storeContext.SaveChangesAsync() > 0;

            if(!result) return BadRequest(new ProblemDetails{Title = "Problem updating basket with intent"});

            return basket.MapBasketToDto();
        }

        [HttpPost("webhook")]
        public async Task<ActionResult> StripeWebhook()
        {
            var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();

            var stripeEvent = EventUtility.ConstructEvent(json, Request.Headers["Stripe-Signature"],
            _config["StripeSettings:WhSecret"]);
            
            var charge = (Charge)stripeEvent.Data.Object;

            var order = await _storeContext.Orders.FirstOrDefaultAsync(x => x.PaymentIntentId == charge.PaymentIntentId);

            if(charge.Status == "succeeded") order.OrderStatus = OrderStatus.PaymentReceived;

            await _storeContext.SaveChangesAsync();

            return new EmptyResult();

        }
    }
}