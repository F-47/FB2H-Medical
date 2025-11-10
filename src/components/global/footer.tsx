import { Link } from "react-router";

type Props = {};

function Footer({}: Props) {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-4 md:px-0 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="text-2xl font-bold text-white mb-2">FB2H</div>
          <p className="text-gray-400">
            Your trusted healthcare platform connecting patients with top
            doctors.
          </p>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1">
            <li>
              <Link to="/" className="hover:text-white transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/doctors" className="hover:text-white transition">
                Doctors
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-white transition">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-2">Contact</h3>
          <p className="text-gray-400">Email: support@fb2h.com</p>
          <p className="text-gray-400">Phone: +1070325388</p>
          <p className="text-gray-400">Address: ITI</p>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} FB2H. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
