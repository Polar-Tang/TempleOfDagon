import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 relative">
      <div className="max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-8">
        <div>
          <h2 className="text-xl font-semibold font-burtonNT  flex items-center">
            <span className="mr-2">⚡</span>The Esoteric Order of Dagon
          </h2>
          <p className="text-gray-400 text-sm mt-2">
            The Esoteric Order of Dagon has decided to be less exoteric and share our vision about the world and the importance of the necromancy. Contribute to our mission and help us to invoke the lower legions of the other gods, then our power will have no limits.
          </p>
        </div>

        <div>
          <h3 className="text-md font-semibold mb-3">Products</h3>
          <ul className="text-gray-400 space-y-2 text-sm">
            <li>Magic</li>
            <li>Stone</li>
            <li>Art</li>
            <li>Others</li>
          </ul>
        </div>

        <div>
          <h3 className="text-md font-semibold mb-3">Features</h3>
          <ul className="text-gray-400 space-y-2 text-sm">
            <li>
              <Link to="/questionarie">
                Sould sacrifice volunteer
              </Link>
            </li>

          </ul>
        </div>

        <div>
          <h3 className="text-md font-semibold mb-3">Explore</h3>
          <ul className="text-gray-400 space-y-2 text-sm">
            <li>
              <Link to="/about">
                About us
              </Link>
            </li>
            <li>
            <Link to="/contact">
                Contact us
              </Link>
            </li>

          </ul>
        </div>
      </div>

      <div className="text-center text-gray-500 text-sm mt-8">
        Esoteric Order Of Dagon © 2025
      </div>
    </footer>
  );
};

export default Footer;
