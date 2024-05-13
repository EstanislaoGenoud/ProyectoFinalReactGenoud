import { Routes, Route } from 'react-router-dom'
import ItemListContainer from '../ItemListContainer/ItemListContainer'
import ItemDetailContainer from '../ItemDetailContainer/ItemDetailContainer'
import CartContainer from '../CartContainer/CartContainer'


function Main(){

  return(
    <main className='p-4 container mx-auto grow mi-main text-white'>
      <Routes>
        <Route path="/" element={<ItemListContainer />} />
        <Route path="/category/:category" element={<ItemListContainer />} />

        <Route path='/cart' element={<CartContainer />}/>

        <Route path='/item/:id' element={<ItemDetailContainer />}/>
      </Routes>
    </main>
  )
}

export default Main