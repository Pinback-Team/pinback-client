import HeaderLogo from '/assets/onBoarding/icons/header_logo.svg';

const TermsOfService = () => {
  return (
    <>
      <header className="z-5 bg-white-bg absolute top-0 flex w-full justify-items-start px-[8.2rem] py-[2.5rem]">
        <img
          src={HeaderLogo}
          alt="header logo"
          className="cursor-pointer"
          onClick={() => window.location.reload()}
        />
      </header>
      <div className="scroll-smooth px-[8.2rem] py-[9.6rem]">
        <section>
          <h1 className="head6">Pinback 서비스 이용약관</h1>
        </section>

        <section className="mt-[3.6rem]">
          <h2 className="sub2-sb">제 1조 목적</h2>
          <p className="text-font-gray-2 sub4-sb mt-[1.2rem]">
            본 약관은 pinback(이하 “서비스")이 제공하는 웹사이트 및 크롬
            확장프로그램 이용과 관련하여, 서비스와 이용자 간의 권리·의무 및
            책임사항을 규정함을 목적으로 합니다.
          </p>
          <ol className="caption1-m text-font-gray-2 mt-[1.2rem] list-decimal pl-[2.1rem]">
            <li>
              계정 생성을 위한 정보: 이메일 주소, 프로필 이름, Google 계정
              식별자 (UID)
            </li>
            <li>
              북마크 저장 및 관리 기능을 위한 정보 : 저장한 웹페이지 URL 및
              제목, 사용자가 작성한 메모, 리마인드 설정 정보, 도토리 적립 내역
              및 숲 성장 단계 등 서비스 활동 데이터
            </li>
            <li>
              서비스 이용 기록 : 기능 사용 내역, 접속 일시, 브라우저 정보 등
              기본 로그
            </li>
          </ol>
        </section>

        <section className="mt-[3rem]">
          <h2 className="sub2-sb">제 2조 약관의 효력 및 변경</h2>
          <p className="text-font-gray-2 sub4-sb mt-[1.2rem]">
            Pinback은 수집된 개인정보를 서비스의 핵심 기능을 제공하기 위한 최소
            범위에서만 사용합니다.
          </p>
          <ol className="caption1-m text-font-gray-2 mt-[1.2rem] list-decimal pl-[2.1rem]">
            <li>
              본 약관은 이용자가 서비스에 최초 로그인할 때 동의함으로써 효력이
              발생합니다.
            </li>
            <li>
              서비스는 관련 법령을 위반하지 않는 범위에서 약관을 개정할 수
              있습니다.
            </li>
            <li>
              지속적인 서비스 이용은 변경된 약관에 동의하는 것으로 간주됩니다.
            </li>
            <li>
              약관 개정 시 적용일자 및 개정 내용을 서비스 내 공지사항을 통해
              사전 고지합니다.
            </li>
            <li>
              이용자가 개정 약관에 동의하지 않을 경우 서비스 이용을 중단하고
              탈퇴할 수 있습니다.
            </li>
          </ol>
        </section>

        <section className="mt-[3rem]">
          <h2 className="sub2-sb">제 3조 용어의 정의</h2>
          <p className="text-font-gray-2 sub4-sb mt-[1.2rem]">
            이 약관에서 사용하는 용어의 정의는 다음과 같습니다.
          </p>
          <ol className="caption1-m text-font-gray-2 mt-[1.2rem] list-decimal pl-[2.1rem]">
            <li>
              서비스: pinback이 제공하는 북마크 저장·관리·검색·추천·리마인드
              기능 등 일체의 기능
            </li>
            <li>플랫폼: 서비스가 제공되는 웹사이트 및 크롬 확장프로그램</li>
            <li>회원: Google 계정 인증(로그인)을 통해 서비스를 이용하는 자</li>
            <li>이용자: 회원을 포함하여 서비스를 이용하는 모든 자</li>
            <li>
              콘텐츠: 이용자가 저장하거나 생성한 URL, 북마크, 폴더, 태그, 메모,
              설정 값 등 데이터 일체
            </li>
          </ol>
        </section>

        <section className="mt-[3rem]">
          <h2 className="sub2-sb">제 4조 이용계약의 성립</h2>
          <ol className="caption1-m text-font-gray-2 mt-[1.2rem] list-decimal pl-[2.1rem]">
            <li>
              이용계약은 이용자가 약관에 동의하고 Google 계정을 통해
              로그인함으로써 성립합니다.
            </li>
            <li>
              계정 연동 시 제공되는 개인정보 항목은 개인정보처리방침에 따릅니다.
            </li>
          </ol>
        </section>

        <section className="mt-[3rem]">
          <h2 className="sub2-sb">제 5조 서비스의 제공</h2>
          <ol className="caption1-m text-font-gray-2 mt-[1.2rem] list-decimal space-y-2 pl-[2.1rem]">
            <li>
              pinback은 다음 기능을 제공합니다.
              <ul className="mt-1 list-[lower-alpha] space-y-1 pl-[2.1rem]">
                <li>
                  웹페이지의 URL을 북마크로 저장하고, 북마크에 메모를
                  추가·관리하는 기능
                </li>
                <li>저장한 북마크 및 메모를 조회·정리·재접속할 수 있는 기능</li>
                <li>
                  이용자가 설정한 조건에 따라 알림을 제공하는 리마인드 기능
                </li>
                <li>
                  이용자의 활동에 따라 도토리를 적립하고 숲이 성장하는
                  게이미피케이션 기능
                </li>
                <li>서비스 운영을 위해 필요한 일반적인 부수 기능</li>
              </ul>
            </li>
            <li>
              크롬 확장프로그램은 위 기능 제공을 위하여 방문 중인 페이지의 URL
              및 제목 확인, Chrome Storage 사용, 알림 권한 등 필요한 범위에서만
              브라우저 정보를 처리합니다.
            </li>
            <li>
              서비스는 수집된 정보를 서비스 제공 목적 내에서만 사용하며, 이를
              제3자에게 판매하거나 목적 외로 활용하지 않습니다.
            </li>
          </ol>
        </section>

        <section className="mt-[3rem]">
          <h2 className="sub2-sb">제 6조 서비스의 변경 및 중단</h2>
          <ol className="caption1-m text-font-gray-2 mt-[1.2rem] list-decimal pl-[2.1rem]">
            <li>
              서비스는 운영 또는 기술적 필요에 따라 일부 기능을 변경·추가·삭제할
              수 있습니다.
            </li>
            <li>
              다음 각 호의 경우 서비스 제공이 일시 중단될 수 있습니다.
              <ul className="mt-1 list-[lower-alpha] space-y-1 pl-[2.1rem]">
                <li>시스템 점검, 증설, 교체 등 기술적 사유</li>
                <li>서비스 장애, 통신 두절 등</li>
                <li>천재지변 등 불가항력적 사유</li>
              </ul>
            </li>
            <li>
              서비스 중단 또는 변경이 발생하는 경우 사전에 공지하며, 부득이한
              경우 사후 공지할 수 있습니다.
            </li>
          </ol>
        </section>

        <section className="mt-[3rem]">
          <h2 className="sub2-sb">제 7조 이용자의 의무</h2>
          <p className="text-font-gray-2 sub4-sb mt-[1.2rem]">
            이용자는 다음 행위를 하여서는 안 됩니다.
          </p>
          <ol className="caption1-m text-font-gray-2 mt-[1.2rem] list-decimal pl-[2.1rem]">
            <li>타인의 계정 또는 인증 정보를 도용하는 행위</li>
            <li>
              자동화된 수단을 이용해 비정상적으로 서비스를 요청하거나 접근하는
              행위
            </li>
            <li>
              서비스에서 제공하지 않는 방식으로 데이터를 수집·추출하는 행위
            </li>
            <li>서버에 과도한 부하를 유발하는 행위</li>
            <li>
              서비스의 소스코드, 알고리즘 등을 분석·변조·역컴파일하는 행위
            </li>
            <li>확장프로그램을 임의 변조하거나 재배포하는 행위</li>
            <li>
              브라우저 또는 보안 정책을 우회하여 확장프로그램을 사용하는 행위
            </li>
          </ol>
          <p className="text-font-gray-2 caption1-m mt-[1.2rem]">
            위 행위가 확인될 경우 서비스는 이용 제한, 콘텐츠 삭제, 계정 해지
            등의 조치를 취할 수 있습니다.
          </p>
        </section>

        <section className="mt-[3rem]">
          <h2 className="sub2-sb">제 8조 콘텐츠 및 지적재산권</h2>
          <ol className="caption1-m text-font-gray-2 mt-[1.2rem] list-decimal pl-[2.1rem]">
            <li>
              이용자가 pinback에 저장한 콘텐츠의 저작권은 이용자에게 귀속됩니다.
            </li>
            <li>
              서비스는 다음 목적 범위에서만 이용자의 콘텐츠를 사용할 수
              있습니다.
              <ul className="mt-1 list-[lower-alpha] space-y-1 pl-[2.1rem]">
                <li>서비스 기능 제공(저장·동기화 등)</li>
                <li>검색 및 추천 기능 향상을 위한 비식별 처리 분석</li>
              </ul>
            </li>
            <li>서비스는 이용자의 콘텐츠를 영리 목적으로 활용하지 않습니다.</li>
            <li>
              서비스의 로고, UI, 디자인, 소스코드 등 지적재산권은 서비스
              제공자에게 귀속됩니다.
            </li>
          </ol>
        </section>

        <section className="mt-[3rem]">
          <h2 className="sub2-sb">제 9조 개인정보의 보호</h2>
          <ol className="caption1-m text-font-gray-2 mt-[1.2rem] list-decimal pl-[2.1rem]">
            <li>
              pinback은 이용자의 개인정보를 개인정보처리방침에 따라 처리합니다.
            </li>
            <li>
              개인정보 처리 목적, 수집 항목, 보유 기간, 제3자 제공 여부 등은
              개인정보처리방침에서 확인할 수 있습니다.
            </li>
            <li>
              확장프로그램을 통해 처리되는 정보 역시 개인정보처리방침의 목적
              범위 내에서만 사용됩니다.
            </li>
          </ol>
        </section>

        <section className="mt-[3rem]">
          <h2 className="sub2-sb">제 10조 계정 탈퇴 및 데이터 삭제</h2>
          <ol className="caption1-m text-font-gray-2 mt-[1.2rem] list-decimal pl-[2.1rem]">
            <li>
              이용자는 서비스 내 pinback 고객 지원 팀을 통해 언제든지 계정
              탈퇴를 요청할 수 있습니다.
            </li>
            <li>
              계정 탈퇴 시 회원의 콘텐츠 및 계정 정보는 즉시 삭제되며, 복구가
              불가능합니다.
            </li>
            <li>
              법령에 따라 보관이 필요한 정보는 별도 보관 후, 기간 만료 시
              삭제됩니다.
            </li>
          </ol>
        </section>

        <section className="mt-[3rem]">
          <h2 className="sub2-sb">제 11조 면책조항</h2>
          <ol className="caption1-m text-font-gray-2 mt-[1.2rem] list-decimal pl-[2.1rem]">
            <li>
              서비스는 이용자의 기기 환경, 네트워크 문제 등 외부 요인으로
              발생하는 장애에 대해 책임을 지지 않습니다.
            </li>
            <li>
              외부 플랫폼의 장애로 인해 발생한 문제에 대해 책임을 지지 않습니다.
            </li>
            <li>
              베타 기능 또는 테스트 기능 이용 중 발생할 수 있는 오류, 기능 제한,
              데이터 손실 등에 대해 책임을 지지 않습니다.
            </li>
            <li>
              이용자의 부주의로 인해 발생한 콘텐츠 손실 또는 오류에 대해 책임을
              지지 않습니다.
            </li>
            <li>
              확장프로그램과 다른 확장프로그램·보안 소프트웨어 간 충돌로 인한
              문제에 대해 책임을 지지 않습니다.
            </li>
            <li>
              이용자가 확장프로그램 권한을 거부함으로써 인해 기능 제공이 제한될
              수 있으며, 이에 대한 책임은 이용자에게 있습니다.
            </li>
          </ol>
        </section>

        <section className="mt-[3rem]">
          <h2 className="sub2-sb">제 12조 준거법 및 분쟁 해결</h2>
          <ol className="caption1-m text-font-gray-2 mt-[1.2rem] list-decimal pl-[2.1rem]">
            <li>본 약관은 대한민국 법령을 따릅니다.</li>
            <li>
              서비스와 이용자 간 분쟁이 발생할 경우 상호 협의를 우선하며, 협의가
              이루어지지 않을 경우 민사소송법에 따른 관할 법원에 따릅니다.
            </li>
          </ol>
        </section>

        <section className="mt-[3rem]">
          <h3 className="sub2-sb">부칙</h3>
          <div className="sub4-sb text-font-gray-2 mt-[1.2rem]">
            <p>본 약관은 2025년 10월 27일부터 적용됩니다.</p>
            <p>
              본 약관은 정책 변경에 따라 개정될 수 있으며, 개정 시 서비스 내
              공지사항을 통해 안내합니다.
            </p>
            <p>
              본 이용약관은 pinback 서비스를 이용하는 모든 사용자에게 적용되며,
              서비스 이용 시 본 약관에 동의하는 것으로 간주됩니다.
            </p>
          </div>
        </section>
      </div>
    </>
  );
};

export default TermsOfService;
