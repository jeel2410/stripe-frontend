import './App.css';
import Stripe from 'react-stripe-checkout';
import React, { useState } from 'react'


function App() {
  const [product, setProduct] = useState({
    name: "book",
    price: 14,
    productBy: "amazon"
  })

  const makePayment = (token) => {
    const body = {
      token,
      product
    }
    const headers = {
      "Content-Type": "application/json"
    }
    return fetch(`http://localhost:5000/api/stripe/pay`, {
      method: "POST",
      headers,
      body: JSON.stringify(body)

    }).then(response => {
      console.log(response);
      const { status } = response;
      console.log("status" + status);

    })
      .catch(err => console.log(err));
  }

  return (
    <div>
      <Stripe
        stripeKey={process.env.REACT_APP_KEY}
        token={makePayment}
        amount={product.price * 100}
        shippingAddress
        billingAddress
        name="buy book">
        <button className='btn-large blue'>Buy Book in just {product.price} $</button>

      </Stripe>
    </div>
  );
}

export default App;
