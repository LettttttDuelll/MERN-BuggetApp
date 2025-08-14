import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <div className="antialiased bg-gray-100 dark:bg-gray-100 ">
      <div className="w-full text-gray-700 bg-white dark:text-gray-200 dark:bg-gray-800">
        <div className="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">
          {/* Logo + Menu Toggle */}
          <div className="flex flex-row items-center justify-between p-4">
            <a
              href="#"
              className="text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark:text-white focus:outline-none focus:shadow-outline"
            >
              SaveMoney
            </a>
            <button
              className="rounded-lg md:hidden focus:outline-none focus:shadow-outline"
              onClick={() => setOpen(!open)}
            >
              {open ? (
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 
                    111.414 1.414L11.414 10l4.293 4.293a1 1 0 
                    01-1.414 1.414L10 11.414l-4.293 4.293a1 1 
                    0 01-1.414-1.414L8.586 10 4.293 
                    5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              ) : (
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 
                    110 2H4a1 1 0 01-1-1zM3 10a1 1 
                    0 011-1h12a1 1 0 
                    110 2H4a1 1 0 01-1-1zM9 15a1 1 
                    0 011-1h6a1 1 0 
                    110 2h-6a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              )}
            </button>
          </div>

          {/* Nav Links */}
          <nav
            className={`flex-col flex-grow pb-4 md:pb-0 md:flex md:justify-end md:flex-row ${
              open ? "flex" : "hidden"
            }`}
          >
            <a className="px-4 py-2 mt-2 text-sm font-semibold rounded-lg hover:bg-gray-200 hover:text-black md:mt-0 md:ml-4" href="#">
              Blog
            </a>
            <a className="px-4 py-2 mt-2 text-sm font-semibold rounded-lg hover:bg-gray-200 hover:text-black md:mt-0 md:ml-4" href="#">
              Portfolio
            </a>
            <a className="px-4 py-2 mt-2 text-sm font-semibold rounded-lg hover:bg-gray-200 hover:text-black md:mt-0 md:ml-4" href="#">
              About
            </a>
            <a className="px-4 py-2 mt-2 text-sm font-semibold rounded-lg hover:bg-gray-200 hover:text-black md:mt-0 md:ml-4" href="#">
              Contact
            </a>

            {/* Dropdown More */}
            <div className="relative md:ml-4">
              <button
                onClick={() => setMoreOpen(!moreOpen)}
                className="flex flex-row items-center px-4 py-2 mt-2 text-sm font-semibold rounded-lg hover:bg-gray-200 hover:text-black md:mt-0"
              >
                <span>More</span>
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  className={`inline w-4 h-4 mt-1 ml-1 transition-transform duration-200 transform ${
                    moreOpen ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 
                    011.414 0L10 10.586l3.293-3.293a1 1 0 
                    111.414 1.414l-4 4a1 1 0 
                    01-1.414 0l-4-4a1 1 0 
                    010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>

              {moreOpen && (
                <div className="absolute right-0 w-full md:max-w-screen-sm md:w-screen mt-2 origin-top-right">
                  <div className="px-2 pt-2 pb-4 bg-white rounded-md shadow-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <a className="flex items-start p-2 rounded-lg hover:bg-gray-200 hover:text-black"  href="#">
                        <div className="bg-teal-500 text-white rounded-lg p-3">
                          <svg
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            className="h-6 w-6"
                          >
                            <path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 
                            6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 
                            12l5.714-2.143L13 3z"></path>
                          </svg>
                        </div>
                        <div className="ml-3">
                          <p className="font-semibold">Appearance</p>
                          <p className="text-sm">Easy customization</p>
                        </div>
                      </a>
                      {/* Thêm các mục khác tương tự */}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
