import { useEffect, useState } from "react"
import { app } from "../../firebase"
import { getFirestore, getDocs, collection, query, where } from "firebase/firestore"
import {  useParams } from "react-router-dom"
import ItemList from "../ItemListContainer/ItemList"
import useCategories from "../../hooks/useCategories"

function ItemListContainer(){
  const [products, setProducts] = useState([]);
  const params = useParams();
  const { category } = params;

  const categories = useCategories();

  useEffect(() => {
    const fetchProducts = async () => {
      const db = getFirestore(app);
      const productsCollection = collection(db, "products");
      let q = productsCollection;
    
      if (category) {
        q = query(productsCollection, where("category", "==", category.toLowerCase()));
      }
    
      const querySnapshot = await getDocs(q);
      const productsData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setProducts(productsData);
    };

    if (categories.length > 0) {
      fetchProducts();
    }
  }, [category, categories]);

  return (
    // <section>
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 users"> 
      {products.map((product) => {
        return <ItemList key={product.id} product={product} />;
      })}
    </section>
  );
}

export default ItemListContainer