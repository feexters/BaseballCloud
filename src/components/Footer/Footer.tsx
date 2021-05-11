import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <Wrap>
      <Legal>
        <Text>© 2018 BaseballCloud</Text>
        <Link>Terms of Service</Link>
        <Link>Privacy Policy</Link>
      </Legal>
      <SocialMedia>
        <Link href="https://baseballcloud.blog">Blog</Link>
        <Link href="http://twitter.com/baseballcloudus">Twitter</Link>
        <Link href="http://www.instagram.com/baseballcloudus/">Instagram</Link>
        <Link href="http://www.facebook.com/BaseballCloudUS/">Facebook</Link>
      </SocialMedia>
    </Wrap>
  );
};

const maxWidth = 665;

const Wrap = styled.footer`
  width: 100%;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: ${maxWidth}px) {
    flex-direction: column;
  }
`;

const Text = styled.span`
  font-size: 1.4rem;
  padding-right: 10px;

  @media (max-width: ${maxWidth}px) {
    display: block;
    text-align: center;
    padding: 5px 0; 
  }
`;

const Link = styled.a`
  color: #337ab7;
  font-size: 1.4rem;
  text-decoration: none;
  padding: 0 8px;
  cursor: pointer;
  &:hover {
    color: #23527C;
    text-decoration: underline;
  }
`;

const SocialMedia = styled.div`
@media (max-width: ${maxWidth}px) {
    order: 1;
    padding-bottom: 8px;
  }
`;

const Legal = styled.div`
@media (max-width: ${maxWidth}px) {
    order: 2;
  }
`;

export default Footer;
