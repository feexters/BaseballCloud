import { SelectArrowIcon } from "assets";
import { getId } from "lib/utils";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Field, FieldInputProps, Form } from "react-final-form";
import styled from "styled-components";

interface Item {
  id: string;
  name: string;
}

interface SelectProps {
  placeholder: string;
  input: FieldInputProps<any, HTMLElement>;
  values: Item[];
  customValue?: boolean;
}

const Select: React.FC<SelectProps> = ({
  placeholder,
  values,
  input,
  customValue = true,
}) => {
  const selectedItems = useMemo(() => input.value ? (input.value as Item[]) : ([] as Item[]), [input.value]);

  const showingValues = useMemo(
    () =>
      values.filter(
        (item) =>
          !selectedItems.filter((selected) => selected.id === item.id).length
      ),
    [values, selectedItems]
  );

  const [isOpen, setIsOpen] = useState(false);
  const [hoverId, setHoverId] = useState(
    showingValues.length ? showingValues[0].id : "0"
  );
  const [createValue, setCreateValue] = useState({ id: getId(), name: "" });

  useEffect(() => {
    if (createValue.name) {
      setHoverId(createValue.id);
    }
  }, [createValue]);

  useEffect(() => {
    if (!isOpen) {
      inputRef.current!.blur();
    } else {
      inputRef.current!.focus();
    }
  }, [isOpen]);

  const inputRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLDivElement>(null);

  const onClose = () => {
    setIsOpen(false);
    removeBlurListener();
  };

  const onOpen = () => {
    if (!isOpen) {
      addBlurListener();
      setIsOpen(true);
    }
  };

  const onSearch = (value: string) => {
    // dispatch(...)
    if (value.trim()) {
      setCreateValue({ id: createValue.id, name: `Create option "${value}"` });
    } else {
      setCreateValue({ id: createValue.id, name: `` });
    }
  };

  const onClick = (item: Item) => {
    onClose();
    if (item.id === createValue.id) {
      onSubmit({ inputMultiValue: inputRef.current!.value });
    } else {
      input.onChange([...selectedItems, item]);
    }

    setCreateValue({ id: getId(), name: "" });
  };

  const onDelete = (id: string) => {
    const values = selectedItems.filter((item) => item.id !== id);
    input.onChange(values);
  };

  const onSubmit = ({ inputMultiValue }: { inputMultiValue: string }) => {
    if (inputMultiValue && inputMultiValue.trim() && customValue) {
      const values = [...selectedItems, { id: getId(), name: inputMultiValue }];
      input.onChange(values);
      onClose();
    }
  };

  const onInputBlur = (reset: () => void) => {
    if (isOpen) {
      inputRef.current!.focus();
    } else {
      inputRef.current!.blur();
      reset();
    }
  };

  const onBlur = (event: MouseEvent) => {
    if (!selectRef.current!.contains(event.target as Node)) {
      onClose();
    }
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Backspace" && selectedItems.length) {
      if (!(event.target as HTMLInputElement).value) {
        onDelete(selectedItems[selectedItems.length - 1].id);
        onClose();
      }
    }
  };

  const addBlurListener = () => {
    document.addEventListener("mousedown", onBlur);
  };

  const removeBlurListener = () => {
    document.removeEventListener("mousedown", onBlur);
  };

  return (
    <Form
      onSubmit={onSubmit}
      render={({ form, handleSubmit }) => (
        <SelectForm
          onSubmit={(event) => {
            handleSubmit(event);
            if (customValue) {
              form.reset();
            }
          }}
        >
          <Field name="inputMultiValue">
            {({ input, rest }) => (
              <Wrap
                isOpen={isOpen}
                onClick={onOpen}
                id={input.name}
                ref={selectRef}
              >
                <Toggle>
                  <InputWrap>
                    {!selectedItems.length && !input.value ? (
                      <PlaceHolder isOpen={isOpen}>{placeholder}</PlaceHolder>
                    ) : (
                      selectedItems.map((item) => (
                        <SelectedItem key={item.id}>
                          <Close onClick={() => onDelete(item.id)}>×</Close>
                          <SelectedText>{item.name}</SelectedText>
                        </SelectedItem>
                      ))
                    )}
                    <Input
                      {...input}
                      {...rest}
                      onChange={(event) => {
                        input.onChange(event);
                        onSearch(event.target.value);
                      }}
                      onBlur={() => onInputBlur(form.reset)}
                      width={input.value.length * 16 || 5}
                      onKeyDown={onKeyDown}
                      ref={inputRef}
                    />
                  </InputWrap>
                  <ArrowWrap isOpen={isOpen}>
                    <SelectArrowIcon />
                  </ArrowWrap>
                </Toggle>

                {isOpen && (
                  <Selection>
                    {createValue.name && customValue
                      ? [createValue, ...showingValues].map((value) => (
                          <SelectionItem
                            isActive={value.id === hoverId}
                            onClick={() => onClick(value)}
                            onMouseEnter={() => setHoverId(value.id)}
                            key={value.id}
                          >
                            <Text>{value.name}</Text>
                          </SelectionItem>
                        ))
                      : showingValues.map((value) => (
                          <SelectionItem
                            isActive={value.id === hoverId}
                            onClick={() => onClick(value)}
                            onMouseEnter={() => setHoverId(value.id)}
                            key={value.id}
                          >
                            <Text>{value.name}</Text>
                          </SelectionItem>
                        ))}
                    {!createValue.name && !showingValues.length && (
                      <SelectionItem isActive={false}>
                        <Text>Type to search</Text>
                      </SelectionItem>
                    )}
                  </Selection>
                )}
                <Label htmlFor={input.name}>{placeholder}</Label>
              </Wrap>
            )}
          </Field>
        </SelectForm>
      )}
    />
  );
};

