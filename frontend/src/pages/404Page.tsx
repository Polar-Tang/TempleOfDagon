import { Link } from "react-router-dom"
import { ArrowLeft } from 'lucide-react';

const FourOFourPage = ({title, description, redir}: {title: string | undefined, description: string | undefined, redir: string | undefined}) => {
    return (
        <div className="h-dvh w-screen bg-black text-white">
            <header className="border-b border-gray-800 top-0 w-full h-15 relative">
            </header>

            <div className="relative bg-[url(/images/banner.png)] md:bg-[url(/images/md_banner.png)] bg-cover bg-no-repeat w-full h-full flex flex-col items-center justify-center">
                <Link to={`${redir ? redir : "/"}`} className="absolute top-0 left-4 transform  text-white text-xl font-bold z-10">
                <span>
                    <ArrowLeft className="inline" />
                </span>  
                <span>
                Back
                </span>
                </Link>
                <div className="absolute h-full w-full bg-gradient-to-b from-transparent to-black z-0"></div>


                <h1 className="text-center text-white text-6xl font-burtonNT z-10">
                    {title ? title : "Not Found"}
                </h1>

                <div className="text-center text-white text-lg z-10 mt-4">
                    {description ? description : "Page not found."}
                </div>
            </div>
        </div>
    )
}

export default FourOFourPage