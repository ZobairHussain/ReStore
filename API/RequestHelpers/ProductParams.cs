namespace API.RequestHelpers
{
    public class ProductParams : PaginationParams
    {
        public string orderBy { get; set; }
        public string searchTerm { get; set; }
        public string types { get; set; }
        public string brands { get; set; }

    }
}