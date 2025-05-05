import paynow from '../../paynow/paynow.js'

async function makeShuttlePayment(request, response) {
    try {
        const payment = paynow.createPayment('Invoice 35', 'moyongqaa@gmail.com');
        payment.add('Shuttle total', request.body.total);
        
        const paynowResponse = await paynow.send(payment);
        
        if (!paynowResponse.success) {
            response.status(400).send(paynowResponse.error);
        } else {
            console.log(paynowResponse.redirectUrl);
            response.status(200).send({
                success: true,
                paymentUrl: paynowResponse.redirectUrl
            });
        }
    } catch(error) {
        console.error(error);
        response.status(500).send(error);
    }
}

async function makeShuttleEcocashPayment(request, response) {
    try {
        const payment = paynow.createPayment('Invoice 35', 'moyongqaa@gmail.com')
        payment.add('Bus Fare', request.body.busFare)
        console.log('Payment Object After Adding Items:\n', payment);
        const paynowResponse = await paynow.send(payment, request.body.phoneNumber, 'ecocash')
        console.log('Paynow API Response:\n', response);

        if (!paynowResponse.success) {
            response.status(400).send(paynowResponse.error)
        } else {
            response.status(200).send({
                success: true,
                paymentUrl: paynowResponse.redirectUrl
            })
        }
    }
    catch(error) {
        console.error(error)
        response.status(500).send(error)
    }
}

async function makeRideEcocashPayment(request, response) {
    try {
        const payment = paynow.createPayment('Invoice 35', 'moyongqaa@gmail.com')
        payment.add('Ride Fare', request.body.rideFare)
        console.log('Payment Object After Adding Items:\n', payment);
        const paynowResponse = await paynow.send(payment, request.body.phoneNumber, 'ecocash')
        console.log('Paynow API Response:\n', response);

        if (!paynowResponse.success) {
            response.status(400).send(paynowResponse.error)
        } else {
            response.status(200).send({
                success: true,
                paymentUrl: paynowResponse.redirectUrl
            })
        }
    }
    catch(error) {
        console.error(error)
        response.status(500).send(error)
    }
}

async function makeParcelPayment(request, response) {
    try {
        const payment = paynow.createPayment('Invoice 35', 'moyongqaa@gmail.com');
        payment.add('Cargo total', request.body.total);
        
        const paynowResponse = await paynow.send(payment);
        
        if (!paynowResponse.success) {
            response.status(400).send(paynowResponse.error);
        } else {
            console.log(paynowResponse.redirectUrl);
            response.status(200).send({
                success: true,
                paymentUrl: paynowResponse.redirectUrl
            });
        }
    } catch(error) {
        console.error(error);
        response.status(500).send(error);
    }
}

async function makeParcelEcocashPayment(request, response) {
    try {
        const payment = paynow.createPayment('Invoice 35', 'moyongqaa@gmail.com')
        payment.add('Parcel Sipping Cost', request.body.cost)
        console.log('Payment Object After Adding Items:\n', payment);
        const paynowResponse = await paynow.send(payment, request.body.phoneNumber, 'ecocash')

        if (!paynowResponse.success) {
            response.status(400).send(paynowResponse.error)
        } else {
            console.log(paynowResponse.redirectUrl)
            response.status(200).send({
                success: true,
                paymentUrl: paynowResponse.redirectUrl
            })
        }
    }
    catch(error) {
        console.error(error)
        response.status(500).send(error)
    }
}



export { makeShuttlePayment, makeShuttleEcocashPayment, makeRideEcocashPayment, makeParcelPayment, makeParcelEcocashPayment }