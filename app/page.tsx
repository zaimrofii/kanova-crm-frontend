import Image from "next/image";
import Link from "next/link";

export const MainPage: React.FC = () => {
  return (
    <>
      <div className="bg-wite text-gray-800">
        <div className="w-full absolute h-15 shadow border-b border-gray-200"></div>
        <div className="h-[100vh] w-[80%] mx-auto flex justify-between items-center ">
          <div className="w-[45%] h-auto flex flex-col justify-center items-start gap-2  text-[4vw] -tracking-[3px]">
            <h1 className="leading-tight">Turn Customer Data into</h1>
            <h1 className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
              Sales Success
            </h1>
            <p className="text-lg tracking-[0]">
              Leverage every customer interaction to boost sales, build loyalty,
              and grow your business with smart data-driven strategies that make
              a real difference.
            </p>
            <Link href="contact">
              <button className=" rounded py-3 px-20 hover:scale-103 transition text-white cursor-pointer font-semibold bg-transparent bg-gradient-to-r from-blue-500 to-purple-500 mt-5 text-xl  tracking-[0]">
                {" "}
                Klik to Continue!
              </button>
            </Link>
          </div>
          <div className="h-auto w-[50%] relative -mt-10">
            <Image
              src="/contact.jpg"
              alt="Hero Image"
              width={500}
              height={500}
              className="object-cover w-full h-full rounded shadow-xl"
            />
            <div className="w-[15vw] absolute -bottom-25 right-5  ">
              {" "}
              <Image
                src="/detail1.jpg"
                alt="Hero Image"
                width={500}
                height={500}
                className="object-cover w-full h-full rounded shadow-xl"
              />
            </div>
            <div className="w-[15vw] absolute -bottom-25 left-25 ">
              {" "}
              <Image
                src="/detail2.jpg"
                alt="Hero Image"
                width={500}
                height={500}
                className="object-cover w-full h-full rounded shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default MainPage;
