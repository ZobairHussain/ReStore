import { TableContainer, Paper, Table, TableBody, TableRow, TableCell, Typography } from "@mui/material";
import { useAppSelector } from "../../app/store/configureStore";
import { currencyFormat } from "../../app/util/util";

interface Props {
    subTotal?: number;
}

export default function BasketSummary({subTotal}: Props) {
    const {basket} = useAppSelector(state => state.basket);
    if(subTotal === undefined)
        subTotal = basket?.items.reduce((sum, item) => sum + (item.quantity * item.price), 0) ?? 0;
    const deliveryFee = subTotal > 10000 ? 0 : 500;

    return (
    <>
        <TableContainer component={Paper} variant={'outlined'}>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell colSpan={2}>Subtotal</TableCell>
                        <TableCell align="right">{currencyFormat(subTotal)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={2}>Delivery fee*</TableCell>
                        <TableCell align="right">{currencyFormat(deliveryFee)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={2}>Total</TableCell>
                        <TableCell align="right">{currencyFormat(subTotal + deliveryFee)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <span style={{fontStyle: 'italic'}}>*Orders over $100 qualify for free delivery</span>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    </>
    )
}