import { ArrowRight, BookOpen, Users, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Home() {
  return (
    <div className="space-y-16 text-white">
      <section className="text-center py-16">
        <h1 className="text-6xl font-bold mb-6 gradient-text">
          Open Review Platform
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Start your project with seamless peer reviews, authentication, and instant API access.
          Scale to millions of users.
        </p>
        <div className="mt-10">
          <Link
            to="/papers"
            className="inline-flex items-center px-6 py-3 text-base font-medium rounded-md text-dark-900 bg-emerald-400 hover:bg-emerald-500 transition-colors emerald-glow"
          >
            Start your research <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-8">
        <div className="gradient-border p-8">
          <div className="bg-emerald-400/10 rounded-full p-3 w-12 h-12 mb-4">
            <BookOpen className="h-6 w-6 text-emerald-400" />
          </div>
          <h3 className="text-xl font-semibold mb-3 text-white">Submit Research</h3>
          <p className="text-gray-400">Share your work with the academic community and receive valuable feedback.</p>
        </div>
        
        <div className="gradient-border p-8">
          <div className="bg-emerald-400/10 rounded-full p-3 w-12 h-12 mb-4">
            <Users className="h-6 w-6 text-emerald-400" />
          </div>
          <h3 className="text-xl font-semibold mb-3 text-white">Peer Review</h3>
          <p className="text-gray-400">Contribute to the academic discourse by reviewing papers in your field.</p>
        </div>
        
        <div className="gradient-border p-8">
          <div className="bg-emerald-400/10 rounded-full p-3 w-12 h-12 mb-4">
            <Star className="h-6 w-6 text-emerald-400" />
          </div>
          <h3 className="text-xl font-semibold mb-3 text-white">Build Reputation</h3>
          <p className="text-gray-400">Gain recognition for your contributions to the scientific community.</p>
        </div>
      </section>
    </div>
  );
}