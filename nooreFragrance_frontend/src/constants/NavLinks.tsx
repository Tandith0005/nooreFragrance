import { HiOutlineShoppingBag, HiOutlineHeart, HiOutlineUser, HiMail } from "react-icons/hi";

export const navLinks = [
  { href: "/shop", label: "Shop", icon: <HiOutlineShoppingBag className="w-4 h-4" /> },
  { href: "/about", label: "About", icon: <HiOutlineHeart className="w-4 h-4" /> },
  { href: "/contact", label: "Contact", icon: <HiMail /> },
];

export const navAuthLinks = [
  { href: "/login", label: "Login", icon: <HiOutlineUser className="w-4 h-4" /> },
  { href: "/register", label: "Register", icon: null },
];