// components/Footer.js
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-auto">
      <div className="container mx-auto text-center">
        <p>&copy; 2024 Your Company Name. All rights reserved.</p>
        <div className="mt-4">
          <a href="#" className="text-gray-400 hover:text-gray-300 mx-2">Privacy Policy</a>
          <a href="#" className="text-gray-400 hover:text-gray-300 mx-2">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;