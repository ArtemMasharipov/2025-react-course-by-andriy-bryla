import TaskDescription from '../../shared/components/TaskDescription.jsx';
import TaskLayout from '../../shared/components/layouts/TaskLayout.jsx';

import { SEARCH_RESULTS } from './constants.js';

const SearchResult = ({ result }) => {
  return (
    <div
      className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
    >
      <div className="flex flex-col space-y-3">
        <div>
          <h3 className="text-xl font-semibold text-blue-600 hover:text-blue-800 transition-colors">
            <a
              href={result.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2"
              aria-label={`Відкрити статтю: ${result.title}`}
            >
              <span>{result.title}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {result.link}
          </p>
        </div>

        <p className="text-gray-700 leading-relaxed">
          {result.description}
        </p>

        <div className="flex flex-wrap gap-2 pt-2">
          {result.tags.map(tag => (
            <span
              key={tag}
              className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const TaskSearch = () => {
  return (
    <TaskLayout>
      <TaskDescription taskId={5} />

      <div className="space-y-4">
        {SEARCH_RESULTS.map((result, index) => (
          <SearchResult
            key={result.id}
            result={result}
            index={index}
          />
        ))}
      </div>
    </TaskLayout>
  );
};

export default TaskSearch;
