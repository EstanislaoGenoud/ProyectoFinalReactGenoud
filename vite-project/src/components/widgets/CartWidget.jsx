import { ShoppingCart } from "lucide-react";
import { useContext } from "react";
import { CartContext } from "../../CartContext";
import { Link } from "react-router-dom";

function CartWidget({ counterValue }) {
  const { totalItems } = useContext(CartContext); 
  return (
    <Link to="/cart" className="relative">
      <span className="flex items-center">
        <ShoppingCart width={30} height={30} className="text-white" />
        <span className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs absolute -top-1 -right-1">
          {totalItems}
        </span>
      </span>
    </Link>
  );
}

export default CartWidget;