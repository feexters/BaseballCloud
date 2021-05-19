import React, { useState } from "react";
import styled from "styled-components";
import { LogoIcon, TriangleIcon } from "assets";
import { useHistory, useLocation } from "react-router-dom";
import { ROUTE_LEADERBOARD, ROUTE_NETWORK, ROUTE_PROFILE } from "lib/const";
import { useAppSelector } from "lib/hooks";
import avatarImage from "assets/images/user.png";
import { DropDownPanel } from "ui";

const Header = () => {
  const history = useHistory();
  const location = useLocation();
  const {
    auth: { isValid },
    user: { data },
  } = useAppSelector((state) => state);

  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const selectMenu = [
    { id: "0", value: "My Profile" },
    { id: "1", value: "Log Out" },
  ];

  const onSelect = (id: string) => {
    if (id === selectMenu[0].id) {
      history.push(ROUTE_PROFILE);
    } else {
      // dispatch(...)
    }

    setIsDropDownOpen(false);
  };

  return (
    <HeaderWrap>
      <LogoIcon />
      {isValid && (
        <NavigationWrap>
          <NavigationItem
            onClick={() => history.push(ROUTE_LEADERBOARD)}
            isActive={location.pathname === ROUTE_LEADERBOARD}
          >
            Leaderboard
          </NavigationItem>
          <NavigationItem
            onClick={() => history.push(ROUTE_NETWORK)}
            isActive={location.pathname === ROUTE_NETWORK}
          >
            Network
          </NavigationItem>
          <ProfileWrap>
          <PlayerAvatar image={data.avatar}></PlayerAvatar>
            <ProfileMenu onClick={() => setIsDropDownOpen(!isDropDownOpen)}>
              {data.first_name && data.last_name
                ? `${data.first_name} ${data.last_name}`
                : "Profile Name"}
              <IconWrap>
                <TriangleIcon />
              </IconWrap>
            </ProfileMenu>
            <DropDownPanel
            items={selectMenu}
            isOpen={isDropDownOpen}
            onSelect={onSelect}
          />
          </ProfileWrap>
        </NavigationWrap>
      )}
    </HeaderWrap>
  );
};

const HeaderWrap = styled.header`
  width: 100%;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #788b99;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const ProfileMenu = styled.div`
  display: flex;
  padding: 7px 18px 10px 18px;
  border-radius: 4px;
  box-shadow: none;
  font-size: 16px;
  line-height: 19px;
  font-weight: 400;
  cursor: pointer;

  &:hover {
    background: #eee;
  }
`;

const ProfileWrap = styled.div`
  display: flex;
  position: relative;
  align-items: center;
`;

const NavigationWrap = styled.div`
  display: flex;
  align-items: center;
`;

const IconWrap = styled.div`
  margin-left: 5px;
`;

const NavigationItem = styled.div<{ isActive: boolean }>`
  position: relative;
  padding: 0 8px;
  color: #788b99;
  cursor: pointer;
  font-size: 1.6rem;

  &:hover::after {
    opacity: 0.4;
  }

  &::after {
    border-bottom: 4px solid #788b99;
    content: "";
    display: block;
    left: 0;
    right: 0;
    position: absolute;
    bottom: -15px;
    opacity: ${({ isActive }) => (isActive ? "1" : "0")};
  }
`;

const PlayerAvatar = styled.div<{ image: string }>`
  width: 32px;
  height: 32px;
  background-size: cover;
  background-position: 50% 50%;
  border-radius: 50%;
  margin-left: 10px;
  background-image: url(${({ image }) => (image ? image : avatarImage)});
`;

export default Header;
