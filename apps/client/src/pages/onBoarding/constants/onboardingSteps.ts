export const Step = {
  STORY_0: 'STORY_0',
  STORY_1: 'STORY_1',
  STORY_2: 'STORY_2',
  SOCIAL_LOGIN: 'SOCIAL_LOGIN',
  JOB: 'JOB',
  ALARM: 'ALARM',
  MAC: 'MAC',
  FINAL: 'FINAL',
} as const;

export type StepType = (typeof Step)[keyof typeof Step];

export const storySteps: StepType[] = [
  Step.STORY_0,
  Step.STORY_1,
  Step.STORY_2,
];

export const stepOrder: StepType[] = [
  Step.STORY_0,
  Step.STORY_1,
  Step.STORY_2,
  Step.SOCIAL_LOGIN,
  Step.JOB,
  Step.ALARM,
  Step.MAC,
  Step.FINAL,
];
