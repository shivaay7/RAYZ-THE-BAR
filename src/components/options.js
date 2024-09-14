import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { sendPaymentLink } from './PaymentAPI';

const PaymentButtons = (props) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
    // abhishek bhai yaha pe api options add kr lena aap
    console.log(`Selected payment option: ${event.target.value}`);
  };

  const handlePayNow = (event) => {
    // yahan pe pay now ka logic aa jayega

    const invoiceData = {
      invoiceNumber: props.invoiceNumber,
      billTo: props.billTo,
      billToEmail: props.billToEmail,
      billToAddress: props.billToAddress,
      items: props.items,
      subTotal: props.subTotal,
      taxAmount: props.taxAmount,
      discountAmount: props.discountAmount,
      total: props.total,
      currency: props.currency,
    };
  
    sendPaymentLink(event,invoiceData)
    console.log(`Paying now using: ${selectedOption}`);
  };



  return (
    <div className="container pt-3">
      <div className="pt-md-3 pt-xl-4">
        <div className="d-flex align-items-center mb-3">
          <input
            type="radio"
            id="payViaPOS"
            name="paymentOption"
            value="POS"
            checked={selectedOption === 'POS'}
            onChange={handleRadioChange}
            className="form-check-input me-2"
          />
          <label 
            htmlFor="payViaPOS" 
            className="form-check-label" 
            style={{ fontSize: '18px' }}
          >
            Pay via POS
          </label>
        </div>
        <div className="d-flex align-items-center mb-3">
          <input
            type="radio"
            id="payViaLink"
            name="paymentOption"
            value="Link"
            checked={selectedOption === 'Link'}
            onChange={handleRadioChange}
            className="form-check-input me-2"
          />
          <label 
            htmlFor="payViaLink" 
            className="form-check-label" 
            style={{ fontSize: '18px' }}
          >
            Pay via Link
          </label>
        </div>
        <div className="d-flex align-items-center mb-3">
          <input
            type="radio"
            id="payViaCash"
            name="paymentOption"
            value="Cash"
            checked={selectedOption === 'Cash'}
            onChange={handleRadioChange}
            className="form-check-input me-2"
          />
          <label 
            htmlFor="payViaCash" 
            className="form-check-label" 
            style={{ fontSize: '18px' }}
          >
            Pay via Cash
          </label>
        </div>
        <button
          onClick={handlePayNow}
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
            width: '100%', 
            marginTop: '15px' 
          }}
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default PaymentButtons;
