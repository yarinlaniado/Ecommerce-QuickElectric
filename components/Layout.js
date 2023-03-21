import { useContext } from "react";
import Footer from "./Footer";
import { ProductContext } from "./ProductContext";

export default function Layout({ children }) {
  const { success, setSuccess } = useContext(ProductContext);
  return (
    <div className="lg:flex flex-col justify-center items-center space mt-1">
      <title>QuickElectric</title>
      <h1 className=" mb-4  font-extrabold text-emerald-400  text-5xl lg:text-6xl text-center ">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 ">
          QuickElectric
        </span>
      </h1>
      <h3 className="mb-4 text-2xl font-extrabold text-emerald-400  md:text-4xl lg:text-5xl text-center">
        We are here for you.
      </h3>
      {success && (
        <div
          className=" bg-emerald-100 border border-emerald-400 text-emerald-700 px-10 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold align-text-bottom">
            Order created!
          </strong>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3 justify-center">
            <svg
              className="fill-current h-6 w-6 text-emerald-500 "
              role="button"
              onClick={() => {
                setSuccess(false);
              }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </span>
        </div>
      )}

      <div className="p-5">{children}</div>
      <Footer />
    </div>
  );
}
