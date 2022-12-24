import Link from "next/link";
import React from "react";
import ThemeSwitch from "./ThemeSwitch";
import { ConnectKitButton } from "connectkit";

const Header = ({ setCurrentTheme }: any) => {
  return (
    <div className="sticky top-0 z-20 py-2 bg-white md:py-6 md:mb-6 dark:bg-black">
      <div className="container flex items-center justify-between px-4 mx-auto lg:max-w-4xl">
        <Link
          href="/"
          className={
            "font-medium tracking-wider transition-colors text-gray-900 hover:text-sky-500 uppercase dark:text-white border-0"
          }
        >
          Smart View
        </Link>
        <div className="flex items-center justify-center">
          <ConnectKitButton />
          {/* <Link href='/blog' className="ml-4 ">
                    Login
                    </Link> */}
          {/* <Link href='/projects' className="ml-4 ">Projects</Link> */}
          <ThemeSwitch setCurrentTheme={setCurrentTheme} />
        </div>
      </div>

      <div></div>
    </div>
  );
};

export default Header;
