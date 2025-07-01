import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-6 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <p className="text-gray-600">
          © {new Date().getFullYear()} PhotoBooth App. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;