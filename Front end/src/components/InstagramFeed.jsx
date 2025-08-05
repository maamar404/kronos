import React, { useState } from 'react';
import { Instagram, Heart, MessageCircle, ExternalLink } from 'lucide-react';

const InstagramFeed = () => {
  const [hoveredPost, setHoveredPost] = useState(null);

  // Mock Instagram posts data
  const instagramPosts = [
    {
      id: 1,
      image: `${process.env.PUBLIC_URL}/img/gallery-1.jpg`,
      likes: 2847,
      comments: 156,
      caption: "Street meets future in our latest drop 🔥 #StreetMeetsFuture #NewDrop",
      username: "kronosofficial"
    },
    {
      id: 2,
      image: `${process.env.PUBLIC_URL}/img/gallery-2.jpg`,
      likes: 3921,
      comments: 203,
      caption: "Cyber punk vibes in the city 🌃 #CyberPunk #UrbanStyle",
      username: "kronosofficial"
    },
    {
      id: 3,
      image: `${process.env.PUBLIC_URL}/img/gallery-3.jpg`,
      likes: 1562,
      comments: 89,
      caption: "Sustainability meets style ♻️ #SustainableFashion #EcoWear",
      username: "kronosofficial"
    },
    {
      id: 4,
      image: `${process.env.PUBLIC_URL}/img/gallery-4.jpg`,
      likes: 4283,
      comments: 312,
      caption: "Future is now. Are you ready? ⚡ #FutureReady #Innovation",
      username: "kronosofficial"
    },
    {
      id: 5,
      image: `${process.env.PUBLIC_URL}/img/gallery-5.jpg`,
      likes: 2156,
      comments: 134,
      caption: "Minimalist design, maximum impact 🎯 #MinimalistStyle #CleanLines",
      username: "kronosofficial"
    },
    {
      id: 6,
      image: `${process.env.PUBLIC_URL}/img/gallery-6.jpg`,
      likes: 3789,
      comments: 267,
      caption: "Night runner collection drops tomorrow 🌙 #NightRunner #ComingSoon",
      username: "kronosofficial"
    }
  ];

  return (
    <div className="relative bg-black  py-24 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-48 h-48 bg-[#B8F200]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-[#2F3AE4]/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#B8F200]/10 to-[#2F3AE4]/10 backdrop-blur-sm border border-[#B8F200]/20 rounded-full px-6 py-3 mb-6">
            <Instagram size={16} className="text-[#B8F200]" />
            <span className="text-sm font-medium text-[#B8F200] uppercase tracking-wider">Follow The Movement</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            <span className="bg-gradient-to-r from-[#B8F200] to-[#2F3AE4] bg-clip-text text-transparent">
              #STREETMEETSFUTURE
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Join our community and see how our pieces are styled in the real world
          </p>

          {/* Follow Button */}
          <a
            href="https://instagram.com/kronosofficial"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-[#B8F200] to-[#2F3AE4] text-black px-8 py-4 font-bold text-lg rounded-full hover:scale-105 transition-all duration-300 hover:shadow-2xl"
          >
            <Instagram size={20} />
            Follow @kronosofficial
            <ExternalLink size={16} />
          </a>
        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {instagramPosts.map((post, index) => (
            <div
              key={post.id}
              className="group relative overflow-hidden rounded-2xl bg-gray-900/50 backdrop-blur-md border border-gray-700/50 hover:border-[#B8F200]/30 transition-all duration-500 hover:scale-105"
              onMouseEnter={() => setHoveredPost(post.id)}
              onMouseLeave={() => setHoveredPost(null)}
            >
              {/* Image Container */}
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={post.image}
                  alt={`Instagram post ${post.id}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    // Fallback gradient if image doesn't exist
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div 
                  className="w-full h-full bg-gradient-to-br from-[#B8F200]/20 to-[#2F3AE4]/20 hidden items-center justify-center text-white/70 text-sm"
                >
                  Instagram Post {post.id}
                </div>

                {/* Hover Overlay */}
                <div className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-300 ${
                  hoveredPost === post.id ? 'opacity-100' : 'opacity-0'
                }`}>
                  <div className="flex items-center gap-6 text-white">
                    <div className="flex items-center gap-2">
                      <Heart size={24} className="fill-current" />
                      <span className="font-bold text-lg">{post.likes.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageCircle size={24} />
                      <span className="font-bold text-lg">{post.comments}</span>
                    </div>
                  </div>
                </div>

                {/* Instagram Icon */}
                <div className="absolute top-4 right-4">
                  <div className="w-8 h-8 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center">
                    <Instagram size={16} className="text-white" />
                  </div>
                </div>
              </div>

              {/* Caption */}
              <div className="p-6">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <img src={`${process.env.PUBLIC_URL}/img/kronos.png`} alt="Avatar" className="w-full h-full" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold text-sm mb-1">@{post.username}</p>
                    <p className="text-gray-300 text-sm leading-relaxed line-clamp-2">
                      {post.caption}
                    </p>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700/50">
                  <div className="flex items-center gap-4 text-gray-400 text-sm">
                    <span className="flex items-center gap-1">
                      <Heart size={14} />
                      {post.likes.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle size={14} />
                      {post.comments}
                    </span>
                  </div>
                  <button className="text-[#B8F200] text-sm font-medium hover:text-[#2F3AE4] transition-colors">
                    View Post
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-4 text-gray-400">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-[#B8F200]"></div>
            <span className="text-sm uppercase tracking-wider">Tag us in your posts</span>
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-[#2F3AE4]"></div>
          </div>
          <p className="text-gray-500 text-sm mt-2">
            Use <span className="text-[#B8F200] font-semibold">#StreetMeetsFuture</span> to be featured
          </p>
        </div>
      </div>

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

export default InstagramFeed;