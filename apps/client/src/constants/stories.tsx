import story1 from '/assets/onBoarding/story/story1.webp';
import story2 from '/assets/onBoarding/story/story2.webp';
import story3 from '/assets/onBoarding/story/story3.webp';

export interface Story {
  img: string;
  text: React.ReactNode;
  progress: number;
}

export const stories: Story[] = [
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
