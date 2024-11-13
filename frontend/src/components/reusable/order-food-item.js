import logo from './../../components/assets/home-background.png'
const OrderFoodItem = ({ orderNumber, productImage, productName, orderCount }) => (
  <div className="flex items-center space-x-2 mb-4">
    <p className="text-sm font-light items-center text-center w-4">{orderNumber}</p>
    <img
      alt="Product"
      // src={productImage}
      src={logo}
      className="w-8 h-8 object-cover rounded-full"
    />
    <div>
      <p className="text-xs font-light">{productName}</p>
      <p className="text-xs font-light">Захиалгын тоо: <b>{orderCount}</b></p>
    </div>
  </div>
);

export default OrderFoodItem;