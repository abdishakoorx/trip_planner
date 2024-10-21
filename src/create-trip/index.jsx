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

const CreateTrip = () => {
  const [place, setPlace] = useState(null);
  const [formData, setFormData] = useState({
    destination: '',
    days: '',
    tripType: '',
    budget: '',
    size: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    const newErrors = {};
    Object.keys(formData).forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      console.log('Form submitted:', formData);
      toast.success('Trip created')
      setFormData({
        destination: '',
        days: '',
        tripType: '',
        budget: '',
        size: ''
      });

      const FINAL_PROMPT = AIPROMPT
        .replace('{destination}', formData.destination)
        .replace('{days}', formData.days)
        .replace('{tripType}', formData.tripType)
        .replace('{budget}', formData.budget)
        .replace('{size}', formData.size);

      const result = await chatSession.sendMessage(FINAL_PROMPT)

      console.log(result?.response?.text())

      // setPlace(null);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container max-w-2xl px-4 py-10 mx-auto">
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Plan Your Dream Trip</h1>
          <h2 className="text-muted-foreground">
            Tell us about your ideal vacation and we&apos;ll help you plan it!
          </h2>
        </div>

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
            {isSubmitting ? <h2 className='flex items-center gap-2'><Loader2 className='animate-spin' />Create Trip...</h2> : <h2 className='flex items-center gap-2'><Plane className='animate-bounce' />Create Trip</h2>}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateTrip;