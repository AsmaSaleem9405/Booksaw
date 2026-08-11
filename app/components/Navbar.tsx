import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter, FaPinterestP } from 'react-icons/fa';
import { FiShoppingBag, FiSearch, FiMenu } from 'react-icons/fi';

export default function Navbar() {
  return (
    <header className="w-full bg-[#f4f1ea] border-b border-[#e6e2d6] text-[#222]">
      {/* Top Bar: Socials & Cart/Search (Account option removed) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between text-xs text-gray-600 border-b border-[#e6e2d6]/50">
        <div className="flex items-center space-x-4">
          <a href="#facebook" aria-label="Facebook" className="hover:text-black transition"><FaFacebookF /></a>
          <a href="#instagram" aria-label="Instagram" className="hover:text-black transition"><FaInstagram /></a>
          <a href="#linkedin" aria-label="LinkedIn" className="hover:text-black transition"><FaLinkedinIn /></a>
          <a href="#twitter" aria-label="Twitter" className="hover:text-black transition"><FaTwitter /></a>
          <a href="#pinterest" aria-label="Pinterest" className="hover:text-black transition"><FaPinterestP /></a>
        </div>
        
        <div className="flex items-center space-x-6">
          <Link href="/cart" className="flex items-center space-x-1 hover:text-black transition">
            <FiShoppingBag className="text-sm" />
            <span>CART: (0$)</span>
          </Link>
          <button aria-label="Search" className="flex items-center space-x-1 hover:text-black transition">
            <FiSearch className="text-sm" />
            <span>SEARCH</span>
          </button>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="text-2xl font-serif tracking-widest font-bold uppercase text-black">
          BookSaw
        </Link>

        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium tracking-wider">
          <Link href="/" className="text-[#b8860b] hover:text-[#b8860b] transition">HOME</Link>
          <Link href="/about" className="hover:text-[#b8860b] transition">ABOUT</Link>
          <Link href="/pages" className="hover:text-[#b8860b] transition">PAGES</Link>
          <Link href="/shop" className="hover:text-[#b8860b] transition">SHOP</Link>
          <Link href="/articles" className="hover:text-[#b8860b] transition">ARTICLES</Link>
          <Link href="/contact" className="hover:text-[#b8860b] transition">CONTACT</Link>
        </nav>

        <div className="flex items-center md:hidden">
          <button aria-label="Open Menu" className="text-2xl text-gray-800 focus:outline-none">
            <FiMenu />
          </button>
        </div>
      </div>
    </header>
  );
}