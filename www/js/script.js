const { ApplePay } = Capacitor.Plugins;

const applePayBtn = document.getElementById('applePay');
const informationBlock = document.getElementById('informationBlock');

applePayBtn.addEventListener('click', async event => {
  event.preventDefault();

  const networks = ['mastercard', 'visa'];
  const capabilities = ['capability3DS', 'capabilityCredit', 'capabilityDebit'];

  const { isPayment } = await ApplePay.canMakePayments({
    usingNetworks: networks,
    capabilities: capabilities,
  });

  // OR await ApplePay.canMakePayments(<void>);

  if (isPayment) {
    informationBlock.innerHTML = 'Payments supported!!!';
  } else {
    applePayBtn.setAttribute('disabled', 'disabled');
    informationBlock.innerHTML = 'Payment not supported!';
    return;
  }

  const paymentRequest = {
    merchantIdentifier: "com.apple.testing",
    paymentSummaryItems: [
      {
        label: 'order #1001:',
        amount: 120.57,
      }
    ],

    currencyCode: "USD",
    countryCode: "US",

    supportedNetworks: networks,
    merchantCapabilities: capabilities,

    requiredShippingContactFields: ['emailAddress', 'phoneNumber', 'name'],
    requiredBillingContactFields: ['emailAddress', 'phoneNumber', 'name'],
  };

  try {
    const paymentResponse = await ApplePay.makePaymentRequest(paymentRequest);
    
    const paymentData = paymentResponse.token.paymentData;
    // INFO: Check and completion of the payment by your processing center
    console.log(paymentData);

    // DEMO PRINT:
    informationBlock.innerHTML = JSON.stringify(paymentResponse, null, '  ');

    // If success
    ApplePay.completeLastTransaction({ status: "success" });
    // Or error
    // ApplePay.completeLastTransaction({ status: "error" });
  } catch (e) {
    if (e.message === 'canceled') {
      informationBlock.innerHTML = 'Payment widget was closed by user';
    } else {
      informationBlock.innerHTML = 'Unknown error';
    }
  }
});