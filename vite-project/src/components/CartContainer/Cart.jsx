import { getFirestore, collection, addDoc, serverTimestamp} from "firebase/firestore";
import { app } from "../../firebase";
import { ArrowLeft } from "lucide-react";
import useCart from "../../hooks/useCart";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";


    

function Cart() {
    const { cartItems, removeItem, totalItems, totalPrice, clearCart } = useCart();
    const formattedTotalPrice = totalPrice.toLocaleString();

    const handleRemoveFromCart = (itemId) => {
        removeItem(itemId);
    };

    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [email, setEmail] = useState("");
    const [metodoPago, setMetodoPago] = useState("");
    const [metodoEnvio, setMetodoEnvio] = useState("");
    

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.loading("Procesando compra...");
        createSale({
            items: cartItems,
            usuario: { nombre, apellido, mail: email },
            total: totalPrice
        })
        .then(() => {
            toast.dismiss();
            clearCart()
            toast.success("¡Gracias por su compra!");
            
            setNombre("");
            setApellido("");
            setEmail("");
            setMetodoPago("");
            setMetodoEnvio("");
        })
        .catch((error) => {
            console.error("Error al procesar la compra:", error);
            toast.error("¡Hubo un error al procesar la compra!");
        });
    };
    const createSale = async (saleDetails) => {
        const db = getFirestore(app);
        const salesCollection = collection(db, "sales");
        const sale = {
            ...saleDetails,
            metodoPago: metodoPago,
            metodoEnvio: metodoEnvio,
            fechaDeCompra: serverTimestamp()
            
        };

        try {
            const docRef = await addDoc(salesCollection, sale);
        } catch (error) {
            console.error("Error al crear el documento de venta:", error);
            throw error;
        }
    };
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
                                        <button
                        className="ml-4 text-red-500 hover:text-red-700 focus:outline-none"
                        onClick={() => handleRemoveFromCart(item.id)}
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
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
                        <form onSubmit={handleSubmit} className="w-full mx-auto rounded-lg bg-white border border-gray-200 text-gray-800 font-light mb-6">
                            <div className="w-full p-3 border-b border-gray-200">
                                <div className="mb-3 gap-4" >
                                    <label htmlFor="" className="text-gray-600 font-semibold text-sm mb-2 ml-1" >Nombre</label>
                                    <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors mb-3" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre" />
                                    <label htmlFor="" className="text-gray-600 font-semibold text-sm mb-2 ml-1">Apellido</label>
                                    <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors mb-3" value={apellido} onChange={(e) => setApellido(e.target.value)} placeholder="Apellido" />
                                    <label htmlFor="" className="text-gray-600 font-semibold text-sm mb-2 ml-1">Email</label>
                                    <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors mb-3" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />

                                </div>
                                <div className="w-full p-3">
                                    <div className="mb-3">
                                        <label htmlFor="" className="text-gray-600 font-semibold text-sm mb-2 ml-1">Metodo de pago</label>
                                        <select value={metodoPago} onChange={(e) => setMetodoPago(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors">
                                            <option value="">Seleccionar</option>
                                            <option value="tarjeta de credito">Tarjeta de Credito</option>
                                            <option value="tarjeta de debito">Tarjeta de Debito</option>
                                            <option value="efectivo">Efectivo</option>
                                        </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="" className="text-gray-600 font-semibold text-sm mb-2 ml-1">Metodo de envio</label>
                                    <select value={metodoEnvio} onChange={(e) => setMetodoEnvio(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors">
                                        <option value="">Seleccionar</option>
                                        <option value="retiro en sucursal">Retiro en sucursal</option>
                                        <option value="envio normal">Envio normal</option>
                                        <option value="envio express">Envio Express</option>
                                    </select>
                                </div>
                            </div>
                            </div>
                            <div className="w-full p-3">
                                <button className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold">Confirmar</button>
                            </div>
                        </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;