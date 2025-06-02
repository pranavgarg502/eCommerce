const paypal = require('paypal-rest-sdk')
paypal.configure({
    mode : 'sandbox',
    client_id : 'AXzWPvGHEiCwbdMvSwb24emLcHQUHHN6Htox0L8dWC6oGrHAPJvFXAhgauGJ1ROrA-oK_i4M39I4rsrR',
    client_secret: 'EAgPILzsDfymq94GD2b9I1PSdrcVmejKvXfHJycFynb8x0gV7EWavKs8uO3CjAElDb472T1l7pRyWz1I'
})
module.exports = paypal;