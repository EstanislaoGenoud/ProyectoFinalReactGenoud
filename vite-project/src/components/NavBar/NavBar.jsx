import { Link } from "react-router-dom";
import { MenuIcon } from "lucide-react";
import CartWidget from "../widgets/CartWidget";
import { useEffect, useState, useRef } from "react";
import  useCart  from "../../hooks/useCart";

function NavBar({ categories, onSelectCategory }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [totalItems, setTotalItems] = useState(0);
    const menuRef = useRef(null);
    const dropdownRef = useRef(null);
    const cartRef = useRef(null);
    const { cartItems, totalItems: cartTotalItems } = useCart() || {};




    useEffect(() => {
        if (cartItems) {
            setTotalItems(cartTotalItems);
        }
    }, [cartItems, cartTotalItems]);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
    const toggleCart = () => setIsCartOpen(!isCartOpen);
    const closeMenu = () => setIsMenuOpen(false);
    const closeDropdown = () => setIsDropdownOpen(false);
    const closeCart = () => setIsCartOpen(false);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                menuRef.current && !menuRef.current.contains(event.target) &&
                dropdownRef.current && !dropdownRef.current.contains(event.target) &&
                cartRef.current && !cartRef.current.contains(event.target)
            ) {
                setIsMenuOpen(false);
                setIsDropdownOpen(false);
                setIsCartOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <header>
            <nav className="relative flex justify-between items-center gap-4">
                <div className="hidden md:flex items-center gap-4">
                    <Link to="/" className="text-white text-lg font-bold">Inicio</Link>
                    <div className="relative inline-block text-left" ref={dropdownRef}>
                        <div>
                            <button type="button" className="inline-flex w-full justify-center gap-x-1.5 rounded-md text-white px-3 py-2 text-lg font-bold" aria-haspopup="true" aria-expanded={isDropdownOpen ? 'true' : 'false'} id="menu-button" onClick={toggleDropdown}>
                                Catálogo
                                <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd"></path>
                                </svg>
                            </button>
                        </div>
                        <div className={`absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${isDropdownOpen ? '' : 'hidden'}`} role="menu" aria-orientation="vertical" aria-labelledby="menu-button">
                            <div className="py-1" role="none">
                                {categories.map(category => (
                                    <Link to={`/category/${category.category}`} key={category.id} className="text-gray-700 block px-4 py-2 text-lg font-bold" role="menuitem" onClick={() => { onSelectCategory(category); closeDropdown(); }}>{category.category}</Link>
                                ))}
                            </div>
                        </div>
                    </div>
                    <Link to="/contact" className="text-white text-lg font-bold">Contacto</Link>
                </div>
                <div className="relative">
                    <MenuIcon width={30} height={30} className="md:hidden text-white" onClick={toggleMenu} />
                    {isMenuOpen && (
                        <div className="fixed top-0 left-0 w-full h-full   bg-black bg-opacity-50 z-10" onClick={closeMenu}>
                            <div className={` md:-left-full fixed bg-white top-0 flex flex-col gap-4 w-1/3 transition-all duration-400 h-full ${isMenuOpen ? 'left-0' : '-left-full'}`}>
                                <Link to="/" className="text-black text-lg font-bold" onClick={closeMenu}>Inicio</Link>
                                <Link to="/category/all" className="text-black text-lg font-bold" onClick={closeMenu}>Catálogo</Link>
                                <Link to="/contact" className="text-black text-lg font-bold" onClick={closeMenu}>Contacto</Link>
                            </div>
                        </div>
                        
                    )}
                </div>
                <div className="flex items-center gap-4">
                    <CartWidget totalItems={totalItems} />
                </div>
            </nav>
            
        </header>
    )
}

export default NavBar;