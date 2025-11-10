
import React, { useState, useCallback, useEffect } from 'react';
import { Section, Scheme } from '../types';
import { INDIAN_STATES } from '../constants';
import { fetchSchemes } from '../services/geminiService';

const Schemes: React.FC = () => {
  const [selectedState, setSelectedState] = useState('');
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [loading, setLoading] = useState(false);

  const getSchemes = useCallback(async () => {
    if (!selectedState) return;
    setLoading(true);
    setSchemes([]);
    const fetchedSchemes = await fetchSchemes(selectedState);
    setSchemes(fetchedSchemes);
    setLoading(false);
  }, [selectedState]);
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
      if(selectedState) {
          getSchemes();
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedState]);


  return (
    <section id={Section.SCHEMES} className="py-20 bg-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800">
            Government <span className="text-green-600">Schemes</span>
          </h2>
          <p className="text-gray-600 mt-4">Find relevant government schemes for farmers in your state.</p>
        </div>
        <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-6">
          <label htmlFor="state-select" className="block text-sm font-medium text-gray-700 mb-2">Select your state:</label>
          <select
            id="state-select"
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="w-full px-4 py-3 text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">-- Select a State --</option>
            {INDIAN_STATES.map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>

        <div className="mt-12">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <i className="fas fa-spinner fa-spin text-green-600 text-4xl"></i>
              <span className="ml-4 text-lg text-gray-700">Loading schemes for {selectedState}...</span>
            </div>
          ) : schemes.length > 0 ? (
            <div className="space-y-6">
              {schemes.map((scheme, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6 animate-fade-in-up">
                  <h3 className="text-2xl font-bold text-green-700 mb-3">{scheme.schemeName}</h3>
                  <p className="text-gray-700 mb-4">{scheme.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Eligibility</h4>
                      <p className="text-sm text-gray-600">{scheme.eligibility}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Benefits</h4>
                      <p className="text-sm text-gray-600">{scheme.benefits}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
             selectedState && <p className="text-center text-gray-600">No schemes to display for {selectedState}.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Schemes;
