import story1 from '../../../../assets/onBoarding/story/story1.svg';
import story2 from '../../../../assets/onBoarding/story/story2.svg';
import story3 from '../../../../assets/onBoarding/story/story3.svg';
interface StoryStepProps {
  step: 0 | 1 | 2;
}
const steps = [
  {
    img: story1,
    text: (
      <>
        깊고 신비한 숲에는 지식 나무가 있어요. <br />
        지식 나무는 사람들의 잊힌 기록을 도토리 씨앗으로 바꾼답니다.
      </>
    ),
    progress: 30,
  },
  {
    img: story2,
    text: (
      <>
        당신이 정보를 읽고 활용하는 것을 양분삼아, <br />
        지식 나무에는 맛있는 도토리 열매가 열려요.
      </>
    ),
    progress: 60,
  },
  {
    img: story3,
    text: (
      <>
        다람쥐 치삐는 정보를 활용하지 못해 아직 도토리 만개 숲에 도착하지 못하고
        있어요.
        <br />
        도토리를 모아 치삐가 숲에 닿을 수 있도록 도와주세요!
      </>
    ),
    progress: 100,
  },
];

const StoryStep = ({ step }: StoryStepProps) => {
  return (
    <div className="flex flex-col items-center">
      <img
        src={steps[step].img}
        className="mb-[1.6rem] mt-[2.4rem] w-[31.2rem]"
        alt="onboarding"
      />
      <p className="sub4-sb text-center text-black">{steps[step].text}</p>
    </div>
  );
};

export default StoryStep;
