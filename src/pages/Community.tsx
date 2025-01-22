import { useState } from 'react';
import { Search, Filter, Award, Star, BookOpen, ThumbsUp, MessageSquare } from 'lucide-react';
import { User } from '../types';
import { ChatForum } from '../components/ChatForum';

const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Dr. Sarah Chen',
    title: 'Research Scientist',
    institution: 'Climate Research Institute',
    expertise: ['Machine Learning', 'Climate Science'],
    papers: [],
    reviews: [],
    bio: 'Research scientist focusing on machine learning applications in climate science.',
    stats: {
      totalPapers: 12,
      totalReviews: 28,
      averageRating: 4.5,
      helpfulVotes: 156
    },
    badges: [],
    socialLinks: {}
  }
];

export function Community() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [activeTab, setActiveTab] = useState<'members' | 'forum'>('members');

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 gradient-text">Research Community</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Connect with leading researchers and reviewers in your field. Build your academic network
          and collaborate on groundbreaking research.
        </p>
      </div>

      <div className="flex space-x-4 border-b border-dark-700">
        <button
          onClick={() => setActiveTab('members')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'members'
              ? 'text-emerald-400 border-b-2 border-emerald-400'
              : 'text-gray-400 hover:text-gray-300'
          }`}
        >
          Members
        </button>
        <button
          onClick={() => setActiveTab('forum')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'forum'
              ? 'text-emerald-400 border-b-2 border-emerald-400'
              : 'text-gray-400 hover:text-gray-300'
          }`}
        >
          Discussion Forum
        </button>
      </div>

      {activeTab === 'members' ? (
        <>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search researchers..."
                className="w-full pl-10 pr-4 py-2 bg-dark-800 border border-dark-700 rounded-md text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                className="pl-10 pr-8 py-2 bg-dark-800 border border-dark-700 rounded-md text-white focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All Members</option>
                <option value="researchers">Researchers</option>
                <option value="reviewers">Reviewers</option>
                <option value="top">Top Contributors</option>
              </select>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {MOCK_USERS.map((user) => (
              <div key={user.id} className="gradient-border p-6 space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-emerald-400/10 rounded-full p-3">
                    <span className="text-lg font-medium text-emerald-400">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{user.name}</h3>
                    <p className="text-gray-400">{user.title}</p>
                  </div>
                </div>

                <div className="text-gray-300">{user.bio}</div>

                <div className="flex flex-wrap gap-2">
                  {user.expertise.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 text-sm bg-emerald-400/10 text-emerald-400 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-dark-700">
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1">
                      <BookOpen className="h-4 w-4 text-emerald-400" />
                      <span className="text-lg font-semibold text-white">
                        {user.stats.totalPapers}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400">Papers</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1">
                      <Star className="h-4 w-4 text-emerald-400" />
                      <span className="text-lg font-semibold text-white">
                        {user.stats.totalReviews}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400">Reviews</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <ChatForum />
      )}
    </div>
  );
}