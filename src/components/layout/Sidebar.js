import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Sidebar() {
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const pathname = usePathname();
  const user = session?.user;

  useEffect(() => {
    setIsClient(true); // helps prevent hydration errors
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 768);
    };
    checkScreenSize(); // run once
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const navItems = [
    { name: "Home", href: "/" },
    ...(user
      ? [
          { name: "Dashboard", href: "/dashboard" },
          { name: "Settings", href: "/settings" },
          { name: "Activity", href: "/activity" },
          { name: "Profile", href: "/profile" },
        ]
      : []),
  ];

  const sidebarVariants = {
    hidden: { x: "-100%", opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0 },
  };

  const linkVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <>
      {/* Mobile toggle button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        className="md:hidden fixed top-4 left-4 z-50 text-white bg-emerald-950 p-2 rounded-lg shadow-lg"
        onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </motion.button>

      {/* AnimatePresence only used after mount to avoid SSR mismatch */}
      {isClient && (
        <AnimatePresence>
          {(isMobileMenuOpen || isLargeScreen) && (
            <motion.aside
              key="sidebar"
              variants={sidebarVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ type: "spring", stiffness: 80, damping: 15 }}
              className="w-64 h-screen bg-gradient-to-r from-emerald-950 to-gray-900 text-white fixed md:relative z-40 md:z-10 shadow-2xl"
            >
              <div className="p-6 text-2xl font-extrabold border-b border-indigo-700 tracking-tight">
                TaskMate
              </div>

              <nav className="flex flex-col space-y-2 mt-4 px-4">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    variants={linkVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block px-4 py-2 rounded-md transition-all duration-300 text-sm font-medium ${
                        pathname === item.href
                          ? "bg-gray-100 text-black shadow-md"
                          : "text-gray-300 hover:bg-gray-950 hover:text-white"
                      }`}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </motion.aside>
          )}
        </AnimatePresence>
      )}
    </>
  );
}
