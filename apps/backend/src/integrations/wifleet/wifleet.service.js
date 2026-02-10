const axios = require("axios");

exports.sendOrder = async (order) => {

    await axios.post(process.env.WIFLEET_URL, {

        orderId: order._id,
        amount: order.totalAmount,
        items: order.items,
        customer: order.customer

    });
};
