import { Mail, MapPin, BookOpen, Star, Globe, Building, Briefcase } from 'lucide-react';

const MOCK_USER = {
  name: 'Dr. Sarah Chen',
  title: 'Research Scientist',
  institution: 'Climate Research Institute',
  email: 'sarah.chen@example.com',
  location: 'San Francisco, CA',
  expertise: ['Machine Learning', 'Climate Science', 'Data Analysis'],
  papers: 12,
  reviews: 28,
  bio: 'Research scientist focusing on applications of machine learning in climate science. Published in leading journals and conferences.',
  website: 'https://example.com'
};

export function Profile() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 gradient-text">Your Profile</h1>
        <p className="text-gray-400">
          Manage your academic profile and track your contributions
        </p>
      </div>

      <div className="gradient-border p-8 space-y-8">
        <div className="flex items-center space-x-6">
          <div className="w-24 h-24 rounded-full bg-emerald-400/10 flex items-center justify-center text-2xl font-medium text-emerald-400">
            {MOCK_USER.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">{MOCK_USER.name}</h2>
            <p className="text-gray-400">{MOCK_USER.title}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-gray-300">
              <Mail className="h-5 w-5 text-emerald-400" />
              <span>{MOCK_USER.email}</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-300">
              <Building className="h-5 w-5 text-emerald-400" />
              <span>{MOCK_USER.institution}</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-300">
              <MapPin className="h-5 w-5 text-emerald-400" />
              <span>{MOCK_USER.location}</span>
            </div>
            {MOCK_USER.website && (
              <div className="flex items-center space-x-3 text-gray-300">
                <Globe className="h-5 w-5 text-emerald-400" />
                <a href={MOCK_USER.website} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300">
                  {MOCK_USER.website}
                </a>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="gradient-border p-4 text-center">
              <div className="flex items-center justify-center space-x-2">
                <BookOpen className="h-6 w-6 text-emerald-400" />
                <span className="text-2xl font-bold text-white">{MOCK_USER.papers}</span>
              </div>
              <p className="text-gray-400 mt-1">Papers</p>
            </div>
            <div className="gradient-border p-4 text-center">
              <div className="flex items-center justify-center space-x-2">
                <Star className="h-6 w-6 text-emerald-400" />
                <span className="text-2xl font-bold text-white">{MOCK_USER.reviews}</span>
              </div>
              <p className="text-gray-400 mt-1">Reviews</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-3">About</h3>
          <p className="text-gray-300">{MOCK_USER.bio}</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Areas of Expertise</h3>
          <div className="flex flex-wrap gap-2">
            {MOCK_USER.expertise.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 bg-emerald-400/10 text-emerald-400 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            className="px-4 py-2 text-sm font-medium text-dark-900 bg-emerald-400 rounded-md hover:bg-emerald-500 transition-colors emerald-glow"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}