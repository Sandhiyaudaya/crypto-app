import Styles from './Footer.module.css';

interface FooterProps {
  footerContent: string;
}
export const Footer = ({ footerContent }: FooterProps) => {
  return <div className={Styles.footer}>{footerContent}</div>;
};
