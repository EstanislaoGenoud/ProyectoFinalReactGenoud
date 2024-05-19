import { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "../firebase";

function useCategories(){
    const [categories, setCategories] = useState([])
    useEffect(() => {
        const fetchCategories = async () => {
            const db = getFirestore(app);
            const categoriesCollection = collection(db, "categories");
            const snapshot = await getDocs(categoriesCollection);
            const categoriesData = snapshot.docs.map(doc => ({...doc.data(), id: doc.id}));
            setCategories(categoriesData);
        }
        fetchCategories();
    }, [])
    return categories
}
export default useCategories