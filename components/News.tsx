
import React, { useState, useEffect } from 'react';
import { Section, NewsArticle } from '../types';
import { fetchNews } from '../services/geminiService';

const News: React.FC = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getNews = async () => {
      setLoading(true);
      const newsArticles = await fetchNews();
      setArticles(newsArticles);
      setLoading(false);
    };

    getNews();
  }, []);

  return (
    <section id={Section.NEWS} className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800">
            Farmers' <span className="text-green-600">Live News</span>
          </h2>
          <p className="text-gray-600 mt-4">Stay updated with the latest happenings in the agricultural world.</p>
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <i className="fas fa-spinner fa-spin text-green-600 text-4xl"></i>
            <span className="ml-4 text-lg text-gray-700">Fetching latest news...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
                <div className="p-6">
                  <span className="text-xs font-semibold text-gray-500 uppercase">{article.source} - {article.publishedDate}</span>
                  <h3 className="text-xl font-bold text-gray-800 mt-2 mb-3 h-20">{article.headline}</h3>
                  <p className="text-gray-700 text-sm leading-relaxed h-24 overflow-hidden">{article.summary}</p>
                  <a href="#" className="text-green-600 hover:text-green-800 font-semibold mt-4 inline-block">
                    Read More <i className="fas fa-arrow-right ml-1"></i>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default News;
