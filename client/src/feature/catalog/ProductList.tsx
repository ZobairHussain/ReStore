import { Grid } from "@mui/material";
import { Product } from "../../app/models/product";
import { useAppSelector } from "../../app/store/configureStore";
import ProductCardSkeleton from "./ProductCardSkeleton";
import ProductCard from "./ProductCard";

interface Props {
    products: Product[];
}
export default function ProductList({products}: Props) {
    const {productsLoaded} = useAppSelector(state => state.catalog);
    return(
        // spacing = 1 means 8 pixle
        <Grid container spacing={4}>
            {products.map(product => (
                <Grid item xs={4} key={product.id}>
                    {!productsLoaded ? (
                        <ProductCardSkeleton />
                    ) : (
                        <ProductCard product={product} />
                    )}
                </Grid>
            ))}
        </Grid>
    )
}