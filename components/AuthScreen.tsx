import React, { useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface AuthScreenProps {
  onLogin: (username: string) => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;

    setIsAnimating(true);
    // Add a small delay for the animation feeling
    setTimeout(() => {
        onLogin(username.trim());
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-rose-50 via-white to-blue-50 px-6 relative overflow-hidden">
      
      {/* Decorative blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-20%] left-[20%] w-64 h-64 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      <div className={`w-full max-w-sm transition-all duration-700 ${isAnimating ? 'opacity-0 translate-y-10 scale-95' : 'opacity-100 translate-y-0 scale-100'}`}>
        <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-3xl shadow-lg mb-6 text-4xl animate-bounce-slow">
                🐟
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2 tracking-tight">摸鱼日记</h1>
            <p className="text-gray-400 text-sm">工作是老板的，生活是自己的。</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-white/50">
          <div className="mb-6">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">给自己起个代号</label>
            <div className="relative">
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="例如：摸鱼办主任"
                    className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-4 text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:bg-white transition-all text-lg font-medium text-center"
                    autoFocus
                />
                <Sparkles className="absolute right-4 top-1/2 -translate-y-1/2 text-pink-300 pointer-events-none" size={20} />
            </div>
          </div>

          <button
            type="submit"
            disabled={!username.trim()}
            className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-pink-200 hover:shadow-pink-300 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
          >
            开始摸鱼
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
        
        <p className="mt-8 text-center text-[10px] text-gray-400">
            数据将存储在本地，清理缓存可能会丢失数据
        </p>
      </div>
    </div>
  );
};

export default AuthScreen;
