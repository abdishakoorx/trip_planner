/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const TripFilter = ({ onFilterChange, onSearchChange }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    // Reset date filter when changing status filter
    onFilterChange({ status: filter });
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearchChange(value);
  };

  return (
    <div className="w-full space-y-4">
      {/* Search bar */}
      <div className="relative">
        <Search className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
        <Input
          type="search"
          placeholder="Search by destination or trip name"
          className="py-6 pl-10"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      {/* Filter pills */}
      <div className="flex items-center pb-2 space-x-2 overflow-x-auto scrollbar-none">
        <Button
          variant={activeFilter === 'all' ? "default" : "outline"}
          size="sm"
          onClick={() => handleFilterChange('all')}
          className="rounded-full"
        >
          All Trips
        </Button>
        <Button
          variant={activeFilter === 'upcoming' ? "default" : "outline"}
          size="sm"
          onClick={() => handleFilterChange('upcoming')}
          className="rounded-full"
        >
          Upcoming
        </Button>
        <Button
          variant={activeFilter === 'completed' ? "default" : "outline"}
          size="sm"
          onClick={() => handleFilterChange('completed')}
          className="rounded-full"
        >
          Completed
        </Button>
        <Button
          variant={activeFilter === 'canceled' ? "default" : "outline"}
          size="sm"
          onClick={() => handleFilterChange('canceled')}
          className="rounded-full"
        >
          Canceled
        </Button>
      </div>
    </div>
  );
};

export default TripFilter;