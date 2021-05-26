import { DateIcon } from "assets";
import { AvatarData, EventNormalizeData } from "lib/interfaces";
import React, { useState } from "react";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import avatarImage from "assets/images/user.png";
import { useHistory } from "react-router";

interface EventsProps {
  events: EventNormalizeData[];
  avatars: { [key: string]: AvatarData };
  isProfile?: boolean;
}

interface Position {
  x: number;
  y: number;
}

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const Events: React.FC<EventsProps> = ({
  events,
  avatars,
  isProfile = false,
}) => {
  const [avatarInfo, setAvatarInfo] = useState("");
  const [avatarInfoPosition, setAvatarInfoPosition] = useState<Position>({
    x: 0,
    y: 0,
  });
  const [isHoverAvatar, setIsHoverAvatar] = useState(false);

  const history = useHistory();

  const sliderSettings = {
    slidesToShow: 1,
    dots: false,
    slidesToScroll: 1,
    infinite: false,
    variableWidth: true,
    nextArrow: <ArrowNextWrap />,
    prevArrow: <ArrowPrevWrap />,
  };

  const onHoverAvatar = (name: string) => {
    setIsHoverAvatar(true);
    setAvatarInfo(name);
  };

  return (
    <Wrap>
      <Slider {...sliderSettings}>
        {events.length ? (
          events.map((event) => (
            <Event key={event.id}>
              <EventType>{event.event_type}</EventType>
              <EventDate>
                <EventDateIcon>
                  <DateIcon />
                </EventDateIcon>
                <EventDay>{event.date.split("/")[0]}</EventDay>
                <EventMonth>
                  {monthNames[Number(event.date.split("/")[1]) - 1]}
                </EventMonth>
              </EventDate>
              {isProfile && (
                <EventName>
                  {event.data_rows_count} Pitches{" "}
                  {event.is_pitcher ? "Thrown" : "Seen"}
                </EventName>
              )}
              <EventName>{event.event_name}</EventName>
              <AvatarsWrap>
                {event.recent_avatars?.map((avatar) => (
                  <Avatar
                    image={avatars[avatar].avatar}
                    key={avatars[avatar].id}
                    onClick={() =>
                      history.push(`/profile/${avatars[avatar].id}`)
                    }
                    onMouseEnter={() =>
                      onHoverAvatar(
                        avatars[avatar].first_name +
                          " " +
                          avatars[avatar].last_name
                      )
                    }
                    onMouseLeave={() => setIsHoverAvatar(false)}
                    onMouseMove={(event) =>
                      setAvatarInfoPosition({
                        x: event.clientX,
                        y: event.clientY,
                      })
                    }
                  ></Avatar>
                ))}
              </AvatarsWrap>
            </Event>
          ))
        ) : (
          <Text>No data currently linked to this profile</Text>
        )}
      </Slider>
      <AvatarInfo
        style={{
          top: avatarInfoPosition.y - 25 + "px",
          left: avatarInfoPosition.x - 70 + "px",
        }}
        isVisible={isHoverAvatar}
      >
        View {avatarInfo} profile details
      </AvatarInfo>
    </Wrap>
  );
};

const Text = styled.p`
  display: block;
  color: #667784;
  font-size: 16px;
`;

const Wrap = styled.div`
  width: 100%;

  .slick-slide {
    margin: 0 5px;
  }
`;

const Event = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-right: 10px;
  padding: 26px 40px 18px 20px;
  border-radius: 4px;
  background-color: #ffffff;
  border: solid 1px #eff1f3;
  font-size: 1.6rem;
  transition: border-color 0.5s ease;
  cursor: pointer;

  &:hover {
    border-color: #48bbff;
  }
`;

const EventType = styled.span`
  position: absolute;
  top: 6px;
  left: 6px;
  color: #777;
  font-size: 12px;
  border: 1px solid #a0a0a0;
  border-radius: 3px;
  padding: 0 5px;
`;

const EventDate = styled.div`
  display: flex;
  align-items: flex-start;
`;

const EventDateIcon = styled.span`
  display: flex;
  margin-right: 6px;
  padding-top: 7px;
`;

const EventDay = styled.div`
  margin-right: 4px;
  text-align: center;
  font-size: 50px;
  font-weight: 300;
  line-height: 0.92;
  color: #414f5a;
`;

const EventMonth = styled.div`
  color: #414f5a;
  font-size: 19px;
  text-transform: uppercase;
  font-weight: 300;
