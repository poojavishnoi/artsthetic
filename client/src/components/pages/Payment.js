import React, { useState, useEffect } from "react";
import "./Payment.css";
import GooglePayButton from "@google-pay/button-react";
import { Link } from "react-router-dom";
//import "./Home.css";
import M from "materialize-css";

const Payment = () => {
  const userdata = JSON.parse(localStorage.getItem("user"));
  console.log(userdata);
  let x = 50;
  const firstname = userdata.firstname;
  const lastname = userdata.lastname;
  const profilepic = userdata.profilepic;
  const email = userdata.email;
  const [phone, setPhone] = useState("");
  const [general, setGeneral] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [cartitem, setItems] = useState([]);
  const order = 1;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/myitem", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setItems(result.myitem);
        console.log(cartitem.price);
        console.log(cartitem.quantity);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const totalPrice = cartitem.reduce(
    (price, item) => price + item.quantity * item.price,
    0
  );
  const updateDetails = () => {
    fetch("/updateuserdetails", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        firstname,
        lastname,
        email,
        profilepic,
        phone,
        general,
        city,
        pincode,
        order,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error });
        } else {
          M.toast({
            html: "Successfully Updated!",
            classes: "#2e7d32 green darken-3",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="bc">
      <div className="cart-items">
        <h2 className="cart-items-header">Review your order</h2>
        <div className="Use">
          <ul className="Name">Shipping to:</ul>
          <ul>
            {userdata.firstname} {userdata.lastname}
          </ul>
        </div>
        <div className="Emai">
          <ul className="mail">Your email:</ul>
          <ul> {userdata.email}</ul>
        </div>
        <div className="Address">
          <ul className="Address-text">Address:</ul>
          <input
            required="true"
            type="text"
            placeholder="Enter a Address to ship to"
            className="Address-input"
            value={general}
            onChange={(e) => setGeneral(e.target.value)}
          />
        </div>
        <div className="Muni">
          <ul className="Muni-text">City:</ul>
          <input
            required="true"
            type="text"
            placeholder="Enter your City"
            className="Muni-input"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className="Postal">
          <ul className="Postal-text">Postal-Code:</ul>
          <input
            required="true"
            type="number"
            placeholder="Enter your Postal-Code"
            className="Postal-input"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
          />
        </div>
        <div className="Phone">
          <ul className="Phone-text">Contact Number:</ul>
          <input
            required="true"
            type="number"
            placeholder="Enter a Contact Number"
            className="Phone-input"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="Total-Price">
          <ul className="Total-Price-text">Total Price:</ul>
          <ul>{totalPrice}</ul>
        </div>
        <div className="Charges">
          <ul className="Charges-text">Delivery Charges:</ul>
          <ul>{x}</ul>
        </div>
        <div className="Final-Cost">
          <ul className="Final-Cost-text">Final Ammount to Pay:</ul>
          <ul>{x + totalPrice}</ul>
        </div>

        <div className="cart-items-total-price-name">
          <div className="buy-now">
            <GooglePayButton
              environment="TEST"
              paymentRequest={{
                apiVersion: 2,
                apiVersionMinor: 0,
                allowedPaymentMethods: [
                  {
                    type: "CARD",
                    parameters: {
                      allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                      allowedCardNetworks: ["MASTERCARD", "VISA"],
                    },
                    tokenizationSpecification: {
                      type: "PAYMENT_GATEWAY",
                      parameters: {
                        gateway: "example",
                        gatewayMerchantId: "exampleGatewayMerchantId",
                      },
                    },
                  },
                ],
                merchantInfo: {
                  merchantId: "12345678901234567890",
                  merchantName: "Artsthetic",
                },
                transactionInfo: {
                  totalPriceStatus: "FINAL",
                  totalPriceLabel: "Total",
                  totalPrice: "1",
                  currencyCode: "INR",
                  countryCode: "IN",
                },
                shippingAddressRequired: true,
                callbackIntents: ["SHIPPING_ADDRESS", "PAYMENT_AUTHORIZATION"],
              }}
              onLoadPaymentData={(paymentRequest) => {
                console.log("Success", paymentRequest);
              }}
              onPaymentAuthorized={(paymentData) => {
                console.log("Payment Authorised Success", paymentData);
                return { transactionState: "SUCCESS" };
              }}
              // onPaymentDataChanged={(paymentData) => {
              //   console.log("On Payment Data Changed", paymentData);
              //   return {};
              // }}
              existingPaymentMethodRequired="false"
              buttonColor="black"
              buttonType="Buy"
            />
          </div>
          <div className="CODBOX">
            <div className="OR"> OR </div>
            <Link to="/Profile">
              <div className="UF">
                <button onClick={() => updateDetails()} className="COD">
                  Cash on Delivery And CheckOut
                </button>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
