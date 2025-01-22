import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';

export function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      // Here you would typically make an API call to authenticate the user
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/community');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 gradient-text">Welcome Back</h1>
        <p className="text-gray-400">
          Sign in to continue your research journey
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-900/50 border border-red-700 rounded-md text-red-200">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="gradient-border p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full pl-10 pr-4 py-2 bg-dark-800 border border-dark-700 rounded-md text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              className="w-full pl-10 pr-4 py-2 bg-dark-800 border border-dark-700 rounded-md text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2 bg-emerald-400 text-dark-900 rounded-md hover:bg-emerald-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed emerald-glow"
        >
          {isSubmitting ? 'Signing in...' : 'Sign In'}
        </button>

        <div className="text-center text-sm text-gray-400">
          Don't have an account?{' '}
          <Link to="/register" className="text-emerald-400 hover:text-emerald-300">
            Register here
          </Link>
        </div>
      </form>
    </div>
  );
}