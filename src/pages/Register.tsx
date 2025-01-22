import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User2, Building, Briefcase, Globe } from 'lucide-react';

export function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    title: '',
    institution: '',
    expertise: '',
    bio: '',
    website: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      setIsSubmitting(false);
      return;
    }

    try {
      // Here you would typically make an API call to register the user
      // For now, we'll just simulate success
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/profile');
    } catch (err) {
      setError('Failed to register. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 gradient-text">Join Our Community</h1>
        <p className="text-gray-400">
          Create your academic profile and start contributing to the research community
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-900/50 border border-red-700 rounded-md text-red-200">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="gradient-border p-6 space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Full Name
            </label>
            <div className="relative">
              <User2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 bg-dark-800 border border-dark-700 rounded-md text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
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
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 bg-dark-800 border border-dark-700 rounded-md text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                required
                minLength={8}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 bg-dark-800 border border-dark-700 rounded-md text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                required
                minLength={8}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Title
            </label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Research Scientist, Professor"
                className="w-full pl-10 pr-4 py-2 bg-dark-800 border border-dark-700 rounded-md text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Institution
            </label>
            <div className="relative">
              <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="institution"
                value={formData.institution}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 bg-dark-800 border border-dark-700 rounded-md text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                required
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Areas of Expertise
          </label>
          <input
            type="text"
            name="expertise"
            value={formData.expertise}
            onChange={handleChange}
            placeholder="e.g., Machine Learning, Climate Science (comma separated)"
            className="w-full px-4 py-2 bg-dark-800 border border-dark-700 rounded-md text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Bio
          </label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 bg-dark-800 border border-dark-700 rounded-md text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
            placeholder="Tell us about your research interests and experience"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Website (Optional)
          </label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="https://"
              className="w-full pl-10 pr-4 py-2 bg-dark-800 border border-dark-700 rounded-md text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-6 py-2 text-gray-300 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-emerald-400 text-dark-900 rounded-md hover:bg-emerald-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed emerald-glow"
          >
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </button>
        </div>
      </form>
    </div>
  );
}