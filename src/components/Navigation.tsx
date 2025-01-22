import { BookOpen, FileText, User2, Wallet, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { connectWallet } from '../utils/ethereum';

export function Navigation() {
  const [address, setAddress] = useState<string>('');
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    try {
      setIsConnecting(true);
      const signer = await connectWallet();
      const address = await signer.getAddress();
      setAddress(address.slice(0, 6) + '...' + address.slice(-4));
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <nav className="bg-dark-900 border-b border-dark-700">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6 text-emerald-400" />
            <span className="font-bold text-xl text-white">OpenReview</span>
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link to="/papers" className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors">
              <FileText className="h-5 w-5" />
              <span>Papers</span>
            </Link>
            <Link to="/community" className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors">
              <Users className="h-5 w-5" />
              <span>Community</span>
            </Link>
            <Link to="/profile" className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors">
              <User2 className="h-5 w-5" />
              <span>Profile</span>
            </Link>
            {!address ? (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  Register
                </Link>
                <button
                  onClick={handleConnect}
                  disabled={isConnecting}
                  className="flex items-center space-x-2 px-4 py-2 rounded-md bg-emerald-400 hover:bg-emerald-500 text-dark-900 transition-colors emerald-glow"
                >
                  <Wallet className="h-5 w-5" />
                  <span>Connect Wallet</span>
                </button>
              </div>
            ) : (
              <button
                className="flex items-center space-x-2 px-4 py-2 rounded-md bg-emerald-400 hover:bg-emerald-500 text-dark-900 transition-colors emerald-glow"
              >
                <Wallet className="h-5 w-5" />
                <span>{address}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}