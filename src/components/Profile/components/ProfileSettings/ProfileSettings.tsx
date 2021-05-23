import { UserData } from "lib/interfaces";
import { Validation } from "lib/utils";
import React from "react";
import { Field, Form } from "react-final-form";
import styled from "styled-components";
import { Input, Select, TextArea } from "ui";
import { Avatar, SchoolSelect, SelectFacilities } from "./components";
import { toastr } from "react-redux-toastr";
import { toastrProfileOptions } from "ui";
import { client, CURRENT_PROFILE, PROFILE } from "apollo";
import { TeamSelect } from "./components/TeamsSelect";
import { Default } from "react-spinners-css";
import { useMutation } from "@apollo/client";
import { UPDATE_PROFILE } from "apollo/mutations";
import { positions, schoolYear } from "lib/const";

const hands = [
  { id: "r", name: "R" },
  { id: "l", name: "L" },
];

interface UpdateData {
  update_profile: {
    profile: UserData;
  };
}

const ProfileSettings: React.FC<{ onToggle(): void }> = ({ onToggle }) => {
  const [submitProfile, { loading }] = useMutation<UpdateData>(UPDATE_PROFILE);

  const { current_profile } = client.readQuery({
    query: CURRENT_PROFILE,
  });

  const onSubmit = async (user: UserData) => {
    const submitUser = JSON.parse(JSON.stringify(user)) as UserData;

    submitUser.age = Number(submitUser.age);
    submitUser.weight = Number(submitUser.weight);
    submitUser.inches = Number(submitUser.inches);
    submitUser.feet = Number(submitUser.feet);

    await submitProfile({
      variables: { form: submitUser },
      update: (cache, { data }) => {
        const { update_profile } = data
          ? data
          : ({ update_profile: { profile: {} } } as UpdateData);

        const { profile } = cache.readQuery<{profile: UserData}>({
          query: PROFILE,
          variables: { id: update_profile.profile.id },
        }) || {profile: {} as UserData};

        cache.writeQuery({
          query: PROFILE,
          variables: {id: update_profile.profile.id},
          data: {
            profile: {...profile, ...update_profile.profile},
          }
        })

        cache.writeQuery({
          query: CURRENT_PROFILE,
          data: {
            current_profile: {...current_profile, ...update_profile.profile},
          }
        })
      },
    });

    onToggle();
    toastr.success("", "", toastrProfileOptions);
  };

  const onValidate = (user: UserData) => {
    const errors = {
      first_name: Validation.validation(user.first_name, "First Name "),
      last_name: Validation.validation(user.last_name, "Last Name "),
      position: Validation.validation(user.position, "Position "),
      age: Validation.age(user.age),
      feet: Validation.feet(user.feet),
      inches: Validation.inches(user.inches),
      weight: Validation.weight(user.weight),
      throws_hand: Validation.validation(user.throws_hand, "Throws "),
      bats_hand: Validation.validation(user.bats_hand, "Bats "),
    };

    let key: keyof typeof errors;

    for (key in errors) {
      if (errors[key]) {
        return errors;
      }
    }
    return {};
  };

  return (
    <Wrap>
      <Form
        onSubmit={onSubmit}
        validate={onValidate}
        initialValues={{ ...current_profile } as UserData}
        render={({ form, values }) => (
          <>
            <Field name="avatar" onBlur={() => {}} component={Avatar} />

            <FieldsWrap>
              <NameInputs>
                <PairWrap>
                  <Field
                    name="first_name"
                    title="First Name *"
                    placeholder="First Name *"
                    component={Input}
                  />
                </PairWrap>
                <PairWrap>
                  <Field
                    name="last_name"
                    title="Last Name *"
                    placeholder={"Last Name *"}
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
                <Field
                  name="position2"
                  placeholder="Secondary Position in Game"
                >
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
                  type="number"
                  component={Input}
                />
              </InputWrap>

              <Pair>
                <PairWrap>
                  <Field
                    name="feet"
                    title="Feet *"
                    placeholder="Feet *"
                    type="number"
                    component={Input}
                  />
                </PairWrap>
                <PairWrap>
                  <Field
                    name="inches"
                    title="Inches"
                    placeholder="Inches"
                    type="number"
                    component={Input}
                  />
                </PairWrap>
              </Pair>

              <InputWrap>
                <Field
                  name="weight"
                  title="Weight *"
                  placeholder="Weight *"
                  type="number"
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
                  {(props) => <SchoolSelect props={props} />}
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
                    <TeamSelect input={input} placeholder="Team" />
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
                    <SelectFacilities input={input} placeholder="Facility" />
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

              {!Validation.userFieldsRequired(values) && (
                <ErrorValidation>
                  * Fill out the required fields
                </ErrorValidation>
              )}
              <Pair>
                <PairWrap>
                  <ButtonCancel
                    isSubmitting={loading}
                    disabled={loading}
                    onClick={() => {
                      form.reset();
                      onToggle();
                    }}
                  >
                    Cancel
                  </ButtonCancel>
                </PairWrap>
                <PairWrap>
                  <ButtonSubmit
                    isSubmitting={loading}
                    disabled={loading}
                    onClick={() => form.submit()}
                  >
                    {loading ? <Default size={20} color={"white"} /> : "Save"}
                  </ButtonSubmit>
                </PairWrap>
              </Pair>
            </FieldsWrap>
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
  display: flex;
  flex-direction: column;
  transition: all 0.1s;
  box-shadow: 0 2px 15px 0 rgb(0 0 0 / 10%);
  background: #fff;
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  padding: 16px;
  overflow: auto;
  z-index: 5;

  @media (max-width: 640px) {
    flex-direction: row;
  }
`;

const FieldsWrap = styled.div`
  width: 100%;
  flex-direction: column;
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
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  margin-bottom: 10px;
`;

const ErrorValidation = styled.span`
  display: block;
  font-size: 1.6rem;
  align-self: flex-start;
  margin-top: 8px;
  color: #f05f62;
  margin-bottom: 10px;
`;

const ButtonSubmit = styled.button<{ isSubmitting: boolean }>`
  width: 100%;
  min-height: 43px;
  padding: 7px 19px 10px 18px;
  font-size: 1.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  border-radius: 4px;
  color: #ffffff;
  font-weight: 400;
  background-color: ${({ isSubmitting }) =>
    isSubmitting ? "#75a4bf" : "#48bbff"};
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
  color: ${({ isSubmitting }) => (isSubmitting ? "white" : "black")};
  background-color: ${({ isSubmitting }) =>
    isSubmitting ? "#75a4bf" : "white"};
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
