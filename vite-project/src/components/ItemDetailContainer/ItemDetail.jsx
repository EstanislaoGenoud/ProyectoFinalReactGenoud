import Counter from "../widgets/Counter"
function ItemDetail({ product }) {
    const { title, imageUrl, id, price, description } = product
    const formattedPrice = parseFloat(price).toLocaleString();
    return (
        <>
            <h1 className="text-4xl font-bold mb-4 border-b">Detalles del producto</h1>
            <section className="flex gap-8">
                <div className="w-1/3">
                    <h2 className="text-3xl  mb-4 border-b">{title}</h2>
                    <div className="mt-10 lg:mt-12">
                        <img className="w-full rounded-xl shadow-2xl" src={imageUrl} alt={title} />
                        <div className="text-black rounded-xl p-4 mb-4 mt-4">
                            <p className="text-2xl mb-4 border-b">Descripción:</p>
                            <p className="text-xl">{description}</p>
                        </div>
                    </div>
                </div>
                <div className="w-2/3">
                    <div className="ml w-1/3">
                        <h2 className="text-3xl mb-4 border-b">Precio:</h2>
                        <p className="text-2xl mb-4 border-b">${formattedPrice}</p>
                        <div className="flex flex-col items-center">
                            <Counter product={product}/>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ItemDetail