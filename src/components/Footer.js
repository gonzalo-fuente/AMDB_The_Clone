import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <footer className="p-4 bg-white sm:px-12 dark:bg-gray-800">
      <div className="flex flex-col sm:flex-row items-center justify-between">
        <ul className="flex mb-4 sm:mb-0 space-x-6">
          <li>
            <a
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
              href="https://www.facebook.com/"
              rel="noopener noreferrer"
            >
              <FaFacebook />
            </a>
          </li>
          <li>
            <a
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
              href="https://twitter.com/"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </a>
          </li>
          <li>
            <a
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
              href="https://www.instagram.com/"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
          </li>
        </ul>
        <p className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          Copyright &copy; 2022 / gonz4 Web Designs
        </p>
      </div>
    </footer>
  );
}

export default Footer;