const Wrap = styled.div<{ isOpen: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 38px;
  padding: 4px 16px;
  position: relative;
  border-radius: 4px;
  background-color: ${({ isOpen }) => (isOpen ? "white" : "#eff1f3")};
  border: 1px solid transparent;
  cursor: ${({ isOpen }) => (isOpen ? "text" : "pointer")};
  ${({ isOpen }) =>
    isOpen &&
    "border-color: #48bbff;" +
      "border-radius: 4px 4px 0 0;" +
      "& > label {" +
      "transform: translate(-16px, -8px) scale(1.15);" +
      "visibility: visible;};"}
`;

const SelectForm = styled.form`
  width: 100%;
`;

const Toggle = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

const InputWrap = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  flex-wrap: wrap;
`;

const ArrowWrap = styled.div<{ isOpen: boolean }>`
  ${({ isOpen }) => isOpen && "transform: rotate(180deg);"}
`;

const Text = styled.span`
  display: block;
  font-size: 16px;
  line-height: 1.13;
  font-weight: 400;
  color: #667784;
`;

const PlaceHolder = styled.span<{ isOpen: boolean }>`
  display: block;
  font-size: 16px;
  line-height: 1.13;
  font-weight: 400;
  color: #667784;

  ${({ isOpen }) => isOpen && "opacity: .5; position: absolute;"}
`;

const Close = styled.span`
  display: block;
  height: 100%;
  padding: 3px 5px 3px 5px;
  border-right: 1px solid rgba(0, 126, 255, 0.24);
  font-size: 1.4rem;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 126, 255, 0.2);
  }
`;

const SelectedItem = styled.div`
  background-color: rgba(0, 126, 255, 0.08);
  border-radius: 2px;
  border: 1px solid rgba(0, 126, 255, 0.24);
  display: flex;
  align-items: center;
  line-height: 1.4;
  color: #007eff;
  margin: 2px 0;
  margin-right: 5px;
  user-select: none;
  cursor: auto;
`;

const SelectedText = styled.span`
  font-size: 1.4rem;
  padding: 0 2px;
`;

const Selection = styled.div`
  width: 100%;
  max-height: 200px;
  left: 0;
  top: 120%;
  position: absolute;
  border-radius: 4px;
  background-color: white;
  box-shadow: 0 2px 15px 0 rgb(0 0 0 / 10%);
  overflow: auto;
  padding-bottom: 8px;
  z-index: 10;
`;

const Input = styled.input<{ width: number }>`
  box-sizing: content-box;
  width: ${({ width }) => width + "px"};
  max-width: 100%;
  font-size: 1.6rem;
  line-height: 1.13;
  font-weight: 400;
  color: #667784;
  border: none;
  position: absolute;
  opacity: 0;
  z-index: -1;

  &:focus {
    position: relative;
    z-index: 20;
    opacity: 1;
    background-color: transparent;
    outline: none;
  }
`;

const Label = styled.label`
  position: absolute;
  top: 10px;
  left: 20px;
  cursor: text;
  max-width: 70%;
  text-overflow: ellipsis;
  transform-origin: left bottom;
  font-weight: 400;
  background-color: white;
  color: #788b99;
  visibility: hidden;
  transition: all ease 0.2s;
  z-index: 11;
`;

const SelectionItem = styled.div<{ isActive: boolean }>`
  margin-top: 8px;
  padding: 10px;
  background-color: ${({ isActive }) =>
    isActive ? "rgba(72, 187, 255, .2)" : "white"};
  cursor: pointer;
`;

export default Select;
