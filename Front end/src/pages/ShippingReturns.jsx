import { Truck, RotateCcw, CreditCard, Shield, Clock, CheckCircle } from 'lucide-react';

export const ShippingReturns = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
    <div className="max-w-4xl mx-auto px-6 py-16">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Shipping & Returns
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Fast, reliable delivery and hassle-free returns to keep you looking your best
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-transparent hover:border-[#B8F200] transition-all duration-300">
          <div className="flex items-center justify-center w-12 h-12 bg-[#B8F200] rounded-xl mb-4">
            <Truck className="w-6 h-6 text-gray-900" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Fast Shipping</h3>
          <p className="text-gray-600">3-7 business days delivery</p>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-transparent hover:border-[#2F3AE4] transition-all duration-300">
          <div className="flex items-center justify-center w-12 h-12 bg-[#2F3AE4] rounded-xl mb-4">
            <RotateCcw className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Easy Returns</h3>
          <p className="text-gray-600">14-day return window</p>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-transparent hover:border-[#B8F200] transition-all duration-300">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-[#B8F200] to-[#2F3AE4] rounded-xl mb-4">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure Process</h3>
          <p className="text-gray-600">Protected transactions</p>
        </div>
      </div>

      {/* Detailed Sections */}
      <div className="space-y-12">
        {/* Shipping Section */}
        <div className="bg-white rounded-3xl p-8 shadow-xl">
          <div className="flex items-center mb-6">
            <div className="flex items-center justify-center w-16 h-16 bg-[#B8F200] rounded-2xl mr-4">
              <Truck className="w-8 h-8 text-gray-900" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Shipping Information</h2>
              <p className="text-gray-600">Get your new favorites delivered quickly</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-[#2F3AE4]" />
                Delivery Times
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-700">Standard Delivery</span>
                  <span className="font-semibold text-gray-900">3-7 business days</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-700">Express Delivery</span>
                  <span className="font-semibold text-gray-900">1-3 business days</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-700">Next Day Delivery</span>
                  <span className="font-semibold text-gray-900">Next business day</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-[#B8F200]" />
                What We Cover
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-[#B8F200] rounded-full mr-3"></div>
                  Free standard shipping on orders over $75
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-[#2F3AE4] rounded-full mr-3"></div>
                  Worldwide shipping available
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-[#B8F200] rounded-full mr-3"></div>
                  Tracking information provided
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-[#2F3AE4] rounded-full mr-3"></div>
                  Secure packaging guaranteed
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Returns Section */}
        <div className="bg-gradient-to-r from-[#2F3AE4] to-[#1e2a8a] rounded-3xl p-8 shadow-xl text-white">
          <div className="flex items-center mb-6">
            <div className="flex items-center justify-center w-16 h-16 bg-white rounded-2xl mr-4">
              <RotateCcw className="w-8 h-8 text-[#2F3AE4]" />
            </div>
            <div>
              <h2 className="text-3xl font-bold">Return Policy</h2>
              <p className="text-blue-100">Not satisfied? We've got you covered</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Return Guidelines</h3>
              <div className="space-y-4 text-blue-100">
                <p>Items can be returned within <strong className="text-white">14 days</strong> of receipt for a full refund or exchange.</p>
                <p>Products must be in original condition with all tags attached and original packaging.</p>
                <p>Items should be unworn, unwashed, and free from any damage or alterations.</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">How to Return</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="flex items-center justify-center w-6 h-6 bg-[#B8F200] text-gray-900 rounded-full mr-3 mt-0.5 text-sm font-bold">1</div>
                  <p className="text-blue-100">Contact our customer service team</p>
                </div>
                <div className="flex items-start">
                  <div className="flex items-center justify-center w-6 h-6 bg-[#B8F200] text-gray-900 rounded-full mr-3 mt-0.5 text-sm font-bold">2</div>
                  <p className="text-blue-100">Receive return authorization and label</p>
                </div>
                <div className="flex items-start">
                  <div className="flex items-center justify-center w-6 h-6 bg-[#B8F200] text-gray-900 rounded-full mr-3 mt-0.5 text-sm font-bold">3</div>
                  <p className="text-blue-100">Package and ship your return</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Refunds Section */}
        <div className="bg-white rounded-3xl p-8 shadow-xl">
          <div className="flex items-center mb-6">
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#B8F200] to-[#2F3AE4] rounded-2xl mr-4">
              <CreditCard className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Refund Process</h2>
              <p className="text-gray-600">Quick and transparent refund handling</p>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6">
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              Once your return is received and inspected by our quality team, we'll send you an email notification about the approval or rejection of your refund.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              If approved, your refund will be processed and automatically applied to your original payment method within <strong>5-10 business days</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="mt-16 text-center bg-gradient-to-r from-[#B8F200] to-[#2F3AE4] rounded-3xl p-8">
        <h3 className="text-2xl font-bold text-white mb-4">Have Questions?</h3>
        <p className="text-white/90 mb-6">Our customer service team is here to help with any shipping or return questions.</p>
        <button className="bg-white text-gray-900 font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition-colors duration-300">
          Contact Support
        </button>
      </div>
    </div>
  </div>
);