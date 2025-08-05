import {React, useState} from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook } from 'lucide-react';
import { notification } from 'antd';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

export const Footer = () => {

  const [email, setEmail] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) {
      notification.error({
        message: 'Error',
        description: 'Please enter a valid email address.',
      });
      return;
    }

    try {
      const response = await fetch(`${API_URL}/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        notification.success({
          message: 'Success',
          description: data.message,
        });
      } else {
        notification.warning({
          message: 'Info',
          description: data.message,
        });
      }
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'An error occurred while subscribing.',
      });
    }
  };

  return (
    <footer className="bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="mb-12 text-center">
          <h3 className="text-2xl font-bold mb-4">Join Our Newsletter</h3>
          <p className="text-gray-400 mb-6">
            Be the first to know about our latest collections, exclusive offers, and style tips.
          </p>
          <form className="flex justify-center gap-2" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-64 px-4 py-2  bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2F3AE4]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="px-6 py-2 bg-[#2F3AE4] text-white  hover:bg-gray-800 hover:text-white transition-colors duration-200"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Quick Links and Social Media */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-gray-400 hover:text-[#2F3AE4] transition-colors duration-200">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-[#2F3AE4] transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-[#2F3AE4] transition-colors duration-200">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-[#2F3AE4] transition-colors duration-200">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/shipping" className="text-gray-400 hover:text-[#2F3AE4] transition-colors duration-200">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-[#2F3AE4] transition-colors duration-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-[#2F3AE4] transition-colors duration-200">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/sizeguide" className="text-gray-400 hover:text-[#2F3AE4] transition-colors duration-200">
                  Size Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#2F3AE4] transition-colors duration-200"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#2F3AE4] transition-colors duration-200"
              >
                <Facebook className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <p className="text-gray-400 mb-2"> Avenue Hassan II, Casablanca 20250</p>
            <p className="text-gray-400 mb-2">Phone:  +212 6 61 61 61 61</p>
            <p className="text-gray-400">Email: kronos@contact.com</p>
          </div>
        </div>

        {/* Legal Information */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Kronos. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};