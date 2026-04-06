// var admin = require("firebase-admin");
// var serviceAccountGodachi = require("../godachi-service-account-credentials.json");

// var godachiapp = admin.initializeApp({
// 	credential: admin.credential.cert(serviceAccountGodachi)
// });

const notification_options = {
	priority: "high",
	timeToLive: 60 * 60 * 24
};

// const sendFcmNotification = async (registrationToken, message, dry_run = false) => {
// 	var options = notification_options;
// 	if (dry_run) {
// 		options.dryRun = true;
// 	}
// 	try {
// 		var response = await godachiapp.messaging().sendToDevice(registrationToken, message, options);
// 		return response;
// 	} catch (error) {
// 		return false;
// 	}

// }

exports.sendWelcomeFcmNotification = async (token) => {
	var title = "Welcome to Godachi";
	var body = "Welcome and congrats on becoming the part of the Godachi family. You have successfully registered on our platform.";
	var message_notification = {
		notification: {
			title: title,
			body: body
		},
		data: {
			title: title,
			message: body
		}
	};
	await sendFcmNotification(token, message_notification);

}

exports.sendOrderPlaceFcmNotification = async (token, orderId) => {
	var title = "Order Placed Successfully";
	var body = `Congratulations, Your orderID #${orderId} is successfully placed. We will ship your order in 48 hours.`;
	var message_notification = {
		notification: {
			title: title,
			body: body
		},
		data: {
			title: title,
			message: body
		}
	};
	await sendFcmNotification(token, message_notification);

}
exports.cancelOrderFcmNotification = async (token, orderId) => {
	var title = "Order Cancelled Successfully";
	var body = `We are sorry but your orderID #${orderId} has been cancelled. We're sorry this order didn't work for you. But we hope we'll sey you again.`;
	var message_notification = {
		notification: {
			title: title,
			body: body
		},
		data: {
			title: title,
			message: body
		}
	};
	await sendFcmNotification(token, message_notification);

}
exports.dispatchOrderFcmNotification = async (token, orderId) => {
	var title = "Order Dispatched";
	var body = `Your Godachi package with orderID #${orderId} has been dispatched successfully. Soon it will be delivered to your doorstep.`;
	var message_notification = {
		notification: {
			title: title,
			body: body
		},
		data: {
			title: title,
			message: body
		}
	};
	await sendFcmNotification(token, message_notification);

}
exports.deliveredOrderFcmNotification = async (token, orderId) => {
	var title = "Order Delivered";
	var body = `Your Godachi package with orderID #${orderId} has been delivered successfully.`;
	var message_notification = {
		notification: {
			title: title,
			body: body
		},
		data: {
			title: title,
			message: body
		}
	};
	await sendFcmNotification(token, message_notification);

}
exports.returnOrderFcmNotification = async (token, orderId) => {
	var title = "Return Request Approved";
	var body = `Your return request with returnID #${orderId} has been approved. We will pick up the tags intact originally delivered item within 72 hours.`;
	var message_notification = {
		notification: {
			title: title,
			body: body
		},
		data: {
			title: title,
			message: body
		}
	};
	await sendFcmNotification(token, message_notification);

}
exports.refundOrderFcmNotification = async (token, orderId, amount) => {
	var title = "Refund Processed";
	var body = `Your refund of INR ${amount} for returnID #${orderId} has been processed. It will be credited in your original payment source account within 10 working days.`;
	var message_notification = {
		notification: {
			title: title,
			body: body
		},
		data: {
			title: title,
			message: body
		}
	};
	await sendFcmNotification(token, message_notification);

}