`;

const EventName = styled.p`
  max-width: 155px;
  overflow: hidden;
  font-size: 1.4rem;
  line-height: 17px;
  font-weight: 400;
  color: #788b99;
  margin-bottom: 11px;
  padding-left: 20px;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const ArrowNextWrap = styled.span`
  position: absolute;
  top: 40px;
  right: 10px;
  font-size: 20px;

  &::before {
    content: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='44' height='44' viewBox='0 0 44 44'%3E%3Cdefs%3E%3Cpath id='b' d='M18 .72C27.544.72 35.28 8.456 35.28 18c0 9.545-7.736 17.28-17.28 17.28S.72 27.545.72 18C.72 8.456 8.456.72 18 .72z'/%3E%3Cfilter id='a' width='134.7%25' height='134.7%25' x='-17.4%25' y='-17.4%25' filterUnits='objectBoundingBox'%3E%3CfeOffset in='SourceAlpha' result='shadowOffsetOuter1'/%3E%3CfeGaussianBlur in='shadowOffsetOuter1' result='shadowBlurOuter1' stdDeviation='2'/%3E%3CfeColorMatrix in='shadowBlurOuter1' values='0 0 0 0 0.282352941 0 0 0 0 0.733333333 0 0 0 0 1 0 0 0 0.8 0'/%3E%3C/filter%3E%3C/defs%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill-rule='nonzero' transform='translate(4 4)'%3E%3Cuse fill='%23000' filter='url(%23a)' xlink:href='%23b'/%3E%3Cuse fill='%2348BBFF' fill-rule='evenodd' xlink:href='%23b'/%3E%3C/g%3E%3Cpath fill='%23FFF' d='M23.8 22l-4.144-4.51a.921.921 0 0 1 0-1.293.9.9 0 0 1 1.278 0l5.053 5.155a.92.92 0 0 1 0 1.29l-5.053 5.156a.896.896 0 0 1-1.278 0 .92.92 0 0 1 0-1.29L23.8 22z'/%3E%3C/g%3E%3C/svg%3E");
  }
`;

const ArrowPrevWrap = styled.span`
  position: absolute;
  top: 30px;
  left: 10px;
  font-size: 20px;
  transform: scale(-1, 1);
  z-index: 10;

  &::before {
    content: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='44' height='44' viewBox='0 0 44 44'%3E%3Cdefs%3E%3Cpath id='b' d='M18 .72C27.544.72 35.28 8.456 35.28 18c0 9.545-7.736 17.28-17.28 17.28S.72 27.545.72 18C.72 8.456 8.456.72 18 .72z'/%3E%3Cfilter id='a' width='134.7%25' height='134.7%25' x='-17.4%25' y='-17.4%25' filterUnits='objectBoundingBox'%3E%3CfeOffset in='SourceAlpha' result='shadowOffsetOuter1'/%3E%3CfeGaussianBlur in='shadowOffsetOuter1' result='shadowBlurOuter1' stdDeviation='2'/%3E%3CfeColorMatrix in='shadowBlurOuter1' values='0 0 0 0 0.282352941 0 0 0 0 0.733333333 0 0 0 0 1 0 0 0 0.8 0'/%3E%3C/filter%3E%3C/defs%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill-rule='nonzero' transform='translate(4 4)'%3E%3Cuse fill='%23000' filter='url(%23a)' xlink:href='%23b'/%3E%3Cuse fill='%2348BBFF' fill-rule='evenodd' xlink:href='%23b'/%3E%3C/g%3E%3Cpath fill='%23FFF' d='M23.8 22l-4.144-4.51a.921.921 0 0 1 0-1.293.9.9 0 0 1 1.278 0l5.053 5.155a.92.92 0 0 1 0 1.29l-5.053 5.156a.896.896 0 0 1-1.278 0 .92.92 0 0 1 0-1.29L23.8 22z'/%3E%3C/g%3E%3C/svg%3E");
  }
`;

const AvatarsWrap = styled.div`
  display: flex;
  padding-left: 20px;
`;

const Avatar = styled.a<{ image: string | null }>`
  width: 22px;
  height: 22px;
  display: block;
  border: 1px solid white;
  border-radius: 50%;
  background-image: url(${({ image }) => (image ? image : avatarImage)});
  background-size: cover;
  background-position: 50% 50%;
  transition: border-color 0.5s ease;

  &:hover {
    border-color: #48bbff;

    .avatar__info {
      display: block;
    }
  }
`;

const AvatarInfo = styled.div<{ isVisible: boolean }>`
  display: ${({ isVisible }) => (isVisible ? "block" : "none")};
  opacity: ${({ isVisible }) => (isVisible ? "1" : "0")};
  position: absolute;
  padding: 2px 5px;
  background-color: black;
  border-radius: 4px;
  color: rgba(255, 255, 255, 0.8);
  transition: background-color 0.3s ease;
`;

export default Events;
