import { ArrowLeft } from "lucide-react";
import useCart from "../../hooks/useCart";
import { Link } from "react-router-dom";

function Cart() {
    const { cartItems, totalItems, totalPrice } = useCart();
    const formattedTotalPrice = totalPrice.toLocaleString();
    return (
        <div className="min-w-screen min-h-screen bg-gray-50 py-5">
            <div className="px-5">
                <div className="mb-2 flex items-center">
                    <Link to="/"><ArrowLeft className="text-gray-400 mr-1" /></Link>
                    <Link to="/" className="focus:outline-none hover:underline text-gray-500">Back</Link>
                </div>
                <div className="mb-2">
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-600">Carrito de compras.</h1>
                </div>
                <div className="mb-5 text-gray-400 flex items-center">
                    <div className="mr-2">
                        <Link to="/" className="focus:outline-none hover:underline text-gray-500">Inicio</Link>
                    </div>
                    <div className="mr-2">
                        <span>/</span>
                    </div>
                    <div>
                        <Link to="/cart" className="focus:outline-none hover:underline text-gray-500">Carrito</Link>
                    </div>
                </div>
            </div>
            <div className="w-full bg-white border-t border-b border-gray-200 px-5 py-10 text-gray-800">
                <div className="w-full">
                    {cartItems.map((item) => (
                        <div key={item.id} className="-mx-3 md:flex items-start">
                            <div className="px-3 md:w-7/12 lg:pr-10">
                                <div className="w-full mx-auto text-gray-800 font-light mb-6 border-b border-gray-200 pb-6">
                                    <div className="w-full flex items-center">
                                        <div className="overflow-hidden rounded-lg w-16 h-16 bg-gray-50 border border-gray-200">
                                            <img src={item.imageUrl} alt={item.title} />
                                        </div>
                                        <div className="flex-grow pl-6">
                                            <h6 className="font-semibold uppercase text-gray-600">{item.title}</h6>
                                            <p className="text-gray-400">Cantidad: {item.quantity}</p>
                                        </div>
                                        <div className="flex justify-between flex-grow">
                                            <span className="font-semibold text-gray-600 text-xl">${item.price.toLocaleString()}</span>
                                            <br />
                                            <span className="font-semibold text-gray-600 text-xl">${(item.price * item.quantity).toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="w-full flex justify-end">
                        <div className="px-3 md:w-5/12">
                            <div className="mb-6 pb-6 border-gray-200">
                                <div className="-mx-2 flex items-end justify-end">
                                    <div className="flex-grow px-2 lg:max-w-xs">
                                        <label htmlFor="" className="text-gray-600 font-semibold text-sm mb-2 ml-1">Codigo de Descuento</label>
                                        <div>
                                            <input
                                                type="text"
                                                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" 
                                                placeholder="XXXXXX"
                                            />
                                        </div>
                                    </div>
                                    <div className="px-2">
                                        <button className="block w-full max-w-xs mx-auto border border-transparent bg-gray-400 hover:bg-gray-500 focus:bg-gray-500 text-white rounded-md px-5 py-2 font-semibold">Aplicar</button>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-6 pb-6 border-b border-gray-200 text-gray-800">
                                <div className="w-full flex mb-3 items-center">
                                    <div flex-grow>
                                        <span className="font-semibold text-xl">Total</span>
                                    </div>
                                    <div className="pl-3 text-xl">{totalItems} items - ${formattedTotalPrice}</div>
                                </div>
                            </div>
                            <div className="">
                        <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 text-gray-800 font-light mb-6">
                            <div className="w-full p-3 border-b border-gray-200">
                                <div className="w-full p-3">
                                    <div className="mb-3">
                                        <label htmlFor="" className="text-gray-600 font-semibold text-sm mb-2 ml-1">Metodo de pago</label>
                                        <select className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors">
                                            <option value="">Seleccionar</option>
                                            <option value="1">Tarjeta de Credito</option>
                                            <option value="2">Tarjeta de Debito</option>
                                            <option value="3">Efectivo</option>
                                        </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="" className="text-gray-600 font-semibold text-sm mb-2 ml-1">Metodo de envio</label>
                                    <select className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors">
                                        <option value="">Seleccionar</option>
                                        <option value="1">Retiro en sucursal</option>
                                        <option value="2">Envio normal</option>
                                        <option value="3">Envio Express</option>
                                    </select>
                                </div>
                            </div>
                            </div>
                            <div className="w-full p-3">
                                <button className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold">Confirmar</button>
                            </div>
                        </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;