import React, { useEffect, useState } from 'react';
import alert from "sweetalert";
import axios from 'axios';
import {pay_link_id} from './PaymentAPI'

export const fetchPaymentLinkStatus = async () => {
    try {
      const url = 'http://localhost:4000/check-status';
      const response = await axios.post(url, {'payment_id':pay_link_id}, {
        headers: {
            "content-type":"application/json",
        }
      });

    //   Assuming the most recent webhook data is the first in the array
      if (response.data.status === 'success') {
        return alert({icon:"success",title:"Payment Received "+response.data.paymentId,dangerMode:false,confirmButtonText:"ok"})
      }
      return alert({icon:"warning",title:"Awaiting..",dangerMode:false,confirmButtonText:"ok"})
    } catch (error) {
      console.error('Error fetching webhook data:', error);
    }
  };