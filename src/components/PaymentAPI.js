import alert from "sweetalert";
import axios from 'axios';
import { getCurrencyName } from "../utils/Utils";

// Payment Link API
const buildApiPayload = (invoiceData) => {

    

    const payload = {
        amount: invoiceData.total,
        currency: getCurrencyName(invoiceData.currency),
        accept_partial: false,
        expire_by: getExpirationTime(),  
        reference_id: invoiceData.invoiceNumber, //TODO : Which Value Needs to be Populated
        description: `Payment for policy no #23456`, //TODO : Which Value Needs to be Populated
        customer: {
          name: invoiceData.billTo || 'Dummy',
          contact: invoiceData.billToEmail || '+916395450853',  //TODO : Which Value Needs to be Populated
          email: invoiceData.billToAddress || 'abhishek.borana@razorpay.com',   
        },
        notify: {
            sms: true,
            email: true,
        },
        reminder_enable: true,
        notes: {
            "Paid To": "Total Amount To Be Paid"
        }, //TODO : Which Value Needs to be Populated,
        callback_url: 'https://solutions.ext.dev.razorpay.in/',
        callback_method: 'get',
    }

    return payload
};


  export const sendPaymentLink = async (event,invoiceData) => {
    event.preventDefault();

    const payload = buildApiPayload(invoiceData)

    let url = 'https://api.razorpay.com/v1/payment_links';

    try {
        const response = await axios.post(url, payload, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            "content-type": "application/json",
            "Authorization":"Basic cnpwX3Rlc3RfM1lKRzBHSU1mUGZmR1c6RVV2WjZuaW92QkhWMjZJWGg4elpkemE5",
          }
        });
        if (response?.data?.status === "failed") {
          return alert({
            icon: "error", title: response?.data?.response, dangerMode: true, confirmButtonText: "ok",
          });
        }
        console.log("HEY DATA HERE\n\n",response)
      } catch (error) {
        return alert({
          icon: "error", title: "Something went wrong" + error, dangerMode: true, confirmButtonText: "ok",
        });
      }
  }


  const getExpirationTime = () => {
    const now = new Date(); 
    now.setMinutes(now.getMinutes() + 15); 
    return now.getTime(); 
  };