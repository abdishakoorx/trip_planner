// validator.js

export const validateForm = (values) => {
    const errors = {};

    // Destination validation
    if (!values.destination) {
        errors.destination = 'Destination is required';
    }

    // Days validation
    if (!values.days) {
        errors.days = 'Number of days is required';
    } else if (values.days < 1 || values.days > 30) {
        errors.days = 'Days must be between 1 and 30';
    }

    // Trip type validation
    if (!values.tripType) {
        errors.tripType = 'Please select a trip type';
    }

    // Trip style validation
    if (!values.tripStyle || values.tripStyle.length === 0) {
        errors.tripStyle = 'Please select at least one trip style';
    }

    // Budget validation
    if (!values.budget) {
        errors.budget = 'Please select a budget level';
    }

    // Group size validation
    if (!values.groupSize) {
        errors.groupSize = 'Please select a group size';
    }

    return errors;
};

// Constants
export const tripTypes = {
    relaxation: "Relaxation",
    adventure: "Adventure",
    cultural: "Cultural"
};

export const budgetLevels = {
    low: "Low",
    medium: "Medium",
    high: "High"
};

export const groupSizes = {
    personal: "Personal",
    family: "Family",
    team: "Team"
};

export const tripStyles = [
    "Luxury",
    "Budget-friendly",
    "Outdoor",
    "City",
    "Family-friendly"
];