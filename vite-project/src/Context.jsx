import { createContext, useState } from "react";

export const contexto = createContext()
const Provider = contexto.Provider

export function CarritoProvider({ children }){

  const [cantCarrito, setCantCarrito] = useState(0)
  const [precioTotal, setPrecioTotal] = useState(0)
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (cant, item) => {
    setCantCarrito((prevCantidad) => prevCantidad + cant);
  
    setCarrito([...carrito, item]);
    setPrecioTotal((prevPrecio) => prevPrecio + item.price * cant);
  };
    const vaciarCarrito = () =>{
      setCantCarrito(0)
      setCarrito([])
      setPrecioTotal(0)
    }
    const estaEnCarrito = (id) =>{
      return carrito.some((item) => item.id === id)
    }
    const cantEnCarrito = (id) =>{
      return carrito.filter((item) => item.id === id).length
    }
    const valorActual = {
      cantCarrito: cantCarrito,
      carrito: carrito,
      agregarAlCarrito: agregarAlCarrito,
      vaciarCarrito: vaciarCarrito,
      estaEnCarrito: estaEnCarrito,
      cantEnCarrito: cantEnCarrito,
      precioTotal: precioTotal
    }
    return (
      <contexto.Provider value={ valorActual }>
          {children}
      </contexto.Provider>
  );
}
export default CarritoProvider
