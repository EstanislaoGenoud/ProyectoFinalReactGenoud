import { useContext, useState, useEffect } from "react";
import { CartContext } from "../../CartContext";
import { getFirestore, doc, getDoc,getDocs, collection} from "firebase/firestore";
import { app } from "../../firebase";
import {  toast } from 'react-toastify';


export default function Counter(props) {
    const { addToCart } = useContext(CartContext);

    const [counterValue, setCounterValue] = useState(0);
    const [confirmed, setConfirmed] = useState(false);
    const [product, setProduct] = useState(null);

    
    useEffect(() => {
        const fetchProduct = async () => {
            const db = getFirestore(app);
            const productsCollection = collection(db, "products");
    
            try {
                if (props.product && props.product.id) {
                    const productDoc = doc(productsCollection, props.product.id);
                    const productSnapshot = await getDoc(productDoc);
                    if (productSnapshot.exists()) {
                        setProduct(prevProduct => productSnapshot.data());
                    } else {
                        console.log("El producto no existe");
                    }
                } else {
                    const querySnapshot = await getDocs(productsCollection);
                    if (!querySnapshot.empty) {
                        const firstDoc = querySnapshot.docs[0];
                        setProduct(prevProduct => ({ id: firstDoc.id, ...firstDoc.data() }));
                    } else {
                        console.log("No hay productos en la colección");
                    }
                }
            } catch (error) {
                console.log("Error al obtener el producto", error);
            }
        };
        fetchProduct();
    }, []);

    const handleConfirm = () => {
        if (counterValue > 0) {
            setConfirmed(true); 
        }
    };

    const handleAddToCart = () => {
        if (counterValue > 0) {
            addToCart({ ...props.product, quantity: counterValue });
            setCounterValue(0);
            
            toast.success('¡Producto agregado al carrito!', {
                position:"top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };
    const increment = () => setCounterValue(prevValue => prevValue + 1);

    const decrement = () => {
        if (counterValue > 0) {
            setCounterValue(prevValue => prevValue - 1);
        }
    };

    return (
        <div className="mt-2">
            <div className="flex flex-row h-10 w-full rounded-lg relative -bg-transparent mt-1">
                <button onClick={decrement} className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none">
                    <span className="m-auto text-2xl font-thin">-</span>
                </button>
                <p className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-10 p-1 m-auto text-2xl">{counterValue}</p>
                <button onClick={increment} className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer">
                    <span className="m-auto text-2xl font-thin">+</span>
                </button>
            </div>
            {counterValue > 0 && !confirmed && (
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full mt-2" onClick={handleConfirm}>Confirmar</button>
            )}
            {confirmed && (
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-full mt-2" onClick={handleAddToCart}>Añadir al carrito</button>
            )}
        </div>
    );
}