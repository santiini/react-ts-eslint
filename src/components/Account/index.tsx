import React, {FC} from 'react';
import styled from '@emotion/styled';
import {Avatar} from 'antd';

export const AccountContainer = styled.div`
  display: flex;
  align-items: center;
  padding-left: 5px;

  .user-card-avatar {
    margin-right: 8px;
  }

  .user-card-name {
    white-space: nowrap;
  }

  .user-card-content {
    display: flex;
    align-items: center;
    padding-left: 5px;
  }
`;

interface AccountProps {
  name: string;
  avatar?: string;
  url?: string;
  size?: number;
}
const Account: FC<AccountProps> = (props) => {
  const {name, avatar, url, size} = props;
  return (
    <AccountContainer>
      {avatar && (
        <span className="user-card-avatar">
          <Avatar
            src={avatar}
            // src={
            //   avatar.includes('https')
            //     ? avatar
            //     : replace(avatar, 'http', 'https')
            // }
            size={size}
          />
        </span>
      )}
      {!!url ? (
        <a
          style={{whiteSpace: 'nowrap'}}
          href={url}
          target={
            url.indexOf('http://') > -1 || url.indexOf('https://') > -1
              ? '_blank'
              : ''
          }
        >
          {name && name.length > 10 ? `${name.slice(0, 10)}...` : name}
        </a>
      ) : (
        <span className="user-card-name">{name}</span>
      )}
    </AccountContainer>
  );
};

export default Account;
