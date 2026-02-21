import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

interface UseFunnelOptions<TStep extends string> {
  steps: readonly TStep[];
  initialStep: TStep;
  queryKey?: string;
}

interface MoveStepOptions {
  replace?: boolean;
}

export function useFunnel<TStep extends string>({
  steps,
  initialStep,
  queryKey = 'step',
}: UseFunnelOptions<TStep>) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentStep = useMemo(() => {
    const value = searchParams.get(queryKey);
    return value && steps.includes(value as TStep)
      ? (value as TStep)
      : initialStep;
  }, [searchParams, queryKey, steps, initialStep]);

  const currentIndex = steps.indexOf(currentStep);

  const setStep = useCallback(
    (nextStep: TStep, { replace = true }: MoveStepOptions = {}) => {
      if (!steps.includes(nextStep)) return;
      const nextParams = new URLSearchParams(searchParams);
      nextParams.set(queryKey, nextStep);
      setSearchParams(nextParams, { replace });
    },
    [steps, searchParams, queryKey, setSearchParams]
  );

  const goNext = useCallback(
    (options?: MoveStepOptions) => {
      const nextStep = steps[currentIndex + 1];
      if (!nextStep) return null;
      setStep(nextStep, options);
      return nextStep;
    },
    [steps, currentIndex, setStep]
  );

  const goPrev = useCallback(
    (options?: MoveStepOptions) => {
      const prevStep = steps[currentIndex - 1];
      if (!prevStep) return null;
      setStep(prevStep, options);
      return prevStep;
    },
    [steps, currentIndex, setStep]
  );

  return {
    currentStep,
    currentIndex,
    isFirstStep: currentIndex <= 0,
    isLastStep: currentIndex === steps.length - 1,
    setStep,
    goNext,
    goPrev,
  };
}
