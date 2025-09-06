const InfoBox = () => {
  return (
    <div className="border-main400 flex h-[6.8rem] w-[24.8rem] items-center justify-between gap-[0.8rem] rounded-[0.4rem] border bg-white px-[0.8rem] py-[1.2rem]">
      <img
        className="h-[4.4rem] w-[4.4rem] rounded-[0.4rem]"
        src="https://previews.123rf.com/images/latkun/latkun1712/latkun171200130/92172856-empty-transparent-background-seamless-pattern.jpg"
      />
      <div className="items-left flex flex-col justify-center gap-[0.2rem] text-left">
        <p className="sub3-sb">집에서 할수있는 것들은 무엇이 있을 까료</p>
        <p className="caption2-m text-font-gray-3">네이버 블로그</p>
      </div>
    </div>
  );
};
export default InfoBox;
