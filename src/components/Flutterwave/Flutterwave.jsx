import { useState } from "react";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";

export default function App() {
  const [amount, setAmount] = useState(0);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const config = {
    public_key: "FLWPUBK_TEST-e7c8f332b9d34b01b958cf4f4f643018-X",
    tx_ref: Date.now(),
    amount: amount,
    currency: "USD",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: email,
      phone_number: phone,
      name: name,
    },
    customizations: {
      title: "my Payment Title",
      description: "Payment for items in cart",
      logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  return (
    <div className="flutterwavepayment">
      <div className="container">
        <button
          onClick={() =>
            handleFlutterPayment({
              callback: (response) => {
                console.log(response);
                closePaymentModal();
              },
              onClose: () => {},
            })
          }
        >
          Pay
        </button>
      </div>
    </div>
  );
}