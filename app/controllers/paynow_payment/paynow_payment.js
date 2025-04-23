import paynow from '../../paynow/paynow.js'

async function makePayment(request, response) {
    const payment = paynow.createPayment('Invoice 35')
    payment.add('Bus Fare', request.body.busFare)
    paynow.send(payment).then((paymentResponse) => {
        if (paymentResponse.success) {
            response.status(200).send('Payment successful!')
        }
        else {
            console.log(paymentResponse)
            response.status(500).send('Failed to process payment')
        }
    })
}

async function makeEcocashPayment(request, response) {
    const payment = paynow.createPayment('Invoice 35', 'moyongqaa@gmail.com')
    payment.add('Bus Fare', request.body.busFare)
    paynow.sendMobile(payment, request.body.phoneNumber, 'ecocash').then(paynowResponse => {
        if (paynowResponse.success) {
            const instructions = paynowResponse.instructions
            const pollURL = response.pollUrl
            console.log(pollURL)
            response.status(200).send('Ecocash payment successful!')
        } else {
            console.log(paynowResponse.error)
        }
    }).catch(e => {
        console.log('Error', e)
    })
}

export { makePayment, makeEcocashPayment }