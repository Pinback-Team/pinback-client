import { Icon } from '@pinback/design-system/icons';
import { ROUTES_CONFIG } from '@routes/routesConfig';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="absolute bottom-0 mt-auto w-full px-[8rem] py-[3.2rem]">
      <div className="mt-[2.4rem] flex gap-[0.8rem]">
        <Link
          to={ROUTES_CONFIG.termsOfService.path}
          className="caption1-sb text-font-gray-2 cursor-pointer hover:underline"
        >
          이용약관
        </Link>
        <p className="caption1-sb text-font-gray-2">|</p>
        <Link
          to={ROUTES_CONFIG.privacyPolicy.path}
          className="caption1-sb text-font-gray-2 cursor-pointer hover:underline"
        >
          개인정보처리방침
        </Link>
      </div>

      <div className="flex items-center justify-between">
        <address className="flex gap-[0.8rem] not-italic">
          <p className="caption2-sb text-font-ltgray-4">운영팀 문의</p>
          <p className="caption2-m text-font-ltgray-4">
            이한비 · pinback0615@gmail.com
          </p>
        </address>
        <p className="caption2-m text-font-ltgray-4">
          ©{currentYear} pinback All rights reserved.
        </p>

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
