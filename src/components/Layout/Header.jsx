import NavBar from "../NavBar/NavBar";
import { Routes, Route, Link } from "react-router-dom";
import useCategories from '../../hooks/useCategories'
import { useEffect, useState } from "react";
import { app } from "../../firebase";
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";


function Header(){
    const categories = useCategories();
    const [selectCategory, setSelectCategory] = useState(null);
    const [products, setProducts] = useState([]);
    useEffect(() => {
        if (selectCategory) {
            const fetchProducts = async () =>{
                try{
                    const db = getFirestore(app);
                    const productsCollection = collection(db, "products");
                    const querySnapshot = await getDocs(query(collection(db, "products"), where("category", "==", selectCategory)));
                    const productsData = querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id}));
                    setProducts(productsData);
                } catch (error) {
                    console.log(error);
                }
            };
            fetchProducts();
        }
    },[ selectCategory ]);
    return(
        <header className="bg-gray-800 text-white py-4">
            <div className="containerHeader flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold">StoreBike</Link>
                <Routes>
                    <Route path="/category/:category" element={
                        <input type="text" className="rounded-lg py-1 px-2 bg-gray-700 focus:outline-none focus:ring focus:border-blue-300" placeholder="Buscar" />
                    }/>
                </Routes>
                <NavBar categories={categories} onSelectCategory={setSelectCategory} />
            </div>
        </header>
    )
}
export default Header