import Order from '../modules/orderModule.js';
import User from '../modules/userModule.js';
import { sendOrderEmail} from '../Utils/emailServices.js';


export const createOrder = async (userId, orderData) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');

  const totalAmount = orderData.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const order = await Order.create({
    user: user._id,
    items: orderData.items,
    totalAmount,
    address: orderData.address,
  });

  // send email
  await sendOrderEmail(user, order);

  return order;
};


export const getAllOrders = async () => {
  return await Order.find().populate('user', 'name email');
};


export const getOrderById = async (id, user) => {
  const order = await Order.findById(id).populate('user', 'name email');
  if (!order) throw new Error('Order not found');

  if (user.role !== 'admin' && order.user._id.toString() !== user._id.toString()) {
    throw new Error('Not authorized to view this order');
  }

  return order;
};


export const updateOrderStatus = async (id, status) => {
  const order = await Order.findByIdAndUpdate(id);
  if (!order) throw new Error('Order not found');

  order.status = status;
  await order.save();
  return order;
};


export const deleteOrder = async (id) => {
  const order = await Order.findByIdAndDelete(id);
  if (!order) throw new Error('Order not found');

  await order.deleteOne();
  return { message: 'Order deleted successfully', deleteOrder };
};



export const cancelOrderService = async (userId, orderId) => {
  const order = await Order.findOne({ _id: orderId, user: userId });
  if (!order) throw new Error('Order not found');

  if (order.status === 'Cancelled') throw new Error('Order already cancelled');

  // Update order status
  order.status = 'Cancelled';
  await order.save();

  // Fetch user
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');

  // Send email notification
  await sendOrderCancelledEmail(user, order);

  return order;
};
