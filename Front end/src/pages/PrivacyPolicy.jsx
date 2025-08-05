import { Shield, Eye, Lock, Users, Mail, Settings, FileText, CheckCircle } from 'lucide-react';

export const PrivacyPolicy = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
    <div className="max-w-5xl mx-auto px-6 py-16">
      {/* Header Section */}
      <div className="text-center mb-16">
        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-r from-[#B8F200] to-[#2F3AE4] rounded-full">
            <Shield className="w-10 h-10 text-white" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Privacy Policy
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Your privacy matters to us. We're committed to protecting your personal information and being transparent about how we use it.
        </p>
        <div className="mt-6 inline-flex items-center px-4 py-2 bg-[#B8F200] rounded-full text-gray-900 font-medium">
          <CheckCircle className="w-4 h-4 mr-2" />
          Last updated: January 2025
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
        <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-center w-12 h-12 bg-[#B8F200] rounded-xl mb-4 mx-auto">
            <Eye className="w-6 h-6 text-gray-900" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Transparency</h3>
          <p className="text-sm text-gray-600">Clear about what we collect</p>
        </div>
        
        <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-center w-12 h-12 bg-[#2F3AE4] rounded-xl mb-4 mx-auto">
            <Lock className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Security</h3>
          <p className="text-sm text-gray-600">Your data is protected</p>
        </div>
        
        <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-center w-12 h-12 bg-[#B8F200] rounded-xl mb-4 mx-auto">
            <Settings className="w-6 h-6 text-gray-900" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Control</h3>
          <p className="text-sm text-gray-600">You decide what to share</p>
        </div>
        
        <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-center w-12 h-12 bg-[#2F3AE4] rounded-xl mb-4 mx-auto">
            <Users className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Respect</h3>
          <p className="text-sm text-gray-600">No selling to third parties</p>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="space-y-12">
        {/* Our Commitment */}
        <div className="bg-gradient-to-r from-[#2F3AE4] to-[#1e2a8a] rounded-3xl p-8 shadow-xl text-white">
          <div className="flex items-center mb-6">
            <div className="flex items-center justify-center w-16 h-16 bg-white rounded-2xl mr-4">
              <Shield className="w-8 h-8 text-[#2F3AE4]" />
            </div>
            <div>
              <h2 className="text-3xl font-bold">Our Commitment to You</h2>
              <p className="text-blue-100">Privacy-first approach to fashion retail</p>
            </div>
          </div>
          
          <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <p className="text-lg leading-relaxed text-blue-50">
              We are committed to protecting your privacy and building trust through transparency. 
              Your personal information is used exclusively to provide and improve our fashion services, 
              create personalized shopping experiences, and keep you updated on the latest styles—only when you want us to.
            </p>
          </div>
        </div>

        {/* Information Collection */}
        <div className="bg-white rounded-3xl p-8 shadow-xl">
          <div className="flex items-center mb-6">
            <div className="flex items-center justify-center w-16 h-16 bg-[#B8F200] rounded-2xl mr-4">
              <FileText className="w-8 h-8 text-gray-900" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Information We Collect</h2>
              <p className="text-gray-600">Only what's necessary for great service</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="border-l-4 border-[#B8F200] pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Personal Information</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#B8F200] rounded-full mr-3"></div>
                    Name and contact details
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#2F3AE4] rounded-full mr-3"></div>
                    Email address for communication
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#B8F200] rounded-full mr-3"></div>
                    Shipping and billing addresses
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#2F3AE4] rounded-full mr-3"></div>
                    Size preferences and style interests
                  </li>
                </ul>
              </div>
              
              <div className="border-l-4 border-[#2F3AE4] pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">When We Collect</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#2F3AE4] rounded-full mr-3"></div>
                    During account creation
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#B8F200] rounded-full mr-3"></div>
                    When making purchases
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#2F3AE4] rounded-full mr-3"></div>
                    Newsletter subscriptions
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#B8F200] rounded-full mr-3"></div>
                    Customer service interactions
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-[#B8F200]" />
                Voluntary Basis Only
              </h3>
              <p className="text-gray-700 leading-relaxed">
                All personal information is collected on a voluntary basis. You choose what to share with us, 
                and we'll never collect information without your knowledge or consent. You can shop with us 
                while sharing only the minimum information necessary for your orders.
              </p>
            </div>
          </div>
        </div>

        {/* Data Usage */}
        <div className="bg-white rounded-3xl p-8 shadow-xl">
          <div className="flex items-center mb-6">
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#B8F200] to-[#2F3AE4] rounded-2xl mr-4">
              <Settings className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">How We Use Your Data</h2>
              <p className="text-gray-600">Focused on enhancing your fashion experience</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 border-2 border-gray-100 rounded-2xl hover:border-[#B8F200] transition-colors duration-300">
              <div className="flex items-center justify-center w-12 h-12 bg-[#B8F200] rounded-xl mb-4">
                <Mail className="w-6 h-6 text-gray-900" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Communication</h3>
              <p className="text-gray-600">
                Order updates, shipping notifications, and customer service responses. 
                We'll never spam you with unwanted messages.
              </p>
            </div>
            
            <div className="p-6 border-2 border-gray-100 rounded-2xl hover:border-[#2F3AE4] transition-colors duration-300">
              <div className="flex items-center justify-center w-12 h-12 bg-[#2F3AE4] rounded-xl mb-4">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Order Processing</h3>
              <p className="text-gray-600">
                Managing your purchases, processing payments, handling returns, 
                and ensuring smooth delivery of your fashion finds.
              </p>
            </div>
            
            <div className="p-6 border-2 border-gray-100 rounded-2xl hover:border-[#B8F200] transition-colors duration-300">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-[#B8F200] to-[#2F3AE4] rounded-xl mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Marketing (Opt-in Only)</h3>
              <p className="text-gray-600">
                Style tips, new collection alerts, and exclusive offers—but only if you 
                choose to subscribe. You can unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>

        {/* Your Rights */}
        <div className="bg-gradient-to-r from-[#B8F200] to-[#2F3AE4] rounded-3xl p-8 shadow-xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">Your Privacy Rights</h2>
            <p className="text-white/90 text-lg">You're in control of your personal information</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="text-xl font-semibold text-white mb-4">Access & Control</h3>
              <ul className="space-y-3 text-white/90">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-3 text-white" />
                  Request a copy of your data
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-3 text-white" />
                  Update or correct information
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-3 text-white" />
                  Delete your account and data
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-3 text-white" />
                  Opt-out of marketing communications
                </li>
              </ul>
            </div>
            
            <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="text-xl font-semibold text-white mb-4">Our Promise</h3>
              <ul className="space-y-3 text-white/90">
                <li className="flex items-center">
                  <Lock className="w-4 h-4 mr-3 text-white" />
                  We never sell your data to third parties
                </li>
                <li className="flex items-center">
                  <Shield className="w-4 h-4 mr-3 text-white" />
                  Industry-standard security measures
                </li>
                <li className="flex items-center">
                  <Eye className="w-4 h-4 mr-3 text-white" />
                  Transparent about any data sharing
                </li>
                <li className="flex items-center">
                  <Mail className="w-4 h-4 mr-3 text-white" />
                  Quick response to privacy requests
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="mt-16 text-center bg-white rounded-3xl p-8 shadow-xl">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Questions About Your Privacy?</h3>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          We're here to help you understand how we protect your information. 
          Reach out to our privacy team with any questions or concerns.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-[#2F3AE4] text-white font-semibold px-8 py-3 rounded-full hover:bg-blue-700 transition-colors duration-300">
            Contact Privacy Team
          </button>
          <button className="bg-gray-100 text-gray-900 font-semibold px-8 py-3 rounded-full hover:bg-gray-200 transition-colors duration-300">
            Download Policy PDF
          </button>
        </div>
      </div>
    </div>
  </div>
);