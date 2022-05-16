import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutPage from "./CheckoutPage";

const stripePromise = loadStripe('pk_test_51KygoqJces2I16yjqNbsrq87foPioBydZo6Bw6PS2GOCGMkmYsIW0oZ9Xcenp2NwlCNJibEsbhqm40UqIr0vBi7i00tH6vS9Cj')

export default function CheckoutWrapper() {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutPage /> 
        </Elements>
    )
}