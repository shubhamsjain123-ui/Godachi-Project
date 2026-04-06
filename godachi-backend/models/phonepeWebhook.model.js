const mongoose = require('mongoose');

const PhonepeWebhookSchema = new mongoose.Schema({
    verifyHeader: String,
    response:mongoose.Schema.Types.Mixed,
    responseString:String,
    responseJson: mongoose.Schema.Types.Mixed,
    success: Boolean,
    message: String,
    code: String,
    data:mongoose.Schema.Types.Mixed,
    merchantId: String,
    merchantTransactionId: String,
    transactionId: String,
    amount: Number,
    state: String,
    responseCode: String,
    paymentInstrument: mongoose.Schema.Types.Mixed,
}, {
	timestamps: true,
	strict:false
});

const PhonepeWebhook = module.exports = mongoose.model('PhonepeWebhook', PhonepeWebhookSchema);

