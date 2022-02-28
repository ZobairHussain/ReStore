import { useState, useEffect } from "react";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";


export default function Catalog() {

    const [products, setProducts] = useState<Product[]>([]);

    // empty array as dependency means compile only once
    useEffect(() => {
        fetch('http://localhost:5000/api/products')
        .then(Response => Response.json())
        .then(data => setProducts(data))
    }, [])

    return (
        <>
            <ProductList products={products} />
        </>
    )
}