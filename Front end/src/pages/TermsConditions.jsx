import { FileText, Globe, Copyright, ShoppingBag, UserCheck, AlertTriangle, Scale, Handshake } from 'lucide-react';

export const TermsConditions = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
    <div className="max-w-5xl mx-auto px-6 py-16">
      {/* Header Section */}
      <div className="text-center mb-16">
        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-r from-[#B8F200] to-[#2F3AE4] rounded-full">
            <Scale className="w-10 h-10 text-white" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Terms & Conditions
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Clear, fair terms for shopping with us. These guidelines help create a positive experience for everyone in our fashion community.
        </p>
        <div className="mt-6 inline-flex items-center px-4 py-2 bg-[#B8F200] rounded-full text-gray-900 font-medium">
          <FileText className="w-4 h-4 mr-2" />
          Effective: January 2025
        </div>
      </div>

      {/* Key Points Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
        <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-center w-12 h-12 bg-[#B8F200] rounded-xl mb-4 mx-auto">
            <Handshake className="w-6 h-6 text-gray-900" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Fair Terms</h3>
          <p className="text-sm text-gray-600">Mutual respect and understanding</p>
        </div>
        
        <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-center w-12 h-12 bg-[#2F3AE4] rounded-xl mb-4 mx-auto">
            <UserCheck className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">User Rights</h3>
          <p className="text-sm text-gray-600">Protected shopping experience</p>
        </div>
        
        <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-center w-12 h-12 bg-[#B8F200] rounded-xl mb-4 mx-auto">
            <Copyright className="w-6 h-6 text-gray-900" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">IP Protection</h3>
          <p className="text-sm text-gray-600">Respecting creative content</p>
        </div>
        
        <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-center w-12 h-12 bg-[#2F3AE4] rounded-xl mb-4 mx-auto">
            <ShoppingBag className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Purchase Terms</h3>
          <p className="text-sm text-gray-600">Clear shopping guidelines</p>
        </div>
      </div>

      {/* Agreement Section */}
      <div className="bg-gradient-to-r from-[#2F3AE4] to-[#1e2a8a] rounded-3xl p-8 shadow-xl text-white mb-12">
        <div className="flex items-center mb-6">
          <div className="flex items-center justify-center w-16 h-16 bg-white rounded-2xl mr-4">
            <Handshake className="w-8 h-8 text-[#2F3AE4]" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">Agreement to Terms</h2>
            <p className="text-blue-100">Welcome to our fashion community</p>
          </div>
        </div>
        
        <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
          <p className="text-lg leading-relaxed text-blue-50 mb-4">
            By browsing, shopping, or creating an account with us, you agree to these terms and conditions. 
            We've designed these guidelines to ensure a safe, enjoyable, and fair shopping experience for everyone.
          </p>
          <div className="flex items-start mt-4">
            <AlertTriangle className="w-5 h-5 text-[#B8F200] mr-3 mt-0.5 flex-shrink-0" />
            <p className="text-blue-100">
              Please read these terms carefully. If you don't agree with any part, we recommend not using our services.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="space-y-12">
        {/* Website Usage */}
        <div className="bg-white rounded-3xl p-8 shadow-xl">
          <div className="flex items-center mb-6">
            <div className="flex items-center justify-center w-16 h-16 bg-[#B8F200] rounded-2xl mr-4">
              <Globe className="w-8 h-8 text-gray-900" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Website Usage</h2>
              <p className="text-gray-600">Guidelines for a positive community experience</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <UserCheck className="w-5 h-5 mr-2 text-[#B8F200]" />
                What You Can Do
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-[#B8F200] rounded-full mr-3 mt-2"></div>
                  <span>Browse our fashion collections and product catalogs</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-[#2F3AE4] rounded-full mr-3 mt-2"></div>
                  <span>Create an account to save favorites and track orders</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-[#B8F200] rounded-full mr-3 mt-2"></div>
                  <span>Share product links and recommendations with friends</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-[#2F3AE4] rounded-full mr-3 mt-2"></div>
                  <span>Leave honest reviews and style feedback</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-[#B8F200] rounded-full mr-3 mt-2"></div>
                  <span>Contact customer service for support</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-red-500" />
                Prohibited Activities
              </h3>
              <div className="bg-red-50 rounded-2xl p-6">
                <p className="text-gray-700 mb-4">
                  To maintain a safe environment for all users, you agree not to:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">×</span>
                    <span>Misuse or attempt to hack our website</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">×</span>
                    <span>Upload viruses or malicious software</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">×</span>
                    <span>Infringe upon others' rights or privacy</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">×</span>
                    <span>Engage in fraudulent or illegal activities</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">×</span>
                    <span>Impersonate others or create fake accounts</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Intellectual Property */}
        <div className="bg-white rounded-3xl p-8 shadow-xl">
          <div className="flex items-center mb-6">
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#B8F200] to-[#2F3AE4] rounded-2xl mr-4">
              <Copyright className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Intellectual Property</h2>
              <p className="text-gray-600">Respecting creativity and original content</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="border-l-4 border-[#B8F200] pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Our Content</h3>
                <p className="text-gray-700 mb-4">
                  All content on our website is owned or licensed by us, including:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#B8F200] rounded-full mr-3"></div>
                    Product photos and styling images
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#2F3AE4] rounded-full mr-3"></div>
                    Fashion lookbooks and catalogs
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#B8F200] rounded-full mr-3"></div>
                    Brand logos and design elements
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#2F3AE4] rounded-full mr-3"></div>
                    Written content and product descriptions
                  </li>
                </ul>
              </div>
              
              <div className="border-l-4 border-[#2F3AE4] pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Usage Rights</h3>
                <p className="text-gray-700">
                  You may view and use our content for personal, non-commercial purposes only. 
                  Any reproduction, distribution, or commercial use requires our prior written consent.
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Handshake className="w-5 h-5 mr-2 text-[#2F3AE4]" />
                Fair Use Guidelines
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex items-center justify-center w-6 h-6 bg-[#B8F200] text-gray-900 rounded-full mr-3 mt-0.5 text-sm font-bold">✓</div>
                  <div>
                    <p className="font-medium text-gray-900">Personal Use</p>
                    <p className="text-sm text-gray-600">Share product links with friends and family</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex items-center justify-center w-6 h-6 bg-[#2F3AE4] text-white rounded-full mr-3 mt-0.5 text-sm font-bold">✓</div>
                  <div>
                    <p className="font-medium text-gray-900">Social Media</p>
                    <p className="text-sm text-gray-600">Tag us when sharing your style posts</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex items-center justify-center w-6 h-6 bg-red-500 text-white rounded-full mr-3 mt-0.5 text-sm font-bold">×</div>
                  <div>
                    <p className="font-medium text-gray-900">Commercial Use</p>
                    <p className="text-sm text-gray-600">Requires written permission from us</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Purchase Terms */}
        <div className="bg-white rounded-3xl p-8 shadow-xl">
          <div className="flex items-center mb-6">
            <div className="flex items-center justify-center w-16 h-16 bg-[#2F3AE4] rounded-2xl mr-4">
              <ShoppingBag className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Purchase & Order Terms</h2>
              <p className="text-gray-600">Clear guidelines for your shopping experience</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 border-2 border-gray-100 rounded-2xl hover:border-[#B8F200] transition-colors duration-300">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Order Accuracy</h3>
              <p className="text-gray-600 mb-4">
                Please review your order carefully before completing purchase. We process orders quickly, 
                so changes may not be possible once confirmed.
              </p>
              <div className="text-sm text-gray-500">
                Double-check sizes, colors, and quantities
              </div>
            </div>
            
            <div className="p-6 border-2 border-gray-100 rounded-2xl hover:border-[#2F3AE4] transition-colors duration-300">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Pricing & Availability</h3>
              <p className="text-gray-600 mb-4">
                Prices and product availability are subject to change. We reserve the right to 
                limit quantities and discontinue items without notice.
              </p>
              <div className="text-sm text-gray-500">
                Current at time of purchase
              </div>
            </div>
            
            <div className="p-6 border-2 border-gray-100 rounded-2xl hover:border-[#B8F200] transition-colors duration-300">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Payment Security</h3>
              <p className="text-gray-600 mb-4">
                All transactions are processed securely. We never store your full payment 
                information and use industry-standard encryption.
              </p>
              <div className="text-sm text-gray-500">
                Protected by secure payment gateways
              </div>
            </div>
          </div>
        </div>

        {/* Limitation of Liability */}
        <div className="bg-gradient-to-r from-[#B8F200] to-[#2F3AE4] rounded-3xl p-8 shadow-xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">Limitation of Liability</h2>
            <p className="text-white/90 text-lg">Understanding our mutual responsibilities</p>
          </div>
          
          <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm text-white">
            <p className="text-lg leading-relaxed mb-4">
              While we strive to provide excellent products and service, we cannot be held liable for indirect, 
              incidental, or consequential damages. Our liability is limited to the purchase price of the item in question.
            </p>
            <p className="text-white/90">
              This doesn't affect your statutory rights as a consumer, including rights related to defective products 
              or services not provided with reasonable skill and care.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="mt-16 text-center bg-white rounded-3xl p-8 shadow-xl">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Questions About These Terms?</h3>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          We're committed to transparency and fairness. If you have any questions about these terms 
          or need clarification on any point, our team is here to help.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-[#2F3AE4] text-white font-semibold px-8 py-3 rounded-full hover:bg-blue-700 transition-colors duration-300">
            Contact Legal Team
          </button>
          <button className="bg-gray-100 text-gray-900 font-semibold px-8 py-3 rounded-full hover:bg-gray-200 transition-colors duration-300">
            Download Terms PDF
          </button>
        </div>
      </div>
    </div>
  </div>
);