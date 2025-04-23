import { Paynow } from "paynow";
import env from 'dotenv'

env.config()

var paynow = new Paynow(process.env.PAYNOW_ID, process.env.PAYNOW_KEY)
paynow.resultUrl = "http://example.com/gateways/paynow/update";
paynow.returnUrl = "http://example.com/return?gateway=paynow&merchantReference=1234";

export default paynow