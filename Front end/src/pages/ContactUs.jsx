import React, { useState } from 'react';
import { message } from 'antd'; // For showing success/error messages
import {  Mail, MapPin, Phone } from 'lucide-react'; // Icons for contact info and social media
import axios from 'axios'; // For making API calls

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

export const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false); // To handle loading state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      message.warning('Please fill out all fields.');
      return;
    }

    setIsSubmitting(true); // Start loading

    try {
      // Replace with your backend API endpoint
      const response = await axios.post(`${API_URL}/contact`, formData);

      if (response.status === 200 || response.status === 201) {
        message.success('Your message has been sent! We’ll get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' }); // Reset form
      } else {
        message.error('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      message.error(error.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false); // Stop loading
    }
  };

  return (
  <div className="min-h-screen bg-black text-white relative overflow-hidden">
    {/* Animated background elements */}
    <div className="absolute inset-0 opacity-10">
      <div className="absolute top-20 left-10 w-32 h-32 bg-[#B8F200] rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-[#2F3AE4] rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-[#B8F200] rounded-full blur-2xl animate-bounce"></div>
    </div>

    <div className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#B8F200] to-[#2F3AE4] bg-clip-text text-transparent">
            Let's Connect
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Ready to elevate your style? Drop us a message and let's create something extraordinary together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Contact Form */}
          <div className="relative">
            {/* Glowing border effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#B8F200] to-[#2F3AE4] rounded-2xl blur opacity-30"></div>
            <div className="relative bg-gray-900/80 backdrop-blur-sm p-10 rounded-2xl shadow-2xl border border-gray-800">
              <h3 className="text-3xl font-bold mb-8 text-center">
                <span className="bg-gradient-to-r from-[#B8F200] to-white bg-clip-text text-transparent">
                  Send Us a Message
                </span>
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="block text-sm font-semibold text-[#B8F200] mb-3 uppercase tracking-wider">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-6 py-4 bg-black/50 text-white placeholder-gray-500 rounded-xl border-2 border-gray-700 focus:outline-none focus:border-[#B8F200] focus:ring-2 focus:ring-[#B8F200]/20 transition-all duration-300 group-hover:border-gray-600"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div className="group">
                    <label className="block text-sm font-semibold text-[#B8F200] mb-3 uppercase tracking-wider">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-6 py-4 bg-black/50 text-white placeholder-gray-500 rounded-xl border-2 border-gray-700 focus:outline-none focus:border-[#B8F200] focus:ring-2 focus:ring-[#B8F200]/20 transition-all duration-300 group-hover:border-gray-600"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>
                
                <div className="group">
                  <label className="block text-sm font-semibold text-[#B8F200] mb-3 uppercase tracking-wider">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-black/50 text-white placeholder-gray-500 rounded-xl border-2 border-gray-700 focus:outline-none focus:border-[#B8F200] focus:ring-2 focus:ring-[#B8F200]/20 transition-all duration-300 group-hover:border-gray-600"
                    placeholder="What's this about?"
                    required
                  />
                </div>
                
                <div className="group">
                  <label className="block text-sm font-semibold text-[#B8F200] mb-3 uppercase tracking-wider">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-black/50 text-white placeholder-gray-500 rounded-xl border-2 border-gray-700 focus:outline-none focus:border-[#B8F200] focus:ring-2 focus:ring-[#B8F200]/20 transition-all duration-300 resize-none group-hover:border-gray-600"
                    rows="6"
                    placeholder="Tell us about your vision..."
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#B8F200] to-[#2F3AE4] text-black font-bold px-8 py-4 rounded-xl hover:shadow-xl hover:shadow-[#B8F200]/25 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center text-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin h-6 w-6 mr-3 text-black"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending Your Message...
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-12">
            <div className="text-center lg:text-left">
              <h3 className="text-4xl font-bold mb-6 bg-gradient-to-r from-white to-[#B8F200] bg-clip-text text-transparent">
                Get in Touch
              </h3>
              <p className="text-lg text-gray-400 leading-relaxed">
                We're here to bring your fashion vision to life. Reach out and let's make it happen.
              </p>
            </div>

            <div className="space-y-8">
              {/* Address */}
              <div className="group flex items-start space-x-6 p-6 rounded-2xl bg-gradient-to-r from-gray-900/50 to-gray-800/30 border border-gray-700/50 hover:border-[#B8F200]/30 transition-all duration-300 hover:transform hover:scale-[1.02]">
                <div className="bg-gradient-to-r from-[#B8F200] to-[#2F3AE4] p-3 rounded-xl">
                  <MapPin className="h-6 w-6 text-black" />
                </div>
                <div>
                  <p className="text-xl font-bold text-white mb-2">Our Flagship Store</p>
                  <p className="text-gray-300 text-lg">123 Streetwear Ave, Suite 456</p>
                  <p className="text-gray-300 text-lg">Casablanca, Morocco</p>
                </div>
              </div>

              {/* Phone */}
              <div className="group flex items-start space-x-6 p-6 rounded-2xl bg-gradient-to-r from-gray-900/50 to-gray-800/30 border border-gray-700/50 hover:border-[#2F3AE4]/30 transition-all duration-300 hover:transform hover:scale-[1.02]">
                <div className="bg-gradient-to-r from-[#2F3AE4] to-[#B8F200] p-3 rounded-xl">
                  <Phone className="h-6 w-6 text-black" />
                </div>
                <div>
                  <p className="text-xl font-bold text-white mb-2">Call Our Team</p>
                  <p className="text-gray-300 text-lg">+212 6 61 61 61 61</p>
                  <p className="text-sm text-gray-500">Mon-Fri, 9AM-6PM GMT</p>
                </div>
              </div>

              {/* Email */}
              <div className="group flex items-start space-x-6 p-6 rounded-2xl bg-gradient-to-r from-gray-900/50 to-gray-800/30 border border-gray-700/50 hover:border-[#B8F200]/30 transition-all duration-300 hover:transform hover:scale-[1.02]">
                <div className="bg-gradient-to-r from-[#B8F200] to-[#2F3AE4] p-3 rounded-xl">
                  <Mail className="h-6 w-6 text-black" />
                </div>
                <div>
                  <p className="text-xl font-bold text-white mb-2">Email Support</p>
                  <p className="text-gray-300 text-lg">kronos@contact.com</p>
                  <p className="text-sm text-gray-500">We reply within 24 hours</p>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center lg:text-left mt-12 p-8 bg-gradient-to-r from-[#2F3AE4]/10 to-[#B8F200]/10 rounded-2xl border border-gray-700/30">
              <h4 className="text-2xl font-bold text-white mb-4">Ready to Stand Out?</h4>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Join thousands of fashion-forward individuals who trust us with their style. 
                Your next favorite piece is just a message away.
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <span className="px-4 py-2 bg-[#B8F200]/20 text-[#B8F200] rounded-full text-sm font-semibold">Premium Quality</span>
                <span className="px-4 py-2 bg-[#2F3AE4]/20 text-[#2F3AE4] rounded-full text-sm font-semibold">Fast Shipping</span>
                <span className="px-4 py-2 bg-gray-700/50 text-white rounded-full text-sm font-semibold">24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
}