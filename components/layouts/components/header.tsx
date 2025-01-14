import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <>
      <div className="border-b fixed inset-x-0 z-50 bg-white">
        <div className="mx-auto max-w-5xl">
          <div className="py-4 flex justify-center ">
            <div className=" flex items-center relative h-10 w-52">
              <Image
                src="/logo-aptd.svg"
                alt="Anagrama de APTD"
                className="object-contain"
                fill
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
