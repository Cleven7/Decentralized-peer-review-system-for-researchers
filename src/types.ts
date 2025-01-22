export interface Paper {
  id: string;
  title: string;
  abstract: string;
  author: User;
  field: string;
  status: 'pending' | 'under_review' | 'accepted' | 'rejected';
  dateSubmitted: string;
  reviews: Review[];
  viewCount: number;
}

export interface Review {
  id: string;
  reviewer: User;
  paper: Paper;
  rating: number;
  comments: string;
  dateSubmitted: string;
  helpfulVotes: number;
}

export interface User {
  id: string;
  name: string;
  title: string;
  institution: string;
  expertise: string[];
  papers: Paper[];
  reviews: Review[];
  bio: string;
  avatarUrl?: string;
  socialLinks: {
    website?: string;
    twitter?: string;
    github?: string;
    orcid?: string;
  };
  stats: {
    totalPapers: number;
    totalReviews: number;
    averageRating: number;
    helpfulVotes: number;
  };
  badges: Badge[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  dateEarned: string;
}