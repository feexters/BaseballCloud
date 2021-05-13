import React from 'react';
import styled from 'styled-components';
import { LogoIcon } from 'assets';

const Header = () => {
    return (
        <HeaderWrap>
            <LogoIcon />
        </HeaderWrap>
    );
}

const HeaderWrap = styled.header`
    width: 100%;
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #788b99;
    border-bottom: 1px solid rgba(0,0,0,.1);
`

export default Header;
