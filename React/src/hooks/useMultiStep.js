import { useState } from "react";

export function useMultiStep(steps) {
  const [currentStep, setCurrentStep] = useState(0);

  const next = () => {
    setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
  };

  const back = () => {
    setCurrentStep((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const goTo = (step) => {
    if (step >= 0 && step <= steps.length - 1) setCurrentStep(step);
  };

  const isFirst = currentStep === 0;
  const isLast = currentStep === steps.length - 1;

  return {
    currentStep,
    step: steps[currentStep],
    next,
    back,
    goTo,
    isFirst,
    isLast,
  };
}
