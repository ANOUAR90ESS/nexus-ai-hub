import React from 'react';

interface AdUnitProps {
  format?: 'horizontal' | 'rectangle' | 'vertical';
  className?: string;
}

const AdUnit: React.FC<AdUnitProps> = ({ format = 'horizontal', className = '' }) => {
  // This component simulates a Google AdSense unit.
  // In a real production app, you would place your <ins class="adsbygoogle"> code here.
  
  let sizeClasses = '';
  if (format === 'horizontal') sizeClasses = 'w-full h-[90px] max-w-[728px]'; // Leaderboard
  if (format === 'rectangle') sizeClasses = 'w-[300px] h-[250px]'; // Medium Rectangle
  if (format === 'vertical') sizeClasses = 'w-[160px] h-[600px]'; // Skyscraper

  return (
    <div className={`flex flex-col items-center justify-center my-6 ${className}`}>
        <div className="text-[10px] text-zinc-600 uppercase tracking-widest mb-1 w-full text-center">Advertisement</div>
        <div 
            className={`${sizeClasses} bg-zinc-900 border border-zinc-800 border-dashed rounded-lg flex flex-col items-center justify-center relative overflow-hidden group cursor-pointer`}
            title="AdSense Placeholder"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/20 to-zinc-900/20 z-0"></div>
            
            {/* Fake Ad Content */}
            <div className="z-10 text-center p-4">
                <span className="text-zinc-500 font-bold text-xs block mb-1">Sponsored</span>
                <span className="text-zinc-300 font-medium text-sm">Discover Premium AI Tools</span>
                <button className="mt-2 bg-indigo-600/20 text-indigo-400 text-[10px] px-2 py-1 rounded border border-indigo-600/30 hover:bg-indigo-600 hover:text-white transition-colors">
                    Learn More
                </button>
            </div>
            
            {/* Google Ads overlay simulation */}
            <div className="absolute top-0 right-0 p-1">
                <div className="w-3 h-3 bg-zinc-700 rounded-bl text-[8px] flex items-center justify-center text-zinc-400">i</div>
            </div>
        </div>
    </div>
  );
};

export default AdUnit;