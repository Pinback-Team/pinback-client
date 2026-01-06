import HeaderLogo from '/assets/onBoarding/icons/header_logo.svg';

const PrivacyPolicy = () => {
  return (
    <>
      <header className="z-5 bg-white-bg absolute top-0 flex w-full justify-items-start px-[8.2rem] py-[2.5rem]">
        <img
          src={HeaderLogo}
          alt="header logo"
          onClick={() => window.location.reload()}
        />
      </header>
      <div className="scroll-smooth px-[8.2rem] py-[9.6rem]">
        <section className="">
          <h1 className="head6">Pinback 개인정보처리방침</h1>
          <p className="text-font-gray-2 caption1-m mt-[1.2rem] whitespace-pre-line">
            Pinback은 이용자의 정보를 안전하게 보호하는 것을 가장 중요한 책임 중
            하나로 생각합니다.{'\n'}본 방침은 Pinback이 어떤 정보를 수집하고,
            어떻게 사용하며, 어떻게 보호하는지 쉽게 이해할 수 있도록 안내하기
            위해 마련되었습니다.
          </p>
        </section>

        <section className="mt-[3.6rem]">
          <h2 className="sub2-sb">① 수집하는 개인정보 종류</h2>
          <p className="text-font-gray-2 sub4-sb mt-[1.2rem]">
            Pinback은 서비스 제공을 위해 다음 정보를 수집합니다.
          </p>
          <ol className="mt-[1.2rem] list-decimal pl-[2.1rem]">
            <li className="caption1-m text-font-gray-2">
              계정 생성을 위한 정보: 이메일 주소, 프로필 이름, Google 계정
              식별자 (UID)
            </li>
            <li className="caption1-m text-font-gray-2">
              북마크 저장 및 관리 기능을 위한 정보: 저장한 웹페이지 URL 및 제목,
              사용자가 작성한 메모, 리마인드 설정 정보, 도토리 적립 내역 및 숲
              성장 단계 등 서비스 활동 데이터
            </li>
            <li className="caption1-m text-font-gray-2">
              서비스 이용 기록: 기능 사용 내역, 접속 일시, 브라우저 정보 등 기본
              로그
            </li>
          </ol>
        </section>

        <section className="mt-[3rem]">
          <h2 className="sub2-sb">② 개인정보의 이용 목적</h2>
          <p className="text-font-gray-2 sub4-sb mt-[1.2rem]">
            Pinback은 수집된 개인정보를 서비스의 핵심 기능을 제공하기 위한 최소
            범위에서만 사용합니다.
          </p>
          <ul className="caption1-m text-font-gray-2 mt-[1.2rem] list-disc pl-[2.1rem]">
            <li>
              사용자가 저장한 북마크와 메모를 안전하게 보관하고 다시 찾아볼 수
              있도록 하기 위함
            </li>
            <li>
              사용자 설정에 따라 리마인드 알림을 제공하여 저장한 콘텐츠를 다시
              활용할 수 있도록 돕기 위함
            </li>
            <li>
              도토리 보상 시스템을 통해 서비스 이용 경험을 향상하고, 지속적인
              지식 관리 습관 형성을 지원하기 위함
            </li>
          </ul>
          <p className="sub4-sb text-font-gray-2 mt-[1.2rem]">
            Pinback은 수집된 모든 정보를 위 목적 이외에 다른 용도로 사용하지
            않으며, 개인정보를 제 3자에게 판매하거나 공유하지 않습니다.
          </p>
        </section>

        <section className="mt-[3rem]">
          <h2 className="sub2-sb">③ 개인정보의 보유 및 보안</h2>
          <div className="sub4-sb text-font-gray-2 mt-[1.2rem]">
            <p>
              Pinback은 사용자의 개인정보를 안전하게 보호하기 위해 적절한 보안
              조치를 취하고 있습니다.
            </p>
            <p>
              개인정보는 무단 접근, 유출, 변경, 파괴를 방지하기 위해 보호되며,
              필요한 경우 암호화되어 저장됩니다.
            </p>
          </div>
        </section>

        <section className="mt-[3rem]">
          <h2 className="sub2-sb">④ 개인정보 관리 및 열람 관리</h2>
          <p className="text-font-gray-2 sub4-sb mt-[1.2rem]">
            이용자는 언제든지 다음을 요청할 수 있습니다.
          </p>
          <ul className="caption1-m text-font-gray-2 mt-[1.2rem] list-disc pl-[2.1rem]">
            <li>개인정보 조회</li>
            <li>개인정보 수정</li>
            <li>개인정보 삭제</li>
            <li>개인정보 처리 정지</li>
          </ul>
          <div className="sub4-sb text-font-gray-2 mt-[1.2rem]">
            <p>
              요청은 서비스에서 지정한 이메일 또는 문의 채널을 통해 접수됩니다.
            </p>
            <p>
              다만, 법적 의무나 요청에 의해 개인정보를 제공해야 할 경우, 해당
              법령에 따라 제공할 수 있습니다.
            </p>
          </div>
        </section>

        <section className="mt-[3rem]">
          <h2 className="sub2-sb">⑤ 개인정보 처리방침 변경</h2>
          <div className="sub4-sb text-font-gray-2 mt-[1.2rem]">
            <p>
              본 방침은 서비스 운영 또는 관련 법령에 따라 변경될 수 있습니다.
            </p>
            <p>
              변경 사항은 최소 7일 전에 공지하며, 이용자에게 불리한 변경의 경우
              30일 전에 안내합니다.
            </p>
          </div>
        </section>

        <section className="mt-[3rem]">
          <h3 className="sub2-sb">부칙</h3>
          <div className="sub4-sb text-font-gray-2 mt-[1.2rem]">
            <p>본 개인정보 처리방침은 2025년 10월 27일부터 적용됩니다.</p>
            <p>
              본 개인정보 처리방침은 최근 업데이트된 내용을 반영하고 있으며,
              사용자는 pinback 서비스를 이용함으로써 이 개인정보 처리방침에
              동의하는 것으로 간주됩니다.
            </p>
          </div>
        </section>
      </div>
    </>
  );
};

export default PrivacyPolicy;
