import { useAppSelector } from "lib/hooks";
import { UserData } from "lib/interfaces";
import React from "react";
import { Field, Form } from "react-final-form";
import styled from "styled-components";
import { Input, Select, SelectMultiple, TextArea } from "ui";
import { Avatar } from "./components";

const ProfileSettings = () => {
  const { submit, data } = useAppSelector((state) => state.user);

  const onSubmit = () => {
    console.log("submit");
  };

  const onValidate = (user: UserData) => {
    return {};
  };

  const hands = [
    { id: "0", name: "R" },
    { id: "1", name: "L" },
  ];

  const positions = [
    { id: "0", name: "Catcher" },
    { id: "1", name: "First Base" },
    { id: "2", name: "Second Base" },
    { id: "3", name: "Shortstop" },
    { id: "4", name: "Third Base" },
    { id: "5", name: "Outfield" },
    { id: "6", name: "Pitcher" },
  ];

  const schoolYear = [
    { id: "0", name: "Freshman" },
    { id: "1", name: "Sophomore" },
    { id: "2", name: "Junior" },
    { id: "3", name: "Senior" },
    { id: "4", name: "None" },
  ];

  return (
    <Wrap>
      <Form
        onSubmit={onSubmit}
        validate={onValidate}
        initialValues={{ ...data }}
        render={({ form }) => (
          <>
            <Field name="avatar" onBlur={() => {}} component={Avatar} />

            <NameInputs>
              <PairWrap>
                <Field
                  name="first_name"
                  title="First Name *"
                  placeholder="First Name *"
                  onBlur={() => {}}
                  component={Input}
                />
              </PairWrap>
              <PairWrap>
                <Field
                  name="last_name"
                  title="Label Name *"
                  placeholder={"Label Name *"}
                  onBlur={() => {}}
                  component={Input}
                />
              </PairWrap>
            </NameInputs>
            <InputWrap>
              <Field name="position" placeholder="Position in Game *">
                {(props) => <Select props={props} values={positions} />}
              </Field>
            </InputWrap>

            <InputWrap>
              <Field name="position2" placeholder="Secondary Position in Game">
                {(props) => (
                  <Select
                    props={props}
                    values={[{ id: "9", name: "" }, ...positions]}
                  />
                )}
              </Field>
            </InputWrap>

            <TitleWrap>
              <Title>Personal Info</Title>
              <TitleLine />
            </TitleWrap>

            <InputWrap>
              <Field
                name="age"
                title="Age *"
                placeholder="Age *"
                onBlur={() => {}}
                component={Input}
              />
            </InputWrap>

            <Pair>
              <PairWrap>
                <Field
                  name="feet"
                  title="Feet *"
                  placeholder="Feet *"
                  onBlur={() => {}}
                  component={Input}
                />
              </PairWrap>
              <PairWrap>
                <Field
                  name="inches"
                  title="Inches"
                  placeholder="Inches"
                  onBlur={() => {}}
                  component={Input}
                />
              </PairWrap>
            </Pair>

            <InputWrap>
              <Field
                name="weight"
                title="Weight *"
                placeholder="Weight *"
                onBlur={() => {}}
                component={Input}
              />
            </InputWrap>

            <Pair>
              <PairWrap>
                <Field name="throws_hand" placeholder="Throws *">
                  {(props) => <Select props={props} values={hands} />}
                </Field>
              </PairWrap>
              <PairWrap>
                <Field name="bats_hand" placeholder="Bats *">
                  {(props) => <Select props={props} values={hands} />}
                </Field>
              </PairWrap>
            </Pair>

            <TitleWrap>
              <Title>School</Title>
              <TitleLine />
            </TitleWrap>

            <InputWrap>
              <Field name="school" placeholder="School">
                {(props) => (
                  <Select customValue props={props} values={positions} />
                )}
              </Field>
            </InputWrap>
            <InputWrap>
              <Field name="school_year" placeholder="School Year">
                {(props) => <Select props={props} values={schoolYear} />}
              </Field>
            </InputWrap>
            <InputWrap>
              <Field name="teams">
                {({ input }) => (
                  <SelectMultiple
                    input={input}
                    placeholder="Team"
                    values={[
                      { id: "0", name: "Example" },
                      { id: "2", name: "Team" },
                      { id: "3", name: "dscsd" },
                    ]}
                  />
                )}
              </Field>
            </InputWrap>

            <TitleWrap>
              <Title>Facility</Title>
              <TitleLine />
            </TitleWrap>

            <InputWrap>
              <Field name="facilities">
                {({ input }) => (
                  <SelectMultiple
                    input={input}
                    placeholder="Facility"
                    customValue={false}
                    values={[
                      { id: "0", name: "Example" },
                      { id: "2", name: "Team" },
                      { id: "3", name: "dscsd" },
                    ]}
                  />
                )}
              </Field>
            </InputWrap>

            <TitleWrap>
              <Title>About</Title>
              <TitleLine />
            </TitleWrap>

            <InputWrap>
              <Field
                name="biography"
                title="About"
                placeholder="Describe yourself in a few words"
                onBlur={() => {}}
                component={TextArea}
              />
            </InputWrap>

            <Pair>
              <PairWrap>
                <ButtonCancel
                  isSubmitting={submit.status}
                  disabled={submit.status}
                  onClick={() => form.reset()}
                >
                  Cancel
                </ButtonCancel>
              </PairWrap>
              <PairWrap>
                <ButtonSubmit
                  isSubmitting={submit.status}
                  disabled={submit.status}
                  onClick={form.submit}
                >
                  Save
                </ButtonSubmit>
              </PairWrap>
            </Pair>
          </>
        )}
      />
    </Wrap>
  );
};

const Wrap = styled.aside`
  position: relative;
  width: 298px;
  max-height: 100%;
  background: #ffffff;
  height: auto;
  display: block;
  transition: all 0.1s;
  box-shadow: 0 2px 15px 0 rgb(0 0 0 / 10%);
  background: #fff;
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  padding: 16px;
  overflow: auto;
  z-index: 5;
`;

const InputWrap = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
`;

const TitleWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin: 15px 0;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 900;
  color: #414f5a;
  white-space: pre;
  background-color: #ffffff;
  padding-right: 12px;
`;

const TitleLine = styled.hr`
  width: 100%;
  height: 1px;
  background-color: #e7ebef;
  border: none;
`;

const Pair = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PairWrap = styled.div`
  width: 48%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
`;

const ButtonSubmit = styled.button<{ isSubmitting: boolean }>`
  width: 100%;
  padding: 7px 19px 10px 18px;
  font-size: 1.6rem;
  border: 1px solid transparent;
  border-radius: 4px;
  color: #ffffff;
  font-weight: 400;
  background-color: ${({ isSubmitting }) =>
    isSubmitting ? "#23527c" : "#48bbff"};
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 4px 0 rgb(72 187 255 / 100%);
  }
`;

const ButtonCancel = styled.button<{ isSubmitting: boolean }>`
  width: 100%;
  padding: 7px 19px 10px 18px;
  font-size: 1.6rem;
  border: solid 1px #d1d7db;
  border-radius: 4px;
  font-weight: 400;
  background-color: ${({ isSubmitting }) =>
    isSubmitting ? "#23527c" : "white"};
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 4px 0 rgb(72 187 255 / 100%);
    * {
      box-shadow: 0 0 4px 0 rgb(72 187 255 / 100%);
    }
  }
`;

const NameInputs = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
`;

export default ProfileSettings;
