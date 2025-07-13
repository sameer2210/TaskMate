export default function Button({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition duration-200 "
    >
      {children}
    </button>
  );
}
