import { DateIcon, DropDownIcon } from "assets";
import React, { forwardRef, useRef } from "react";
import DatePicker from "react-datepicker";
import "./styles/index.css";
import styled from "styled-components";

interface DateSelectProps {
  date: Date | null | undefined;
  setDate(date: Date | [Date, Date] | null): void;
  isSelect?: boolean 
}

interface ButtonProps {
  value: string;
}

const DateSelect: React.FC<DateSelectProps> = ({ date, setDate, isSelect }) => {
  const calendarRef = useRef<DatePicker>(null);

  const toggleDatePicker = () => {
    if (calendarRef.current?.isCalendarOpen()) {
      calendarRef.current!.setOpen(false);
    } else {
      calendarRef.current?.setOpen(true);
    }
  };

  const ExampleCustomInput = forwardRef<HTMLDivElement, ButtonProps>(
    ({ value }, ref) => (
      <Wrap onClick={toggleDatePicker} ref={ref}>
        <DateIcon />
        <Text>{!isSelect ? "Data" : `Data (${value})`}</Text>
        <Icon isOpen={calendarRef.current?.isCalendarOpen() || false}>
          <DropDownIcon />
        </Icon>
      </Wrap>
    )
  );

  return (
    <DatePicker
      ref={calendarRef}
      selected={date}
      onChange={setDate}
      popperPlacement="top-end"
      disabledKeyboardNavigation
      customInput={<ExampleCustomInput value="" />}
    />
  );
};

const Wrap = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Text = styled.span`
  font-size: 16px;
  line-height: 1.19;
  color: #48bbff;
  white-space: nowrap;
  margin-left: 5px;
`;

const Icon = styled.div<{ isOpen: boolean }>`
  margin-left: 5px;
  transform: rotate(${({ isOpen }) => (isOpen ? "180deg" : "0deg")});
  margin-top: ${({ isOpen }) => (isOpen ? "0" : "3px")};
`;

export default DateSelect;
