import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { payViaPos, sendPaymentLink } from './PaymentAPI';
import alert from "sweetalert";

const PaymentButtons = (props) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [vpa, setVpa] = useState(''); // State for VPA input

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
    console.log(`Selected payment option: ${event.target.value}`);
  };

  const handlePayNow = (event) => {
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

    switch (selectedOption) {
      case 'POS':
        payViaPos(event, invoiceData);
        setSelectedOption(""); 
        break;
      case 'Link':
        sendPaymentLink(event, invoiceData);
        setSelectedOption(""); 
        break;
      case 'Cash':
        alert({icon: "success", title: "Payment is Successful", dangerMode: false, confirmButtonText: "ok"});
        setSelectedOption(""); 
        break;
      case 'VPA':
        // Handle VPA payment logic here
        alert({icon: "success", title: `Payment via VPA (${vpa}) is Successful`, dangerMode: false, confirmButtonText: "ok"});
        setVpa(''); // Clear VPA input after payment
        setSelectedOption("");
        break;
      default:
        alert({
          icon: "error", title: "Please Choose an Appropriate Option to Pay", dangerMode: true, confirmButtonText: "ok",
        });
        setSelectedOption(""); 
    }
    console.log(`Paying now using: ${selectedOption}`);
  };

  const checkStatusApi = async (paymentMethod) => {
    // Placeholder for API status check functions
    switch (paymentMethod) {
      case 'POS':
        alert("Checked status for POS API");
        break;
      case 'Link':
        alert("Checked status for Link API");
        break;
      case 'Cash':
        alert("Checked status for Cash API");
        break;
      case 'VPA':
        alert("Checked status for VPA API");
        break;
      default:
        alert("Invalid payment method");
    }
  };

  const paymentOptionStyle = {
    padding: '3px',
    borderRadius: '5px',
    transition: 'background-color 0.3s',
    cursor: 'pointer',
    width: '100%',
  };

  const selectedStyle = {
    backgroundColor: '#e0f7fa', // Light blue background
  };

  return (
    <div className="container pt-3">
      <div className="row">
        <div className="col-lg-12">
          <div className="pt-md-3 pt-xl-8">
            {/* Payment Option: Pay via POS */}
            <div 
              style={{ ...paymentOptionStyle, ...(selectedOption === 'POS' ? selectedStyle : {}) }} 
              className="d-flex align-items-center justify-content-between mb-3"
              onClick={() => setSelectedOption('POS')}
            >
              <div className="d-flex align-items-center">
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
              <button
                onClick={() => checkStatusApi('POS')}
                style={{
                  backgroundColor: '#17a2b8',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  padding: '5px 10px',
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
              >
                Status
              </button>
            </div>

            {/* Payment Option: Pay via Link */}
            <div 
              style={{ ...paymentOptionStyle, ...(selectedOption === 'Link' ? selectedStyle : {}) }} 
              className="d-flex align-items-center justify-content-between mb-3"
              onClick={() => setSelectedOption('Link')}
            >
              <div className="d-flex align-items-center">
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
              <button
                onClick={() => checkStatusApi('Link')}
                style={{
                  backgroundColor: '#17a2b8',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  padding: '5px 10px',
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
              >
                Status
              </button>
            </div>

            {/* Payment Option: Pay via Cash */}
            <div 
              style={{ ...paymentOptionStyle, ...(selectedOption === 'Cash' ? selectedStyle : {}) }} 
              className="d-flex align-items-center justify-content-between mb-3"
              onClick={() => setSelectedOption('Cash')}
            >
              <div className="d-flex align-items-center">
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
                onClick={() => checkStatusApi('Cash')}
                style={{
                  backgroundColor: '#17a2b8',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  padding: '5px 10px',
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
              >
                Status
              </button>
            </div>

            {/* Payment Option: Pay via VPA */}
            <div 
              style={{ ...paymentOptionStyle, ...(selectedOption === 'VPA' ? selectedStyle : {}) }} 
              className="d-flex align-items-center justify-content-between mb-3"
              onClick={() => setSelectedOption('VPA')}
            >
              <div className="d-flex align-items-center">
                <input
                  type="radio"
                  id="payViaVPA"
                  name="paymentOption"
                  value="VPA"
                  checked={selectedOption === 'VPA'}
                  onChange={handleRadioChange}
                  className="form-check-input me-2"
                />
                <label 
                  htmlFor="payViaVPA" 
                  className="form-check-label" 
                  style={{ fontSize: '18px' }}
                >
                  Pay via VPA
                </label>
              </div>
              <button
                onClick={() => checkStatusApi('VPA')}
                style={{
                  backgroundColor: '#17a2b8',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  padding: '5px 10px',
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
              >
                Status
              </button>
            </div>

            {/* VPA Input Field */}
            {selectedOption === 'VPA' && (
              <div className="mb-3">
                <input
                  type="text"
                  value={vpa}
                  onChange={(e) => setVpa(e.target.value)}
                  placeholder="Enter VPA (e.g., user@upi)"
                  className="form-control"
                  style={{ width: '100%', marginTop: '10px' }}
                />
              </div>
            )}

            {/* Pay Now Button */}
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
      </div>
    </div>
  );
};

export default PaymentButtons;
