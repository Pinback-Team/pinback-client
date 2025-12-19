import { Icon } from '@pinback/design-system/icons';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-gray100 border-t-2 px-[8rem] py-[3.2rem]">
      <Icon
        name="logo"
        aria-label="Pinback 로고"
        className="h-[2.8rem] w-[10.1rem]"
      />
      <div className="mt-[2.4rem] flex gap-[0.8rem]">
        <a
          href="https://right-turquoise-268.notion.site/pinback-2c527450eb1c80eca220c1de3293e43a?source=copy_link"
          target="_blank"
          rel="noopener noreferrer"
          className="caption1-sb text-font-gray-2 cursor-pointer hover:underline"
        >
          이용약관
        </a>
        <p className="caption1-sb text-font-gray-2">|</p>
        <a
          href=" https://right-turquoise-268.notion.site/pinback-2c527450eb1c804390effb2ee32072b2?source=copy_link"
          target="_blank"
          rel="noopener noreferrer"
          className="caption1-sb text-font-gray-2 cursor-pointer hover:underline"
        >
          개인정보처리방침
        </a>
      </div>

      <div className="flex justify-between">
        <div className="mt-[2.5rem]">
          <address className="flex gap-[0.8rem] not-italic">
            <p className="caption2-sb text-font-ltgray-4">운영팀 문의</p>
            <p className="caption2-m text-font-ltgray-4">
              이한비 · pinback0615@gmail.com
            </p>
          </address>
          <p className="caption2-m text-font-ltgray-4">
            ©{currentYear} pinback All rights reserved.
          </p>
        </div>

        <div className="flex items-end gap-[1.2rem]">
          <p className="caption2-m text-gray400">TEAM. 도묵이</p>
          <a
            href="https://instagram.com/pinback.today/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Pinback 인스타그램"
            className="transition-opacity hover:opacity-80"
          >
            <Icon name="instagram" width={28} height={28} />
          </a>
          <a
            href="https://pinback.palms.blog/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Pinback 블로그"
            className="transition-opacity hover:opacity-80"
          >
            <Icon name="palms" width={28} height={28} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
