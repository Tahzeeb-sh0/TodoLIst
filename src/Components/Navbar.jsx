function Navbar() {
  return (
    <>
      <nav className="flex shadow-xl justify-between bg-purple-800 p-4 w-full">
        <h1 className="text-2xl font-bold select-none">iTask</h1>
        <div className="flex space-x-5 text-center">
           <p className="cursor-pointer hover:font-[600] select-none">About</p>
           <p className="cursor-pointer hover:font-[600] select-none ">Contact</p>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
