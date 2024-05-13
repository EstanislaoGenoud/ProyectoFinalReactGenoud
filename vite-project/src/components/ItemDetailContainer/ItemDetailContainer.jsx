import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFirestore, doc, getDoc} from "firebase/firestore";
import { app } from "../../firebase";
import ItemDetail from "./ItemDetail";

function ItemDetailContainer() {
    const [product, setProduct] = useState({});

    const { id } = useParams();

    useEffect(() =>{
        const db = getFirestore(app);
        const productRef = doc(db, "products", id);
        getDoc(productRef).then((snapshot) => {
            if (snapshot.exists()) {
                const productData = { id: snapshot.id, ...snapshot.data() };
                setProduct(productData);
            } else {
                console.log("El producto no existe");
            }
        }).catch((error) => {
            console.error("Error al obtener el producto:", error);
        });
    }, [id]);

    return (
        <>
            <ItemDetail product={product} />
        </>
    )
}

export default ItemDetailContainer