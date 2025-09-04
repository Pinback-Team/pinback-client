import HeaderLogo from '../../../../assets/onBoarding/icons/header_logo.svg';
const Header = () => {
  return (
    <div
      className="z-5 absolute top-0 flex w-full justify-items-start px-[8rem] py-[2.5rem]"
      onClick={() => window.location.reload()}
    >
      <img src={HeaderLogo} alt="header logo" />
    </div>
  );
};

export default Header;
