import Link from "next/link";

const Navbar = () => {
  return (
    <>
      <div className="p-5 border-b-2 border-gray-100">
        <nav className="flex justify-between">
          <Link href="/" className="font-bold text-lg">
            <span className="uppercase font-extrabold cursor-pointer">
              Pasal
            </span>
          </Link>

          <Link href="/auth" className="btn">
            Auth
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
