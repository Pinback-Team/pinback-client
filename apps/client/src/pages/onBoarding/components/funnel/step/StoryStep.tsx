import { stories } from '@constants/stories';

interface StoryStepProps {
  step: 0 | 1 | 2;
}

const StoryStep = ({ step }: StoryStepProps) => {
  const story = stories[step];

  return (
    <div className="flex flex-col items-center">
      <img
        src={story.img}
        className="mb-[1.6rem] mt-[2.4rem] w-[31.2rem]"
        alt="onboarding"
      />
      <p className="sub4-sb text-center text-black">{story.text}</p>
    </div>
  );
};

export default StoryStep;
