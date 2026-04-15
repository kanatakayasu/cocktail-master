import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  BookOpen,
  HelpCircle,
  Layers,
  GitBranch,
  Gamepad2,
  Menu,
  X,
} from 'lucide-react';

const navItems = [
  { path: '/', label: 'ホーム', icon: Home },
  { path: '/encyclopedia', label: '図鑑', icon: BookOpen },
  { path: '/quiz', label: 'クイズ', icon: HelpCircle },
  { path: '/flashcards', label: '暗記カード', icon: Layers },
  { path: '/classification', label: '分類', icon: GitBranch },
  { path: '/game', label: 'ゲーム', icon: Gamepad2 },
];

// 背景に浮かぶ微細な光の粒子
function Particles() {
  const particles = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 3 + 1.5,
    duration: `${Math.random() * 8 + 10}s`,
    delay: `${Math.random() * 10}s`,
    opacity: Math.random() * 0.2 + 0.05,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle absolute rounded-full"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            background: `radial-gradient(circle at 30% 30%, rgba(201, 169, 110, ${p.opacity}), rgba(232, 220, 200, ${p.opacity * 0.3}))`,
            '--duration': p.duration,
            '--delay': p.delay,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

export default function Layout() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-bar-dark relative">
      <Particles />

      {/* ヘッダー */}
      <header className="sticky top-0 z-50 border-b border-glass-border bg-bar-dark/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* ロゴ */}
            <Link to="/" className="flex items-center gap-2 no-underline">
              <motion.span
                className="text-2xl"
                animate={{ rotate: [0, -5, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 6 }}
              >
                🍸
              </motion.span>
              <span className="text-lg sm:text-xl font-bold gradient-text" style={{ fontFamily: "'Cinzel', serif" }}>
                Cocktail Book
              </span>
            </Link>

            {/* デスクトップナビ */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive =
                  item.path === '/'
                    ? location.pathname === '/'
                    : location.pathname.startsWith(item.path);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="relative no-underline"
                  >
                    <motion.div
                      className={`flex items-center gap-1.5 px-3 py-2 rounded text-sm transition-colors ${
                        isActive
                          ? 'text-accent-gold gold-glow'
                          : 'text-text-secondary hover:text-text-primary'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon size={16} />
                      <span style={{ fontFamily: "'Noto Serif JP', serif" }}>{item.label}</span>
                      {isActive && (
                        <motion.div
                          className="absolute bottom-0 left-2 right-2 h-0.5 bg-accent-gold rounded-full"
                          layoutId="nav-underline"
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                      )}
                    </motion.div>
                  </Link>
                );
              })}
            </nav>

            {/* モバイルハンバーガー */}
            <button
              className="md:hidden text-text-secondary hover:text-text-primary p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="メニューを開く"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* モバイルメニュー */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* オーバーレイ */}
            <motion.div
              className="fixed inset-0 bg-black/60 z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* スライドインメニュー */}
            <motion.nav
              className="fixed top-0 right-0 bottom-0 w-64 bg-bar-green/95 backdrop-blur-xl z-50 md:hidden border-l border-glass-border"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className="flex items-center justify-between p-4 border-b border-glass-border">
                <span className="text-lg font-bold gradient-text">メニュー</span>
                <button
                  className="text-text-secondary hover:text-text-primary p-1"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="メニューを閉じる"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-4 flex flex-col gap-2">
                {navItems.map((item, index) => {
                  const isActive =
                    item.path === '/'
                      ? location.pathname === '/'
                      : location.pathname.startsWith(item.path);
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        to={item.path}
                        className="no-underline"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <div
                          className={`flex items-center gap-3 px-4 py-3 rounded transition-colors ${
                            isActive
                              ? 'text-accent-gold bg-accent-gold/10 gold-glow'
                              : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
                          }`}
                        >
                          <Icon size={20} />
                          <span className="text-base" style={{ fontFamily: "'Noto Serif JP', serif" }}>{item.label}</span>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      {/* メインコンテンツ */}
      <main className="relative z-10">
        <Outlet />
      </main>

      {/* フッター */}
      <footer className="relative z-10 border-t border-glass-border py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-text-muted">
          <p>&copy; 2026 Cocktail Book</p>
        </div>
      </footer>
    </div>
  );
}
