import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <section className="flex items-center justify-center flex-col p-8 h-[100vh] bg-[#FFF3E3]">
            <h2 className="min-[320px]:text-[60px] sm:text-[70px] md:text-[80px] lg:text-[90px] font-extrabold tracking-wide">404</h2>
            <p className=" mt-2 mb-1 font-medium text-[18px] lg:text-[20px] text-primary-color">Page Not Found</p>
            <p className="font-medium text-[16px] md:text-[18px] lg:text-[20px] mb-4 lg:mb-8 text-center ">Sorry, the page you requested could not be found</p>
            <Link className="text-color-white rounded-lg px-8 py-2 bg-primary-color" to='/'>Go back Home</Link>
        </section>
    );
};

export default NotFound;
