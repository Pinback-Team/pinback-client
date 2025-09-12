import HeaderLogo from '@assets/onBoarding/icons/header_logo.svg';
const Header = () => {
  return (
    <header
      className="z-5 absolute top-0 flex w-full justify-items-start px-[8rem] py-[2.5rem]"
    >
      <img src={HeaderLogo} alt="header logo"  onClick={() => window.location.reload()}/>
    </header>
  );
};

export default Header;
