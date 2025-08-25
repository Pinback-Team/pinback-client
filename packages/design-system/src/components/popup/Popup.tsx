interface PopupProps {
  type: 'input' | 'subtext' | 'default';
  subtext?: string;
  placeholder?: string;
  title: string;
  left: string;
  right: string;
}

const Button = ({ type }: PopupProps) => {
  return <div>{type}</div>;
};

export default Button;
