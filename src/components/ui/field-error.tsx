import React from "react";

interface FieldErrorProps {
  errors?: string[];
  id?: string;
}

export function FieldError({ errors, id }: FieldErrorProps) {
  if (!errors || errors.length === 0) return null;

  return (
    <div id={id} aria-live="polite" className="mt-1.5 animate-fade-in">
      {errors.map((error, index) => (
        <p key={index} className="text-sm text-destructive font-medium">
          {error}
        </p>
      ))}
    </div>
  );
}
