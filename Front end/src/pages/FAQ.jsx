import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Package, Truck, CreditCard, Shirt, RefreshCw, MessageCircle, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const faqData = [
  {
    id: 1,
    category: 'Orders & Returns',
    icon: <Package className="w-5 h-5" />,
    question: 'What is your return policy?',
    answer: 'We accept returns within 14 days of purchase for a full refund or exchange. Items must be unused, unwashed, and in original condition with all tags attached. Simply contact our customer service team to initiate a return, and we\'ll provide you with a prepaid return label.',
  },
  {
    id: 2,
    category: 'Shipping',
    icon: <Truck className="w-5 h-5" />,
    question: 'How long does shipping take?',
    answer: 'Standard shipping takes 3-7 business days within the continental US. Express shipping (1-3 days) and next-day delivery are also available. International shipping typically takes 7-14 business days. All orders over $75 qualify for free standard shipping!',
  },
  {
    id: 3,
    category: 'Orders & Returns',
    icon: <RefreshCw className="w-5 h-5" />,
    question: 'Can I cancel my order?',
    answer: 'Yes! Orders can be canceled within 24 hours of placement at no charge. After 24 hours, if your order hasn\'t shipped yet, we may still be able to cancel it. Contact our support team immediately for assistance with order cancellations.',
  },
  {
    id: 4,
    category: 'Sizing & Fit',
    icon: <Shirt className="w-5 h-5" />,
    question: 'How do I find my perfect size?',
    answer: 'Check our detailed size guide available on each product page. We provide measurements for chest, waist, hips, and length. If you\'re between sizes, we generally recommend sizing up for comfort. Our customer reviews often include fit feedback from other shoppers too!',
  },
  {
    id: 5,
    category: 'Payment',
    icon: <CreditCard className="w-5 h-5" />,
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, Apple Pay, Google Pay, and Shop Pay. All transactions are processed securely with industry-standard encryption to protect your information.',
  },
  {
    id: 6,
    category: 'Shipping',
    icon: <Truck className="w-5 h-5" />,
    question: 'Do you ship internationally?',
    answer: 'Yes, we ship to over 50 countries worldwide! International shipping costs and delivery times vary by destination. Customs duties and taxes may apply and are the responsibility of the customer. Check our shipping page for specific rates to your country.',
  },
  {
    id: 7,
    category: 'Orders & Returns',
    icon: <Package className="w-5 h-5" />,
    question: 'How do I track my order?',
    answer: 'Once your order ships, you\'ll receive a tracking number via email. You can also log into your account to view order status and tracking information. Most carriers provide real-time updates so you know exactly when to expect your package.',
  },
  {
    id: 8,
    category: 'Sizing & Fit',
    icon: <Shirt className="w-5 h-5" />,
    question: 'What if an item doesn\'t fit?',
    answer: 'No worries! We offer free exchanges within 14 days. Simply return the item using our prepaid label and let us know what size you\'d prefer. We\'ll send out your exchange as soon as we receive your return - no additional shipping charges.',
  },
  {
    id: 9,
    category: 'Account',
    icon: <MessageCircle className="w-5 h-5" />,
    question: 'Do I need an account to place an order?',
    answer: 'While you can checkout as a guest, creating an account offers many benefits: order tracking, faster checkout, exclusive member deals, style recommendations, and easy returns management. Plus, you\'ll be first to know about new collections!',
  },
];

const categories = [
  { name: 'All', icon: <HelpCircle className="w-4 h-4" />, count: faqData.length },
  { name: 'Orders & Returns', icon: <Package className="w-4 h-4" />, count: faqData.filter(item => item.category === 'Orders & Returns').length },
  { name: 'Shipping', icon: <Truck className="w-4 h-4" />, count: faqData.filter(item => item.category === 'Shipping').length },
  { name: 'Sizing & Fit', icon: <Shirt className="w-4 h-4" />, count: faqData.filter(item => item.category === 'Sizing & Fit').length },
  { name: 'Payment', icon: <CreditCard className="w-4 h-4" />, count: faqData.filter(item => item.category === 'Payment').length },
  { name: 'Account', icon: <MessageCircle className="w-4 h-4" />, count: faqData.filter(item => item.category === 'Account').length },
];

