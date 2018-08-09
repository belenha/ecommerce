function isValid() {
    return document.querySelector('#check').checked;
}

function onChangeCheckbox(handler) {
    document.querySelector('#check').addEventListener('change', handler);
}

function toggleValidationMessage() {
    document.querySelector('#msg').style.display = (isValid() ? 'none' : 'block');
}

function toggleButton(actions) {
    return isValid() ? actions.enable() : actions.disable();
}

// Render the PayPal button
paypal.Button.render({
    // Set your environment
    env: 'sandbox', // sandbox | production

    // PayPal Client IDs - replace with your own
    // Create a PayPal app: https://developer.paypal.com/developer/applications/create

    client: {
        sandbox: 'AcwRR9OXGFf6cwIlxNiXpaX6eHxQRYeMGLPEI_mWVTu3UT00j3layLYDQaDYSlNg55DHjB5pdNk7AVAm',
        production: 'AZDtUs64yyaXERRx_9oWdWR1z0T1wK7XWbzm9pM5f0NaKrHBEpgoXirWi16p1Mv3nq19zIJgC_tamawy'
    },

    validate: function (actions) {
        toggleButton(actions);

        onChangeCheckbox(function () {
            toggleButton(actions);
        });
    },

    onClick: function () {
        toggleValidationMessage();
    },

    // Wait for the PayPal button to be clicked
    payment: function (data, actions) {
        // Make a client-side call to the REST api to create the payment
        return actions.payment.create({
            payment: {
                transactions: [
                    {
                        amount: { total:'0.01', currency: 'MXN' }
                    }
                ]
            }
        });
    },

    // Wait for the payment to be authorized by the customer
    onAuthorize: function (data, actions) {
        // Execute the payment
        return actions.payment.execute().then(function () {
            window.alert('Pago exitoso!');
        });
    }
}, '#paypal-button');