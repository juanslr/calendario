export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold text-purple-400">RandomCord</h1>
        <div>
          <a
            href="https://randomcord.es"
            className="text-white hover:text-purple-400 py-2 px-4 transition duration-300"
          >
            Inicio
          </a>
        </div>
      </div>
    </nav>
  );
}
