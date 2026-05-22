import { HiOutlineShoppingBag, HiOutlineHeart, HiOutlineUser } from "react-icons/hi";

export const navLinks = [
  { href: "/shop", label: "Shop", icon: <HiOutlineShoppingBag className="w-4 h-4" /> },
  { href: "/collection", label: "Collection", icon: <HiOutlineHeart className="w-4 h-4" /> },
  { href: "/about", label: "About", icon: null },
];

export const navAuthLinks = [
  { href: "/login", label: "Login", icon: <HiOutlineUser className="w-4 h-4" /> },
  { href: "/register", label: "Register", icon: null },
];