export const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [openItems, setOpenItems] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();


  const filteredFAQs = faqData.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleItem = (id) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-r from-[#B8F200] to-[#2F3AE4] rounded-full">
              <HelpCircle className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Find quick answers to common questions about shopping, sizing, shipping, and returns. 
            Can't find what you're looking for? We're here to help!
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search frequently asked questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl shadow-lg border-2 border-gray-100 focus:border-[#B8F200] focus:outline-none text-gray-900 placeholder-gray-500"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setActiveCategory(category.name)}
              className={`flex items-center px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category.name
                  ? 'bg-[#2F3AE4] text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
              }`}
            >
              {category.icon}
              <span className="ml-2">{category.name}</span>
              <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                activeCategory === category.name
                  ? 'bg-white/20 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {category.count}
              </span>
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto space-y-4">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-600">Try adjusting your search or browse a different category.</p>
            </div>
          ) : (
            filteredFAQs.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-center flex-1">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-xl mr-4 ${
                      openItems[item.id] ? 'bg-[#B8F200]' : 'bg-gray-100'
                    }`}>
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center mb-1">
                        <span className="text-xs font-medium text-[#2F3AE4] bg-blue-50 px-2 py-1 rounded-full mr-3">
                          {item.category}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {item.question}
                      </h3>
                    </div>
                  </div>
                  <div className={`ml-4 transition-transform duration-200 ${
                    openItems[item.id] ? 'rotate-180' : ''
                  }`}>
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </div>
                </button>
                
                {openItems[item.id] && (
                  <div className="px-8 pb-6">
                    <div className="ml-14 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6">
                      <p className="text-gray-700 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Still Need Help Section */}
        <div className="mt-16 bg-gradient-to-r from-[#B8F200] to-[#2F3AE4] rounded-3xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Still need help?</h3>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Can't find the answer you're looking for? Our friendly customer service team is ready to assist 
            you with any questions about our products, orders, or styling advice.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-gray-900 font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition-colors duration-300">
              Chat with Support
            </button>
            <button className="bg-white/20 text-white font-semibold px-8 py-3 rounded-full hover:bg-white/30 transition-colors duration-300 backdrop-blur-sm">
              Email Us
            </button>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-all duration-300">
            <div className="w-12 h-12 bg-[#B8F200] rounded-xl flex items-center justify-center mx-auto mb-4">
              <Truck className="w-6 h-6 text-gray-900" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Shipping Info</h3>
            <p className="text-gray-600 text-sm mb-4">Detailed shipping rates and delivery times</p>
            <button className="text-[#2F3AE4] font-medium hover:underline"onClick={() => navigate('/shipping')}>Learn More</button>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-all duration-300">
            <div className="w-12 h-12 bg-[#2F3AE4] rounded-xl flex items-center justify-center mx-auto mb-4">
              <RefreshCw className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Return Policy</h3>
            <p className="text-gray-600 text-sm mb-4">Easy returns and exchange process</p>
            <button className="text-[#2F3AE4] font-medium hover:underline"onClick={() => navigate('/privacy')}>View Policy</button>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-all duration-300">
            <div className="w-12 h-12 bg-[#B8F200] rounded-xl flex items-center justify-center mx-auto mb-4">
              <Shirt className="w-6 h-6 text-gray-900" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Size Guide</h3>
            <p className="text-gray-600 text-sm mb-4">Find your perfect fit with our size charts</p>
            <button className="text-[#2F3AE4] font-medium hover:underline" onClick={() => navigate('/sizeguide')}>Size Guide</button>
          </div>
        </div>
      </div>
    </div>
  );
};
