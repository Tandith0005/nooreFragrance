"use client";
import React, { useState } from 'react';

// Move FilterContent outside the main component
interface FilterContentProps {
  selectedNotes: string[];
  selectedIntensity: string;
  selectedGender: string;
  priceRange: [number, number];
  sortBy: string;
  notesOptions: string[];
  intensityOptions: string[];
  genderOptions: string[];
  sortOptions: { value: string; label: string }[];
  handleNoteChange: (note: string) => void;
  handleIntensityChange: (intensity: string) => void;
  handleGenderChange: (gender: string) => void;
  handlePriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setPriceRange: React.Dispatch<React.SetStateAction<[number, number]>>;
  setSortBy: (value: string) => void;  
  applyFilters: () => void;
  clearAllFilters: () => void;
}

const FilterContent: React.FC<FilterContentProps> = ({
  selectedNotes,
  selectedIntensity,
  selectedGender,
  priceRange,
  sortBy,
  notesOptions,
  intensityOptions,
  genderOptions,
  sortOptions,
  handleNoteChange,
  handleIntensityChange,
  handleGenderChange,
  handlePriceChange,
  setPriceRange,
  setSortBy,  // Receive setSortBy from parent
  applyFilters,
  clearAllFilters,
}) => (
  <div className="space-y-8">
    {/* Sort By Section */}
    <div className="space-y-3">
      <h3 className="text-primary font-heading text-lg font-semibold">Sort By</h3>
      <div className="space-y-2">
        {sortOptions.map((option) => (
          <label key={option.value} className="flex items-center gap-3 cursor-pointer group">
            <input
              type="radio"
              name="sortBy"
              value={option.value}
              checked={sortBy === option.value}
              onChange={() => setSortBy(option.value)}  // Fixed: directly call setSortBy
              className="w-4 h-4 text-secondary border-secondary/30 focus:ring-secondary focus:ring-offset-0"
            />
            <span className="text-secondary-light text-sm group-hover:text-secondary transition-colors">
              {option.label}
            </span>
          </label>
        ))}
      </div>
    </div>

    {/* Divider */}
    <div className="h-px bg-secondary/20" />

    {/* Notes Section (Multiple Selection) */}
    <div className="space-y-3">
      <h3 className="text-primary font-heading text-lg font-semibold">Notes</h3>
      <div className="flex flex-wrap gap-2">
        {notesOptions.map((note) => (
          <label
            key={note}
            className={`
              cursor-pointer px-3 py-1.5 rounded-full text-sm transition-all duration-200
              ${selectedNotes.includes(note) 
                ? 'bg-secondary text-white shadow-md' 
                : 'bg-secondary/10 text-secondary hover:bg-secondary/20'
              }
            `}
          >
            <input
              type="checkbox"
              value={note}
              checked={selectedNotes.includes(note)}
              onChange={() => handleNoteChange(note)}
              className="hidden"
            />
            {note}
          </label>
        ))}
      </div>
    </div>

    {/* Divider */}
    <div className="h-px bg-secondary/20" />

    {/* Intensity Section (Single Selection) */}
    <div className="space-y-3">
      <h3 className="text-primary font-heading text-lg font-semibold">Intensity</h3>
      <div className="space-y-2">
        {intensityOptions.map((intensity) => (
          <label key={intensity} className="flex items-center gap-3 cursor-pointer group">
            <input
              type="radio"
              name="intensity"
              value={intensity}
              checked={selectedIntensity === intensity}
              onChange={() => handleIntensityChange(intensity)}
              className="w-4 h-4 text-secondary border-secondary/30 focus:ring-secondary focus:ring-offset-0"
            />
            <span className="text-secondary-light text-sm group-hover:text-secondary transition-colors">
              {intensity}
            </span>
          </label>
        ))}
      </div>
    </div>

    {/* Divider */}
    <div className="h-px bg-secondary/20" />

    {/* Gender Section (Single Selection) */}
    <div className="space-y-3">
      <h3 className="text-primary font-heading text-lg font-semibold">Gender</h3>
      <div className="space-y-2">
        {genderOptions.map((gender) => (
          <label key={gender} className="flex items-center gap-3 cursor-pointer group">
            <input
              type="radio"
              name="gender"
              value={gender}
              checked={selectedGender === gender}
              onChange={() => handleGenderChange(gender)}
              className="w-4 h-4 text-secondary border-secondary/30 focus:ring-secondary focus:ring-offset-0"
            />
            <span className="text-secondary-light text-sm group-hover:text-secondary transition-colors">
              {gender}
            </span>
          </label>
        ))}
      </div>
    </div>

    {/* Divider */}
    <div className="h-px bg-secondary/20" />

    {/* Price Range Section */}
    <div className="space-y-3">
      <h3 className="text-primary font-heading text-lg font-semibold">Price Range</h3>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <label className="text-secondary-light text-xs mb-1 block">Min ($)</label>
            <input
              type="number"
              name="min"
              value={priceRange[0]}
              onChange={handlePriceChange}
              min={0}
              max={priceRange[1]}
              className="w-full px-3 py-2 rounded-lg bg-white/50 dark:bg-white/5 border border-secondary/20 focus:border-secondary focus:outline-none text-sm text-primary"
            />
          </div>
          <span className="text-secondary-light">—</span>
          <div className="flex-1">
            <label className="text-secondary-light text-xs mb-1 block">Max ($)</label>
            <input
              type="number"
              name="max"
              value={priceRange[1]}
              onChange={handlePriceChange}
              min={priceRange[0]}
              max={30000}
              className="w-full px-3 py-2 rounded-lg bg-white/50 dark:bg-white/5 border border-secondary/20 focus:border-secondary focus:outline-none text-sm text-primary"
            />
          </div>
        </div>
        
        {/* Range Slider */}
        <div className="relative pt-2">
          <input
            type="range"
            min={0}
            max={30000}
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
            className="w-full h-1.5 bg-secondary/20 rounded-lg appearance-none cursor-pointer accent-secondary"
          />
          <div className="flex justify-between text-xs text-secondary-light mt-2">
            <span>$0</span>
            <span>$10k</span>
            <span>$20k</span>
            <span>$30k</span>
          </div>
        </div>
      </div>
    </div>

    {/* Divider */}
    <div className="h-px bg-secondary/20" />

    {/* Action Buttons */}
    <div className="space-y-3">
      <button
        onClick={applyFilters}
        className="w-full py-2.5 rounded-full bg-secondary text-white text-sm font-medium hover:bg-secondary/80 transition-all duration-300 shadow-md"
      >
        Apply Filters
      </button>
      
      <button
        onClick={clearAllFilters}
        className="w-full py-2.5 rounded-full border border-secondary/30 text-secondary text-sm font-medium hover:bg-secondary/10 transition-all duration-300"
      >
        Clear All Filters
      </button>
    </div>
  </div>
);

