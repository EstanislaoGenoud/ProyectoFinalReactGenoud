import { Link } from "react-router-dom"

function ItemList({ product }) {
    const { title, imageUrl, id, price } = product
    const formattedPrice = parseFloat(price).toLocaleString();
    return (
        <div className="p-4 transition rounded-md shadow-md user-card hover:scale-105 group bg-slate-300">
            <h2 className="my-2 font-bold text-black">{title}</h2>
            <div className="overflow-hidden aspect-video"> 
                <img className="w-full  rounded-md grayscale group-hover:grayscale-0" src={imageUrl} alt={title} />
            </div>
            <p className="my-2 font-bold text-black">${formattedPrice}</p>
            <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" to={`/item/${id}`}>Ver más</Link>
        </div>
    )
}
export default ItemList