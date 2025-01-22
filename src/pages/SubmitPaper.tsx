import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, X } from 'lucide-react';
import { submitPaperToBlockchain } from '../utils/ethereum';

export function SubmitPaper() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [abstract, setAbstract] = useState('');
  const [field, setField] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // In a real app, you would upload the PDF to IPFS here
      const mockIpfsHash = "QmXgZV8HkrfJ";
      
      const txHash = await submitPaperToBlockchain(
        title,
        abstract,
        field,
        mockIpfsHash
      );

      console.log('Paper submitted successfully:', txHash);
      navigate('/papers');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit paper');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Submit Paper</h1>
          <button 
            onClick={() => navigate('/papers')}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-4 text-red-700 bg-red-100 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label htmlFor="abstract" className="block text-sm font-medium text-gray-700">
              Abstract
            </label>
            <textarea
              id="abstract"
              rows={4}
              value={abstract}
              onChange={(e) => setAbstract(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label htmlFor="field" className="block text-sm font-medium text-gray-700">
              Field
            </label>
            <select
              id="field"
              value={field}
              onChange={(e) => setField(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            >
              <option value="">Select a field</option>
              <option value="cs">Computer Science</option>
              <option value="physics">Physics</option>
              <option value="biology">Biology</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Paper PDF
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <FileText className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500">
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      type="file"
                      className="sr-only"
                      accept=".pdf"
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                    />
                  </label>
                </div>
                <p className="text-xs text-gray-500">PDF up to 10MB</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate('/papers')}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Paper'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}