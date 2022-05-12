using System;
using System.Collections.Generic;
using API.Entities.OrderAggregate;

namespace API.DTOs
{
    public class OrderDto
    {
        public int Id { get; set; }
        public string BuyerId { get; set; }
        public ShippingAddress ShippingAddress { get; set; }
        public DateTime OrderDate { get; set; }
        public List<OrderItemDto> OrderItems { get; set; }
        public long SubTotal { get; set; }
        public long DelivaryFee { get; set; }
        public string OrderStatus { get; set; }
        public long Total { get; set; }
    }
}