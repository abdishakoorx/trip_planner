import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Plane } from "lucide-react";
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

const CreateTrip = () => {
  const [place, setPlace] = useState(null);
  const [formData, setFormData] = useState({
    destination: '',
    days: '',
    tripType: '',
    budget: '',
    size: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useNavigate();
  const { user } = useUser()

  const validateField = (name, value) => {
    const fieldSchema = tripSchema[name];
    if (!fieldSchema) return '';

    if (fieldSchema.required && !value) {
      return fieldSchema.required;
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

      await setDoc(doc(db, "Trips", docID), {
        userSelection: formData,
        tripInfo: JSON.parse(result?.response?.text()),
        userEmail: user.primaryEmailAddress.emailAddress,
        date: new Date().toLocaleString("en-US", { timeZone: "Africa/Nairobi" }),
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
                  {isSubmitting ? <h2 className='flex items-center gap-2'><Loader2 className='animate-spin' />Creating Trip...</h2> : <h2 className='flex items-center gap-2'><Plane className='animate-bounce' />Create Trip</h2>}
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