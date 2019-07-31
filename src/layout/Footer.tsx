import React, {FC, CSSProperties} from 'react';
import {Layout} from 'antd';
import styled from '@emotion/styled';

const StyledFooter = styled.footer`
  margin: 24px 0 24px 0;
  padding: 0 16px;
  text-align: center;

  .footer-link {
    margin-top: 8px;

    > a {
      color: rgba(0, 0, 0, 0.45);
      transition: all 0.3s;
      text-decoration: none;
      background-color: transparent;
      outline: none;
      cursor: pointer;
    }
  }

  .footer-copyright {
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
  }
`;

interface FooterProps {
  href?: string;
  name?: string;
  blankTarget?: boolean;
  style?: CSSProperties;
}
const Footer: FC<FooterProps> = (props) => {
  return (
    <Layout.Footer style={props.style}>
      <StyledFooter>
        <div className="footer-copyright">KOL Admin</div>
        <div className="footer-link">
          <a
            href={props.href || 'http://www.admaster.com.cn'}
            title={props.name}
            target={!props.blankTarget ? '_self' : '_blank'}
          >
            版权所有 © Copyright AdMaster Inc
          </a>
        </div>
      </StyledFooter>
    </Layout.Footer>
  );
};

export default Footer;
