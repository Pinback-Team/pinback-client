import { Progress, Button } from '@pinback/design-system/ui';
import story1 from '../../../../assets/onBoarding/story/story1.svg';
const MainCard = () => {
  return (
    <div className="bg-white-bg flex h-[54.8rem] w-[63.2rem] flex-col items-center justify-between rounded-[2.4rem]">
      <Progress value={30} variant="profile" className="mt-[3.2rem] w-[30%]" />
      <img src={story1} className="mb-[1.6rem] mt-[2.4rem] w-[50%]" />
      <p className="sub4-sb text-center text-black">
        깊고 신비한 숲에는 지식 나무가 있어요. <br></br>
        지식 나무는 사람들의 잊힌 기록을 도토리 씨앗으로 바꾼답니다.
      </p>
      <div className="mb-[4.8rem] mt-[1.2rem] flex w-full justify-between px-[3.2rem]">
        <Button
          variant="primary"
          size="medium"
          isDisabled={true}
          className="w-[4.8rem]"
        >
          이전
        </Button>
        <Button variant="primary" size="medium" className="w-[4.8rem]">
          다음
        </Button>
      </div>
    </div>
  );
};

export default MainCard;
