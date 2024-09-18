import alert from "sweetalert";
import axios from 'axios';
import { getCurrencyName } from "../utils/Utils";

// Payment Link API
const buildApiPayloadForPayViaLink = (invoiceData) => {
    return {
        amount: parseInt(invoiceData.total)*100,
        currency: getCurrencyName(invoiceData.currency),
        accept_partial: false,
        expire_by: getExpirationTime(),  
        reference_id: "TS1989", //TODO : Which Value Needs to be Populated
        description: `Payment for policy no #23456`, //TODO : Which Value Needs to be Populated
        customer: {
          name: invoiceData.billTo || 'Dummy',
          contact: invoiceData.billToEmail || '+916395450853',  //TODO : Which Value Needs to be Populated
          email: 'abhishek.borana@razorpay.com',   
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

};

const buildApiPayloadForPayViaDevice = (invoiceData) => {

    const payload = {
        "appKey": "a9243bf7-659a-48aa-87e3-7dfde972ce72",
        "username": "8668776491",
        "amount":invoiceData.total,
        "customerMobileNumber": invoiceData.billToEmail || '+916395450853',  //TODO : Mobile Number Field Required
        "externalRefNumber": invoiceData.invoiceNumber.toString(),
        "externalRefNumber2": "",
        "externalRefNumber3": "",
        "paymentMode" : "CARD", //TODO : Payment Mode Field Required
        "pushTo": {
            "deviceId": "1491843883|ezetap_android"
        }
    }
	
    return {
      "pos_pay":payload
    }
}

  export const sendPaymentLink = async (event,invoiceData) => {
    event.preventDefault();

    const payload = buildApiPayloadForPayViaLink(invoiceData)

    const url = 'http://localhost:8083/tctp/pay/O7y28zjlkDgTxE';

    try {
        const response = await axios.post(url, payload, {
          headers: {
            "content-type": "application/json",
            "Authorization":"Basic cnpwX3Rlc3RfM1lKRzBHSU1mUGZmR1c6RVV2WjZuaW92QkhWMjZJWGg4elpkemE5",
          }
        });
        if (response?.data?.status === "failed") {
          return alert({
            icon: "error", title: response?.data?.response, dangerMode: true, confirmButtonText: "ok",
          });
        }
        return alert({icon:"success",title:"Link Sent",dangerMode:false,confirmButtonText:"ok"})
      } catch (error) {
        return alert({
          icon: "error", title: "Something went wrong" + error, dangerMode: true, confirmButtonText: "ok",
        });
      }
  }



//   POS Api
export const payViaPos = async (event,invoiceData) => {
    event.preventDefault(); 

    const url = 'http://localhost:8083/tctp/pay/O7y28zjlkDgTxEs';

    const payload =buildApiPayloadForPayViaDevice(invoiceData)

    try {
        const response = await axios.post(url, payload, {
          headers: {
            "content-type": "application/json"
          }
        });
        if (response?.data?.pos_response?.success === false) {
          return alert({
            icon: "error", title: response?.data?.pos_response.message, dangerMode: true, confirmButtonText: "ok",
          });
        }
        return alert({icon:"success",title:"Link Sent",dangerMode:false,confirmButtonText:"ok"})
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


