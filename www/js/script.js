const { ApplePay } = Capacitor.Plugins;

const applePayBtn = document.getElementById('applePay');
applePayBtn.addEventListener('click', event => {
  event.preventDefault();

  const paymentRequest = {
    merchantIdentifier: "com.apple.testing",
    paymentSummaryItems: [
      {
        label: 'order #1001:',
        amount: 120.57,
      }
    ]
  };

  ApplePay.makePaymentRequest(paymentRequest).then(data => {
    console.log('data: ', data);
    ApplePay.completeLastTransaction({ status: "success" });
  });
});