const ShopFilter = () => {
  // State for Notes (multiple selection)
  const [selectedNotes, setSelectedNotes] = useState<string[]>([]);
  
  // State for Intensity (single selection)
  const [selectedIntensity, setSelectedIntensity] = useState<string>('');
  
  // State for Gender (single selection)
  const [selectedGender, setSelectedGender] = useState<string>('');
  
  // State for Price Range
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 30000]);
  
  // State for Sort By
  const [sortBy, setSortBy] = useState<string>('');

  // Mobile sidebar state
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  // Notes options
  const notesOptions: string[] = ['Vanilla', 'Rose', 'Oud', 'Sandalwood', 'Citrus', 'Jasmine', 'Musk', 'Lavender'];
  
  // Intensity options
  const intensityOptions: string[] = ['Light', 'Moderate', 'Strong', 'Extreme'];
  
  // Gender options
  const genderOptions: string[] = ['Men', 'Women', 'Unisex'];
  
  // Sort By options
  const sortOptions: { value: string; label: string }[] = [
    { value: 'price_asc', label: 'Price: Low → High' },
    { value: 'price_desc', label: 'Price: High → Low' },
    { value: 'newest', label: 'Newest' },
    { value: 'oldest', label: 'Oldest' }
  ];

  // Handle note selection (multiple)
  const handleNoteChange = (note: string) => {
    setSelectedNotes((prev: string[]) => 
      prev.includes(note) 
        ? prev.filter((n: string) => n !== note)
        : [...prev, note]
    );
  };

  // Handle intensity selection (single)
  const handleIntensityChange = (intensity: string) => {
    setSelectedIntensity(intensity);
  };

  // Handle gender selection (single)
  const handleGenderChange = (gender: string) => {
    setSelectedGender(gender);
  };

  // Handle price range change
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    const isMin = e.target.name === 'min';
    setPriceRange((prev: [number, number]) => isMin ? [value, prev[1]] : [prev[0], value]);
  };

  // Apply filters (you can connect this to parent component via props)
  const applyFilters = () => {
    console.log('Applied Filters:', {
      selectedNotes,
      selectedIntensity,
      selectedGender,
      priceRange,
      sortBy
    });
    
    setIsMobileFilterOpen(false); // Close mobile sidebar after applying
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedNotes([]);
    setSelectedIntensity('');
    setSelectedGender('');
    setPriceRange([0, 30000]);
    setSortBy('');
  };

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="lg:hidden sticky top-20 z-20 backdrop-blur-md border-b border-secondary/20 py-3 px-4">
        <button
          onClick={() => setIsMobileFilterOpen(true)}
          className="w-full py-2.5 rounded-full bg-secondary/10 text-secondary text-sm font-medium hover:bg-secondary/20 transition-all duration-300 flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          Filter & Sort
          {(selectedNotes.length > 0 || selectedIntensity || selectedGender || sortBy || priceRange[0] > 0 || priceRange[1] < 30000) && (
            <span className="ml-1 w-2 h-2 bg-secondary rounded-full"></span>
          )}
        </button>
      </div>

      {/* Mobile Filter Sidebar */}
      {isMobileFilterOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 z-50 lg:hidden transition-opacity duration-300"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          
          {/* Sidebar */}
          <div className="fixed right-0 top-0 h-full w-full max-w-[320px] bg-white dark:bg-[#171717] z-50 lg:hidden shadow-2xl transform transition-transform duration-300 overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-[#171717] border-b border-secondary/20 p-4 flex items-center justify-between">
              <h2 className="text-primary font-heading text-xl font-semibold">Filters</h2>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-2 hover:bg-secondary/10 rounded-full transition-colors"
              >
                <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <FilterContent
                selectedNotes={selectedNotes}
                selectedIntensity={selectedIntensity}
                selectedGender={selectedGender}
                priceRange={priceRange}
                sortBy={sortBy}
                notesOptions={notesOptions}
                intensityOptions={intensityOptions}
                genderOptions={genderOptions}
                sortOptions={sortOptions}
                handleNoteChange={handleNoteChange}
                handleIntensityChange={handleIntensityChange}
                handleGenderChange={handleGenderChange}
                handlePriceChange={handlePriceChange}
                setPriceRange={setPriceRange}
                setSortBy={setSortBy}  // Pass setSortBy to FilterContent
                applyFilters={applyFilters}
                clearAllFilters={clearAllFilters}
              />
            </div>
          </div>
        </>
      )}

      {/* Desktop Filter */}
      <div className="hidden lg:block w-full max-w-[320px] space-y-8 sticky top-24 self-start pr-5 border-r border-secondary/20 mt-10">
        <FilterContent
          selectedNotes={selectedNotes}
          selectedIntensity={selectedIntensity}
          selectedGender={selectedGender}
          priceRange={priceRange}
          sortBy={sortBy}
          notesOptions={notesOptions}
          intensityOptions={intensityOptions}
          genderOptions={genderOptions}
          sortOptions={sortOptions}
          handleNoteChange={handleNoteChange}
          handleIntensityChange={handleIntensityChange}
          handleGenderChange={handleGenderChange}
          handlePriceChange={handlePriceChange}
          setPriceRange={setPriceRange}
          setSortBy={setSortBy}  // Pass setSortBy to FilterContent
          applyFilters={applyFilters}
          clearAllFilters={clearAllFilters}
        />
      </div>
    </>
  );
};

export default ShopFilter;