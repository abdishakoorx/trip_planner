/* eslint-disable react/prop-types */
import { Check } from "lucide-react";

export const RadioOptionCard = ({ name, option, selected, onChange }) => {
    const isSelected = selected === option.id;
    
    return (
      <div className="relative">
        <input
          type="radio"
          id={`${name}-${option.id}`}
          name={name}
          value={option.id}
          className="hidden peer"
          checked={isSelected}
          onChange={onChange}
        />
        <label
          htmlFor={`${name}-${option.id}`}
          className={`block cursor-pointer rounded-lg border-2 p-4 transition-all
            ${option.color.bg} 
            ${isSelected ? option.color.selectedBorder : option.color.border}
            hover:border-primary
            peer-checked:${option.color.selectedBg}
            peer-checked:shadow-md
            relative
            ${isSelected ? 'ring-2 ring-offset-2 ' + option.color.selectedBorder : ''}
          `}
        >
          {isSelected && (
            <div className={`absolute top-3 right-3 ${option.color.text}`}>
              <Check size={20} />
            </div>
          )}
          <div className={`font-semibold ${option.color.text} ${isSelected ? 'text-lg' : ''}`}>
            {option.label}
          </div>
          <div className={`text-sm ${isSelected ? option.color.text : 'text-muted-foreground'}`}>
            {option.description}
          </div>
        </label>
      </div>
    );
  };