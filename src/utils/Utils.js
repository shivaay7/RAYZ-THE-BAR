export const getCurrencyName = (currency)=>{
    switch (currency){
        case "₹":
            return "INR"
        case "$":
            return "USD"
        case "£":
            return "GBP"
        case "¥":
            return "JPY"
    }
}