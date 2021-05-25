import React, { useState } from "react";
import styled from "styled-components";
import { LogoIcon, TriangleIcon } from "assets";
import { useHistory, useLocation } from "react-router-dom";
import { Routes } from "lib/const";
import { useAppDispatch, useAppSelector } from "lib/hooks";
import avatarImage from "assets/images/user.png";
import { DropDownPanel } from "ui";
import { client, CURRENT_PROFILE } from "apollo";
import { authSingOut } from "store";

const selectMenu = [
  { id: "0", value: "My Profile" },
  { id: "1", value: "Log Out" },
];

const Header: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const { isValid, auth_info } = useAppSelector((state) => state.auth);

  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const { current_profile } = client.readQuery({
    query: CURRENT_PROFILE,
  }) || { current_profile: null };

  const onSelect = (id: string) => {
    if (id === selectMenu[0].id) {
      history.push(Routes.PROFILE);
    } else {
      dispatch(authSingOut());
    }

    setIsDropDownOpen(false);
  };

  return (
    <HeaderWrap>
      <LogoWrap onClick={() => history.push(Routes.MAIN)}>
        <LogoIcon />
      </LogoWrap>
      {isValid && !isLoading && (
        <NavigationWrap>
          <NavigationList>
            <NavigationItem
              onClick={() => history.push(Routes.LEADERBOARD)}
              isActive={location.pathname === Routes.LEADERBOARD}
            >
              Leaderboard
            </NavigationItem>
            <NavigationItem
              onClick={() => history.push(Routes.NETWORK)}
              isActive={location.pathname === Routes.NETWORK}
            >
              Network
            </NavigationItem>
          </NavigationList>
          <ProfileWrap>
            {auth_info.role === "player" ? (
              <>
                <PlayerAvatar image={current_profile?.avatar}></PlayerAvatar>
                <ProfileMenu onClick={() => setIsDropDownOpen(!isDropDownOpen)}>
                  {current_profile?.first_name && current_profile?.last_name
                    ? `${current_profile?.first_name} ${current_profile?.last_name}`
                    : "Profile Name"}
                  <IconWrap>
                    <TriangleIcon />
                  </IconWrap>
                </ProfileMenu>
              </>
            ) : (
              <>
                <ProfileMenu onClick={() => setIsDropDownOpen(!isDropDownOpen)}>
                  {auth_info.email}
                  <IconWrap>
                    <TriangleIcon />
                  </IconWrap>
                </ProfileMenu>
              </>
            )}
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

const maxWidth = "640px";

const HeaderWrap = styled.header`
  width: 100%;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #788b99;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  @media (max-width: ${maxWidth}) {
    justify-content: center;
  }

  @media (max-width: 400px) {
    flex-direction: column;
  }
`;

const LogoWrap = styled.div`
  cursor: pointer;
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

const NavigationList = styled.div`
  display: flex;

  @media (max-width: ${maxWidth}) {
    margin-bottom: 20px;
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

  @media (max-width: ${maxWidth}) {
    flex-direction: column;
  }
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
