export const tripTypeOptions = [
    { 
      id: 'cultural', 
      label: 'Cultural', 
      description: 'Historical sites and local experiences',
      color: {
        bg: 'bg-amber-50',
        border: 'border-amber-200',
        selectedBg: 'bg-amber-100',
        selectedBorder: 'border-amber-500',
        text: 'text-amber-700'
      }
    },
    { 
      id: 'adventure', 
      label: 'Adventure', 
      description: 'Outdoor activities and thrilling experiences',
      color: {
        bg: 'bg-emerald-50',
        border: 'border-emerald-200',
        selectedBg: 'bg-emerald-100',
        selectedBorder: 'border-emerald-500',
        text: 'text-emerald-700'
      }
    },
    { 
      id: 'relaxation', 
      label: 'Relaxation', 
      description: 'Beaches, spas, and peaceful retreats',
      color: {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        selectedBg: 'bg-blue-100',
        selectedBorder: 'border-blue-500',
        text: 'text-blue-700'
      }
    }
  ];
  
  export const budgetOptions = [
    { 
      id: 'low - Under $100/day', 
      label: 'Budget', 
      description: 'Under $100/day',
      color: {
        bg: 'bg-green-50',
        border: 'border-green-200',
        selectedBg: 'bg-green-100',
        selectedBorder: 'border-green-500',
        text: 'text-green-700'
      }
    },
    { 
      id: 'medium - $100-300/day', 
      label: 'Moderate', 
      description: '$100-300/day',
      color: {
        bg: 'bg-purple-50',
        border: 'border-purple-200',
        selectedBg: 'bg-purple-100',
        selectedBorder: 'border-purple-500',
        text: 'text-purple-700'
      }
    },
    { 
      id: 'high - $300+/day', 
      label: 'Luxury', 
      description: '$300+/day',
      color: {
        bg: 'bg-rose-50',
        border: 'border-rose-200',
        selectedBg: 'bg-rose-100',
        selectedBorder: 'border-rose-500',
        text: 'text-rose-700'
      }
    }
  ];
  
  export const sizeOptions = [
    { 
      id: 'personal - 1-2 people', 
      label: 'Solo/Couple', 
      description: '1-2 people',
      color: {
        bg: 'bg-sky-50',
        border: 'border-sky-200',
        selectedBg: 'bg-sky-100',
        selectedBorder: 'border-sky-500',
        text: 'text-sky-700'
      }
    },
    { 
      id: 'family - 3-6 people', 
      label: 'Family', 
      description: '3-6 people',
      color: {
        bg: 'bg-indigo-50',
        border: 'border-indigo-200',
        selectedBg: 'bg-indigo-100',
        selectedBorder: 'border-indigo-500',
        text: 'text-indigo-700'
      }
    },
    { 
      id: 'team - 7+ people', 
      label: 'Group', 
      description: '7+ people',
      color: {
        bg: 'bg-violet-50',
        border: 'border-violet-200',
        selectedBg: 'bg-violet-100',
        selectedBorder: 'border-violet-500',
        text: 'text-violet-700'
      }
    }
  ];
  
  export const tripSchema = {
    destination: {
      required: "Destination is required",
      minLength: {
        value: 3,
        message: "Destination must be at least 3 characters"
      },
      maxLength: {
        value: 150,
        message: "Destination must be less than 50 characters"
      }
    },
    days: {
      required: "Number of days is required",
      min: {
        value: 1,
        message: "Trip must be at least 1 day"
      },
      max: {
        value: 5,
        message: "Trip cannot exceed 90 days"
      }
    },
    tripType: {
      required: "Please select a trip type"
    },
    budget: {
      required: "Please select a budget range"
    },
    size: {
      required: "Please select group size"
    }
  };