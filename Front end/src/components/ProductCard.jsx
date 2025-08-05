import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Eye } from 'lucide-react';
import { FavoritesContext } from '../contexts/FavoritesContext';

export const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const { favorites, toggleFavorite } = useContext(FavoritesContext);

  // Check if product is in favorites
  const isLiked = favorites.some(fav => fav.id === product.id);

  const handleNavigateToProduct = () => {
    navigate(`/products/${product.id}`);
  };

  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product);
  };



  return (
    <div className="group relative h-full">
      {/* Main Card Container */}
      <div className="relative h-full bg-transparent rounded-2xl overflow-hidden transition-all duration-500">
        
        {/* Image Container */}
        <Link to={`/products/${product.id}`} className="block relative">
          <div className="relative aspect-square overflow-hidden bg-gray-800 rounded-2xl">
            
            {/* Loading State */}
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-700 animate-pulse flex items-center justify-center">
                <div className="w-12 h-12 border-2 border-[#B8F200]/30 border-t-[#B8F200] rounded-full animate-spin"></div>
              </div>
            )}

            {/* Product Image */}
            <img
              src={product.imageUrl}
              alt={product.name}
              className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={(e) => {
                // Fallback gradient if image fails
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            
            {/* Fallback Gradient */}
            <div className="w-full h-full bg-gradient-to-br from-[#B8F200]/20 to-[#2F3AE4]/20 hidden items-center justify-center text-white/70 text-sm font-medium">
              {product.name}
            </div>

            {/* Dark Overlay on Hover */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>

            {/* Top Action Buttons */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
              {/* Like Button */}
              <button
                onClick={handleLike}
                className={`w-10 h-10 rounded-full backdrop-blur-md border transition-all duration-300 hover:scale-110 ${
                  isLiked 
                    ? 'bg-red-500/90 border-red-400 text-white' 
                    : 'bg-black/30 border-white/20 text-white hover:bg-black/50'
                }`}
              >
                <Heart size={16} className={`mx-auto ${isLiked ? 'fill-current' : ''}`} />
              </button>

              {/* Quick View Button */}
              <button
                onClick={handleNavigateToProduct}
                className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-md border border-white/20 text-white hover:bg-black/50 transition-all duration-300 hover:scale-110"
              >
                <Eye size={16} className="mx-auto" />
              </button>
            </div>

            {/* Bottom Overlay Content */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
              
              {/* Quick Add to Cart */}
              <button
                onClick={handleNavigateToProduct}
                className="w-full bg-[#B8F200] text-black py-3 px-4 rounded-full font-bold text-sm uppercase tracking-wider hover:bg-white transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <ShoppingCart size={16} />
                View Product
              </button>
            </div>

            {/* New/Sale Badge */}
            {product.isNew && (
              <div className="absolute top-4 left-4">
                <span className="bg-[#B8F200] text-black px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  New
                </span>
              </div>
            )}
            
            {product.salePrice && (
              <div className="absolute top-4 left-4">
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  Sale
                </span>
              </div>
            )}
          </div>
        </Link>

        {/* Product Information */}
        <div className="p-6">
          {/* Category */}
          <p className="text-xs uppercase tracking-wider text-[#B8F200] font-medium mb-2">
            {product.category}
          </p>

          {/* Product Name */}
          <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-[#B8F200] transition-colors duration-300">
            <Link to={`/products/${product.id}`}>
              {product.name}
            </Link>
          </h3>

          {/* Price Section */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {product.salePrice ? (
                <>
                  <span className="text-xl font-bold text-[#B8F200]">
                    ${product.salePrice}
                  </span>
                  <span className="text-sm text-gray-400 line-through">
                    ${product.price}
                  </span>
                </>
              ) : (
                <span className="text-xl font-bold text-white">
                  ${product.price}
                </span>
              )}
            </div>

            {/* Cart Button */}
            <button
              onClick={handleNavigateToProduct}
              className="w-10 h-10 rounded-full bg-[#B8F200]/20 border border-[#B8F200]/30 text-[#B8F200] hover:bg-[#B8F200] hover:text-black transition-all duration-300 hover:scale-110 backdrop-blur-sm"
            >
              <ShoppingCart size={16} className="mx-auto" />
            </button>
          </div>

          {/* Rating (if available) */}
          {product.rating && (
            <div className="flex items-center gap-1 mt-3">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-sm ${
                    i < Math.floor(product.rating) 
                      ? 'text-[#B8F200]' 
                      : 'text-gray-600'
                  }`}
                >
                  ★
                </span>
              ))}
              <span className="text-xs text-gray-400 ml-2">
                ({product.reviewCount || 0})
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Custom CSS for line clamp */}
      <style>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};