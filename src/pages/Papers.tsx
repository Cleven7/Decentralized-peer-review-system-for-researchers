import { useState, useCallback } from 'react';
import { PaperCard } from '../components/PaperCard';
import { Paper } from '../types';
import { Search, Filter, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MOCK_PAPERS: Paper[] = [
  {
    id: '1',
    title: 'Machine Learning Approaches to Climate Change Prediction',
    abstract: 'This paper explores novel machine learning techniques for improving climate change predictions, focusing on the integration of multiple data sources and advanced neural network architectures. We present a comprehensive analysis of various approaches and their effectiveness in predicting climate patterns.',
    author: {
      id: '1',
      name: 'Dr. Sarah Chen',
      title: 'Research Scientist',
      institution: 'Climate Research Institute',
      expertise: ['Machine Learning', 'Climate Science'],
      papers: [],
      reviews: []
    },
    field: 'Computer Science',
    status: 'under_review',
    dateSubmitted: '2024-03-15',
    reviews: [
      {
        id: '1',
        reviewer: {
          id: '2',
          name: 'Dr. John Smith',
          title: 'Professor',
          institution: 'Tech University',
          expertise: ['AI', 'Machine Learning'],
          papers: [],
          reviews: []
        },
        paper: null as any, // Circular reference handled in actual implementation
        rating: 4,
        comments: 'A well-structured paper with innovative approaches to climate prediction. The methodology is sound and the results are promising.',
        dateSubmitted: '2024-03-16'
      }
    ]
  }
];

export function Papers() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [field, setField] = useState('all');
  const [papers, setPapers] = useState(MOCK_PAPERS);

  const handleReviewSubmitted = useCallback(() => {
    // In a real app, you would fetch updated paper data here
    console.log('Review submitted, refreshing papers...');
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold text-white">Research Papers</h1>
        <button 
          onClick={() => navigate('/submit')}
          className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-500 transition-colors purple-glow"
        >
          <Plus className="h-5 w-5 mr-1" />
          Submit Paper
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search papers..."
            className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <select
            className="pl-10 pr-8 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            value={field}
            onChange={(e) => setField(e.target.value)}
          >
            <option value="all">All Fields</option>
            <option value="cs">Computer Science</option>
            <option value="physics">Physics</option>
            <option value="biology">Biology</option>
          </select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {papers.map((paper) => (
          <PaperCard 
            key={paper.id} 
            paper={paper}
            onReviewSubmitted={handleReviewSubmitted}
          />
        ))}
      </div>
    </div>
  );
}