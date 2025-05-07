import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Plane, Calendar } from "lucide-react";
import { tripSchema, tripTypeOptions, budgetOptions, sizeOptions } from '../utils/Validator';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { RadioOptionCard } from '@/components/custom/RadioOptions';
import { toast } from 'sonner';
import { AIPROMPT } from '@/components/custom/Prompt';
import { chatSession } from '@/config/CreatePrompt';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/config/Firebase';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/clerk-react';
import { format, addDays, isBefore } from 'date-fns';

const CreateTrip = () => {
  const [place, setPlace] = useState(null);
  const [formData, setFormData] = useState({
    destination: '',
    days: '',
    tripType: '',
    budget: '',
    size: '',
    startDate: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useNavigate();
  const { user } = useUser();

  // Calculate minimum allowed date (today)
  const today = new Date();
  const formattedToday = format(today, 'yyyy-MM-dd');

  // Calculate formatted end date string for display purposes
  const calculateEndDateString = (startDate, days) => {
    if (!startDate || !days) return '';
    try {
      const dateObj = new Date(startDate);
      if (isNaN(dateObj.getTime())) return ''; // Check for invalid date

      const endDate = addDays(dateObj, parseInt(days));
      return format(endDate, 'yyyy-MM-dd');
    } catch (error) {
      console.error("Date calculation error:", error);
      return '';
    }
  };

  const endDateString = calculateEndDateString(formData.startDate, formData.days);

  const validateField = (name, value) => {
    const fieldSchema = tripSchema[name];
    if (!fieldSchema) return '';

    if (fieldSchema.required && !value) {
      return fieldSchema.required;
    }

    if (name === 'startDate') {
      const selectedDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Reset time to start of day for fair comparison

      if (isBefore(selectedDate, today)) {
        return 'Start date cannot be in the past';
      }
    }

    if (fieldSchema.minLength && value.length < fieldSchema.minLength.value) {
      return fieldSchema.minLength.message;
    }

    if (fieldSchema.maxLength && value.length > fieldSchema.maxLength.value) {
      return fieldSchema.maxLength.message;
    }

    if (fieldSchema.min && Number(value) < fieldSchema.min.value) {
      return fieldSchema.min.message;
    }

    if (fieldSchema.max && Number(value) > fieldSchema.max.value) {
      return fieldSchema.max.message;
    }

    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handlePlaceSelect = (selectedPlace) => {
    setPlace(selectedPlace);
    setFormData(prev => ({
      ...prev,
      destination: selectedPlace?.label || ''
    }));
    const error = validateField('destination', selectedPlace?.label || '');
    setErrors(prev => ({ ...prev, destination: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields before submission
    const newErrors = {};
    Object.keys(formData).forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error('Please fix all errors before submitting');
      return;
    }

    setIsSubmitting(true);

    try {
      const FINAL_PROMPT = AIPROMPT
        .replace('{destination}', formData.destination)
        .replace('{days}', formData.days)
        .replace('{tripType}', formData.tripType)
        .replace('{budget}', formData.budget)
        .replace('{size}', formData.size);

      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const docID = uuidv4();

      // Create proper JavaScript Date objects for start and end dates
      const startDateObj = new Date(formData.startDate);

      // Calculate end date as a proper Date object
      const endDateObj = addDays(startDateObj, parseInt(formData.days));

      // Current creation timestamp
      const creationTimestamp = new Date();

      await setDoc(doc(db, "Trips", docID), {
        userSelection: {
          ...formData,
          // Store dates as timestamps for Firestore compatibility
          startDate: startDateObj,
          endDate: endDateObj
        },
        tripInfo: JSON.parse(result?.response?.text()),
        userEmail: user.primaryEmailAddress.emailAddress,
        date: creationTimestamp,
        status: 'upcoming', // Default status for new trips
        id: docID
      });

      toast.success('Trip created');
      router('/my-trips/' + docID);
    } catch (error) {
      toast.error('Submission error');
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">

      {/* Dark gradient top section */}
      <div className="relative">
        <div className="absolute inset-0 z-0 h-[240px]">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-slate-50"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-indigo-900/30 mix-blend-overlay"></div>
        </div>

        <main className="relative z-10 flex-grow pt-32 pb-16">
          <div className="container max-w-4xl px-4 mx-auto">
            {/* Page Header */}
            <div className="mb-12 text-center">
              <h1 className="mb-4 font-serif text-4xl font-semibold md:text-5xl text-primary">
                Plan Your Dream Trip
              </h1>
              <p className="max-w-2xl mx-auto text-lg text-primary/80">
                Create your personalized travel itinerary and let our AI help you discover the perfect destinations and activities.
              </p>
            </div>

            {/* Form Section */}
            <div className='mt-8'>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Destination */}
                <div className="flex flex-col w-full space-y-2">
                  <Label htmlFor="destination">Destination</Label>
                  <GooglePlacesAutocomplete
                    apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                    selectProps={{
                      value: place,
                      onChange: handlePlaceSelect,
                      placeholder: "Enter a destination"
                    }}
                  />
                  {errors.destination && (
                    <Alert variant="destructive">
                      <AlertDescription>{errors.destination}</AlertDescription>
                    </Alert>
                  )}
                </div>

                {/* Start Date Field */}
                <div className="space-y-2">
                  <Label htmlFor="startDate" className="flex items-center gap-2">
                    <Calendar size={16} /> Start Date
                  </Label>
                  <Input
                    id="startDate"
                    name="startDate"
                    type="date"
                    min={formattedToday}
                    value={formData.startDate}
                    onChange={handleChange}
                    className="date-input"
                  />
                  {errors.startDate && (
                    <Alert variant="destructive">
                      <AlertDescription>{errors.startDate}</AlertDescription>
                    </Alert>
                  )}
                  {formData.startDate && formData.days && (
                    <div className="mt-2 text-sm text-muted-foreground">
                      Trip ends on: <span className="font-medium text-primary">{endDateString}</span>
                    </div>
                  )}
                </div>

                {/* Days */}
                <div className="space-y-2">
                  <Label htmlFor="days">Number of Days</Label>
                  <Input
                    id="days"
                    name="days"
                    type="number"
                    placeholder="1"
                    min="1"
                    max="90"
                    value={formData.days}
                    onChange={handleChange}
                  />
                  {errors.days && (
                    <Alert variant="destructive">
                      <AlertDescription>{errors.days}</AlertDescription>
                    </Alert>
                  )}
                </div>

                {/* Trip Type */}
                <div className="space-y-4">
                  <Label>Trip Type</Label>
                  <div className="grid gap-4 sm:grid-cols-3">
                    {tripTypeOptions.map(option => (
                      <RadioOptionCard
                        key={option.id}
                        name="tripType"
                        option={option}
                        selected={formData.tripType}
                        onChange={handleChange}
                      />
                    ))}
                  </div>
                  {errors.tripType && (
                    <Alert variant="destructive">
                      <AlertDescription>{errors.tripType}</AlertDescription>
                    </Alert>
                  )}
                </div>

                {/* Budget */}
                <div className="space-y-4">
                  <Label>Budget</Label>
                  <div className="grid gap-4 sm:grid-cols-3">
                    {budgetOptions.map(option => (
                      <RadioOptionCard
                        key={option.id}
                        name="budget"
                        option={option}
                        selected={formData.budget}
                        onChange={handleChange}
                      />
                    ))}
                  </div>
                  {errors.budget && (
                    <Alert variant="destructive">
                      <AlertDescription>{errors.budget}</AlertDescription>
                    </Alert>
                  )}
                </div>

                {/* Size */}
                <div className="space-y-4">
                  <Label>Group Size</Label>
                  <div className="grid gap-4 sm:grid-cols-3">
                    {sizeOptions.map(option => (
                      <RadioOptionCard
                        key={option.id}
                        name="size"
                        option={option}
                        selected={formData.size}
                        onChange={handleChange}
                      />
                    ))}
                  </div>
                  {errors.size && (
                    <Alert variant="destructive">
                      <AlertDescription>{errors.size}</AlertDescription>
                    </Alert>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-secondary hover:bg-secondary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ?
                    <h2 className='flex items-center gap-2'><Loader2 className='animate-spin' />Creating Trip...</h2> :
                    <h2 className='flex items-center gap-2'><Plane className='animate-bounce' />Create Trip</h2>
                  }
                </Button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CreateTrip;