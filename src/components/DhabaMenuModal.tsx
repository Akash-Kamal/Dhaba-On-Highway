import React, { useState } from 'react';
import { X, ShoppingBag, Utensils, CheckCircle, Sparkles } from 'lucide-react';
import { ambientSynth } from '../utils/audioSynth';


interface DhabaMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MenuItem {
  id: string;
  name: string;
  category: 'paratha' | 'sabzi' | 'snacks' | 'chai';
  price: number;
  desc: string;
}

const MENU_ITEMS: MenuItem[] = [
  { id: '1', name: 'Aloo Paratha', category: 'paratha', price: 60, desc: 'Served with fresh white butter & achaar' },
  { id: '2', name: 'Paneer Paratha', category: 'paratha', price: 90, desc: 'Stuffed with spiced cottage cheese' },
  { id: '3', name: 'Pyaz Paratha', category: 'paratha', price: 70, desc: 'Crispy onion paratha' },
  { id: '4', name: 'Dal Tadka', category: 'sabzi', price: 80, desc: 'Yellow dal with desi ghee tadka' },
  { id: '5', name: 'Mix Veg', category: 'sabzi', price: 100, desc: 'Fresh seasonal vegetables' },
  { id: '6', name: 'Jeera Rice', category: 'sabzi', price: 80, desc: 'Basmati rice with cumin' },
  { id: '7', name: 'Highway Maggi', category: 'snacks', price: 60, desc: 'Late night 2-minute spiced maggi' },
  { id: '8', name: 'Egg Bhurji', category: 'snacks', price: 90, desc: '3-egg masala scrambled bhurji' },
  { id: '9', name: 'Cutting Chai', category: 'chai', price: 20, desc: 'Strong highway tapri chai' },
  { id: '10', name: 'Adrak Chai', category: 'chai', price: 25, desc: 'Fresh crushed ginger chai' },
  { id: '11', name: 'Elaichi Chai', category: 'chai', price: 25, desc: 'Cardamom infused tea' },
  { id: '12', name: 'Special Dhaba Chai', category: 'chai', price: 30, desc: 'Thick kulhad milk tea' },
];

