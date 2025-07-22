export default function Button({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="relative inline-flex items-center justify-center px-6 py-2 overflow-hidden font-medium text-white transition-all duration-300 ease-out rounded-lg shadow-md bg-gradient-to-r from-black to-gray-900 hover:from-gray-800 hover:to-black hover:scale-105 focus:outline-none"
    >
      <span className="absolute inset-0 w-full h-full transform scale-0 bg-white opacity-10 rounded-full group-hover:scale-100 transition-transform duration-500 ease-out"></span>
      <span className="relative z-10">{children}</span>
    </button>
  );
}
