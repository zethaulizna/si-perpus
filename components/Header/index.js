import React from 'react'
import Link from 'next/link';

const Header = () => {
  return (
  <div className="bg-sky-500
  w-full h-16 shadow-lg">
    <Link href="/">
    <h1
    className="text-white text-3xl
    text-center pt-3 font-semibold">
    SI Perpustakaan
    </h1>
    </Link>
  </div>
  );
};

export default Header;