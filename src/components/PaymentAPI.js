import alert from "sweetalert";
import axios from 'axios';
import { getCurrencyName } from "../utils/Utils";
import { v4 as uuidv4 } from 'uuid';

export let pay_link_id='id'

var apiData = () => {
  const remoteData = {
   
    collectApiLocal:'http://localhost:8083/tctp/updateStatus',
    paymentLinkApiLocal: 'http://localhost:8083/tctp/pay/O7y28zjlkDgTxE',
    posApiUrl: 'http://localhost:4000/pos',
    headers : {
      "Access-Control-Allow-Origin":"*",
      "content-type": "application/json"
    }
  }
  return remoteData
}


// Payment Link API
const buildApiPayloadForPayViaLink = (invoiceData) => {

  const uniqueRefNumber = uuidv4();
    return {
        amount: parseInt(invoiceData.total)*100,
        currency: getCurrencyName(invoiceData.currency),
        accept_partial: false,
        expire_by: getExpirationTime(),  
        reference_id: uniqueRefNumber, //TODO : Which Value Needs to be Populated
        description: `Payment for policy no #23456`, //TODO : Which Value Needs to be Populated
        customer: {
          name: invoiceData.billTo || 'Dummy',
          contact: invoiceData.billToNumber,  //TODO : Which Value Needs to be Populated
          email: 'kiratox796@ofionk.com',   
        },
        notify: {
            sms: true,
            email: true,
        },
        reminder_enable: true,
        notes: {
            "Paid To": "Total Amount To Be Paid"
        }, //TODO : Which Value Needs to be Populated,
        callback_url: 'https://8015-121-242-131-242.ngrok-free.app/link-webhook',
        callback_method: 'get',
    }

};


//POS API
const buildApiPayloadForPayViaDevice = (invoiceData) => {
   const uniqueRefNumber = uuidv4();
    return {
        "customerMobileNumber": invoiceData.billToNumber || '+916395450853',  //TODO : Mobile Number Field Required
        "externalRefNumber": uniqueRefNumber,
        "amount":invoiceData.total,
        "externalRefNumber2": "",
        "externalRefNumber3": "",
    }
}


// Collect API
const collectApiPayload = (invoiceData) => {
   return {
    "amount":parseInt(invoiceData.total)*100,
    "currency":getCurrencyName(invoiceData.currency),
    "vpa":invoiceData.vpa || 'aborana@ybl',
    "contact":invoiceData.billToNumber,
   }
}

  export const sendPaymentLink = async (event,invoiceData) => {
    event.preventDefault();

    const payload = buildApiPayloadForPayViaLink(invoiceData)
    
    const apiUrl = apiData()

    const url = apiUrl.paymentLinkApiLocal
    
    pay_link_id =''

    try {
        const response = await axios.post(url, payload, {
          headers: {
            "content-type": "application/json",
            "Authorization":"Basic cnpwX3Rlc3RfM1lKRzBHSU1mUGZmR1c6RVV2WjZuaW92QkhWMjZJWGg4elpkemE5",
            "rzpctx-dev-serve-user": "pos-dev",
          }
        });
        if (response?.data?.status === "failed") {
          return alert({
            icon: "error", title: response?.data?.response, dangerMode: true, confirmButtonText: "ok",
          });
        }
        pay_link_id = response.data.id;
        return alert({icon:"success",title:"Link Sent",dangerMode:false,confirmButtonText:"ok"})
      } catch (error) {
        return alert({
          icon: "error", title: "Something went wrong" + error, dangerMode: true, confirmButtonText: "ok",
        });
      }
  }



// POS Api
export const payViaPos = async (event,invoiceData) => {
    event.preventDefault(); 

    const apiUrl = apiData()
    
    const url = apiUrl.posApiUrl

    const payload =buildApiPayloadForPayViaDevice(invoiceData)

    try {
        const response = await axios.post(url, payload, {
          headers: apiUrl.headers
        });
        if (response?.data?.pos_response?.success === false) {
          return alert({
            icon: "error", title: response?.data?.pos_response.message, dangerMode: true, confirmButtonText: "ok",
          });
        }
        return alert({icon:"success",title:"Payment Initiated, Check POS",dangerMode:false,confirmButtonText:"ok"})
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


export const collectApi = async (event,invoiceData) =>{
    event.preventDefault(); 

    const apiUrl = apiData()
    
    const url = apiUrl.collectApiLocal

    const collectPayload =collectApiPayload(invoiceData)

    try {
        const response = await axios.post(url, collectPayload, {
          headers: apiUrl.headers
        });

        if (response?.data?.success === false) {
          return alert({
            icon: "error", title: response?.data?.message, dangerMode: true, confirmButtonText: "ok",
          });
        }
        return alert({icon:"success",title:"Sent Request",dangerMode:false,confirmButtonText:"ok"})
      } catch (error) {
        return alert({
          icon: "error", title: "Something went wrong" + error, dangerMode: true, confirmButtonText: "ok",
        });
      } 

}



