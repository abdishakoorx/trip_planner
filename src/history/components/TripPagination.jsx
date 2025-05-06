/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TripPagination = ({ currentPage, totalPages, onPageChange }) => {
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };
  
  const renderPageButtons = () => {
    const buttons = [];
    
    // Always show first page
    buttons.push(
      <Button
        key={1}
        variant={currentPage === 1 ? "default" : "outline"}
        size="sm"
        onClick={() => goToPage(1)}
        className="w-10 h-10 p-0"
      >
        1
      </Button>
    );
    
    // Calculate range of visible pages
    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);
    
    // Add ellipsis if needed before middle pages
    if (startPage > 2) {
      buttons.push(
        <Button key="ellipsis1" variant="ghost" size="sm" disabled className="w-10 h-10 p-0">
          ...
        </Button>
      );
    }
    
    // Add middle pages
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <Button
          key={i}
          variant={currentPage === i ? "default" : "outline"}
          size="sm"
          onClick={() => goToPage(i)}
          className="w-10 h-10 p-0"
        >
          {i}
        </Button>
      );
    }
    
    // Add ellipsis if needed after middle pages
    if (endPage < totalPages - 1) {
      buttons.push(
        <Button key="ellipsis2" variant="ghost" size="sm" disabled className="w-10 h-10 p-0">
          ...
        </Button>
      );
    }
    
    // Always show last page if there is more than one page
    if (totalPages > 1) {
      buttons.push(
        <Button
          key={totalPages}
          variant={currentPage === totalPages ? "default" : "outline"}
          size="sm"
          onClick={() => goToPage(totalPages)}
          className="w-10 h-10 p-0"
        >
          {totalPages}
        </Button>
      );
    }
    
    return buttons;
  };
  
  return (
    <div className="flex items-center justify-center py-8 space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-10 h-10 p-0"
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>
      
      {renderPageButtons()}
      
      <Button
        variant="outline"
        size="sm"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-10 h-10 p-0"
      >
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default TripPagination;