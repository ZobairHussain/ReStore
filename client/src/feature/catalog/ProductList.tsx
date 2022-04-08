import { Grid } from "@mui/material";
import { Product } from "../../app/models/product";
import ProductCart from "./ProductCart";

interface Props {
    products: Product[];
}
export default function ProductList({products}: Props) {
    return(
        // spacing = 1 means 8 pixle
        <Grid container spacing={4}>
            {products.map(product => (
                <Grid item xs={4} key={product.id}>
                    <ProductCart product={product} />
                </Grid>
            ))}
        </Grid>
    )
}