export const DhabaMenuModal: React.FC<DhabaMenuModalProps> = ({ isOpen, onClose }) => {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [orderState, setOrderState] = useState<'selecting' | 'preparing' | 'ready' | 'paid'>('selecting');

  if (!isOpen) return null;

  const handleAddToCart = (id: string) => {
    ambientSynth.playKitchenSound();
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const handleRemoveFromCart = (id: string) => {
    setCart((prev) => {
      const copy = { ...prev };
      if (copy[id] > 1) {
        copy[id] -= 1;
      } else {
        delete copy[id];
      }
      return copy;
    });
  };

  const totalAmount = Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = MENU_ITEMS.find((m) => m.id === id);
    return sum + (item ? item.price * qty : 0);
  }, 0);

  const handlePlaceOrder = () => {
    ambientSynth.playKitchenSound();
    setOrderState('preparing');
    setTimeout(() => {
      setOrderState('ready');
    }, 2800);
  };

  const handlePayBill = () => {
    ambientSynth.playChaiSound();
    setOrderState('paid');
    setTimeout(() => {
      setCart({});
      setOrderState('selecting');
      onClose();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md select-none animate-title-in">
      <div className="relative w-full max-w-lg bg-[#1f150c] border-2 border-amber-600/40 rounded-2xl shadow-2xl p-5 sm:p-6 text-amber-100 space-y-4 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-amber-400/80 hover:text-amber-100 p-1 rounded-full hover:bg-amber-950/60 transition-colors cursor-pointer"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Vintage Header */}
        <div className="text-center pb-3 border-b border-amber-600/30">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-amber-400 uppercase">
            <Utensils className="w-4 h-4 text-amber-400" />
            <span>ESTD. 1994 • HIGHWAY DHABA</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl text-amber-200 tracking-wider gold-text-gradient uppercase leading-none mt-1">
            GOLU DHABA SPECIAL MENU
          </h2>
          <p className="text-xs font-devanagari text-amber-400/70 mt-1">
            गर्म गरम पराठे, दाल तड़का और कड़क अदरक चाय ☕
          </p>
        </div>

        {/* Order State Screens */}
        {orderState === 'preparing' && (
          <div className="py-12 text-center space-y-3 animate-pulse">
            <div className="text-4xl">⏳</div>
            <h3 className="font-display text-2xl text-amber-300">ORDER RECEIVED</h3>
            <p className="text-sm font-devanagari text-amber-200">
              भैया रसोई में गरम गरम बना रहे हैं...
            </p>
          </div>
        )}

        {orderState === 'ready' && (
          <div className="py-8 text-center space-y-4">
            <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
            <h3 className="font-display text-3xl text-amber-100">ORDER READY 🍽️</h3>
            <p className="text-sm font-devanagari text-amber-300">
              आपका खाना तैयार है! गरम गरम लंच/डिनर का आनंद लें।
            </p>

            <div className="p-4 rounded-xl bg-black/60 border border-amber-500/30 text-left text-xs font-mono space-y-1">
              <div className="text-amber-400 font-bold border-b border-amber-950 pb-1">RECEIPT (GOLU DHABA)</div>
              {Object.entries(cart).map(([id, qty]) => {
                const item = MENU_ITEMS.find((m) => m.id === id);
                return (
                  <div key={id} className="flex justify-between">
                    <span>{qty} × {item?.name}</span>
                    <span>₹{(item?.price || 0) * qty}</span>
                  </div>
                );
              })}
              <div className="flex justify-between font-bold text-amber-300 border-t border-amber-950 pt-1">
                <span>TOTAL AMOUNT</span>
                <span>₹{totalAmount}</span>
              </div>
            </div>

            <button
              onClick={handlePayBill}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-800 text-amber-950 font-bold text-sm uppercase tracking-wider shadow-lg hover:brightness-110 active:scale-95 cursor-pointer"
            >
              PAY IMAGINARY BILL (PAID WITH GOOD MEMORIES)
            </button>
          </div>
        )}

        {orderState === 'paid' && (
          <div className="py-12 text-center space-y-3">
            <Sparkles className="w-12 h-12 text-amber-300 mx-auto animate-spin" />
            <h3 className="font-display text-3xl text-amber-200">PAYMENT SUCCESSFUL ❤️</h3>
            <p className="text-base font-devanagari text-amber-100">
              “फिर आना साहब! सफर में ध्यान रखिएगा।”
            </p>
            <div className="text-xs font-mono text-amber-400/80">
              PAID WITH GOOD MEMORIES • ₹0.00 REAL COST
            </div>
          </div>
        )}

        {orderState === 'selecting' && (
          <div className="space-y-4">
            {/* Menu Sections */}
            <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-1">
              {['paratha', 'sabzi', 'snacks', 'chai'].map((cat) => {
                const items = MENU_ITEMS.filter((m) => m.category === cat);
                const titles: Record<string, string> = {
                  paratha: '🫓 DESI TANDOORI PARATHE',
                  sabzi: '🍲 SABZI & BASMATI RICE',
                  snacks: '🍳 HIGHWAY SNACKS & MAGGI',
                  chai: '☕ TAPRI & KULHAD CHAI',
                };

                return (
                  <div key={cat} className="space-y-2">
                    <h3 className="text-xs font-mono font-bold text-amber-400/90 tracking-wider uppercase border-b border-amber-900/40 pb-1">
                      {titles[cat]}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {items.map((item) => {
                        const qty = cart[item.id] || 0;
                        return (
                          <div
                            key={item.id}
                            className="p-2.5 rounded-lg bg-black/50 border border-amber-900/30 flex items-center justify-between gap-2"
                          >
                            <div className="min-w-0">
                              <div className="text-xs font-semibold text-amber-100 truncate">
                                {item.name}
                              </div>
                              <div className="text-[10px] text-amber-400/70 font-mono">
                                ₹{item.price}
                              </div>
                            </div>

                            <div className="flex items-center gap-1 shrink-0">
                              {qty > 0 ? (
                                <div className="flex items-center gap-1 bg-amber-950 border border-amber-700 px-2 py-0.5 rounded text-xs font-mono">
                                  <button onClick={() => handleRemoveFromCart(item.id)} className="text-amber-300 font-bold px-1 cursor-pointer">-</button>
                                  <span>{qty}</span>
                                  <button onClick={() => handleAddToCart(item.id)} className="text-amber-300 font-bold px-1 cursor-pointer">+</button>
                                </div>
                              ) : (
                                <button
                                  onClick={() => handleAddToCart(item.id)}
                                  className="px-2.5 py-1 rounded bg-amber-900/60 hover:bg-amber-800 border border-amber-600/40 text-[11px] font-mono text-amber-200 font-semibold cursor-pointer transition-colors"
                                >
                                  + ADD
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Tray Summary Footer */}
            {totalAmount > 0 && (
              <div className="pt-3 border-t border-amber-600/30 flex items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-mono text-amber-400">YOUR ORDER TRAY</div>
                  <div className="text-lg font-bold text-amber-100 font-mono">₹{totalAmount}</div>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-800 text-amber-950 font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 cursor-pointer flex items-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>PLACE ORDER</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
