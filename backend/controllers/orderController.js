import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// Placing user order
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address,
      payment: true, // Mark as paid by default since Stripe is removed
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({
      success: true,
      message: "Order placed successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("Place Order Error:", error.message, error.stack);
    res.json({
      success: false,
      message: error.message || "An error occurred while placing the order.",
    });
  }
};

// Verify order status (still keeping for compatibility)
const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    const order = await orderModel.findById(orderId);

    if (!order) {
      return res.json({ success: false, message: "Order not found" });
    }

    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Order marked as paid" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Order cancelled" });
    }
  } catch (error) {
    console.error("Verify Order Error:", error.message, error.stack);
    res.json({ success: false, message: "An error occurred during verification" });
  }
};

// Get orders for a specific user
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error("User Orders Error:", error.message, error.stack);
    res.json({ success: false, message: "Failed to fetch user orders" });
  }
};

// List all orders for admin
const listOrders = async (req, res) => {
  try {
    const user = await userModel.findById(req.body.userId);
    if (user && user.role === "admin") {
      const orders = await orderModel.find({});
      res.json({ success: true, data: orders });
    } else {
      res.json({ success: false, message: "Unauthorized: Admin only" });
    }
  } catch (error) {
    console.error("List Orders Error:", error.message, error.stack);
    res.json({ success: false, message: "Failed to fetch orders" });
  }
};

// Admin updates order status
const updateStatus = async (req, res) => {
  try {
    const user = await userModel.findById(req.body.userId);
    if (user && user.role === "admin") {
      await orderModel.findByIdAndUpdate(req.body.orderId, {
        status: req.body.status,
      });
      res.json({ success: true, message: "Status updated successfully" });
    } else {
      res.json({ success: false, message: "Unauthorized: Admin only" });
    }
  } catch (error) {
    console.error("Update Status Error:", error.message, error.stack);
    res.json({ success: false, message: "Failed to update status" });
  }
};

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };
