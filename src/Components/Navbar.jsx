function Navbar() {
  return (
    <>
      <nav className="flex shadow-xl justify-between bg-purple-700 p-4 w-full">
        <h1 className="text-2xl font-bold">iTodo</h1>
        <div className="flex space-x-5 text-center">
           <p className="cursor-pointer hover:font-[600]">About</p>
           <p className="cursor-pointer hover:font-[600] ">Contact</p>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
