/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getTheNote } from "../graphql/queries";
import { updateTheNote } from "../graphql/mutations";
const client = generateClient();
export default function TheNoteUpdateForm(props) {
  const {
    id: idProp,
    theNote: theNoteModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    note: "",
    clientID: "",
  };
  const [note, setNote] = React.useState(initialValues.note);
  const [clientID, setClientID] = React.useState(initialValues.clientID);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = theNoteRecord
      ? { ...initialValues, ...theNoteRecord }
      : initialValues;
    setNote(cleanValues.note);
    setClientID(cleanValues.clientID);
    setErrors({});
  };
  const [theNoteRecord, setTheNoteRecord] = React.useState(theNoteModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getTheNote.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getTheNote
        : theNoteModelProp;
      setTheNoteRecord(record);
    };
    queryData();
  }, [idProp, theNoteModelProp]);
  React.useEffect(resetStateValues, [theNoteRecord]);
  const validations = {
    note: [],
    clientID: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          note: note ?? null,
          clientID: clientID ?? null,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: updateTheNote.replaceAll("__typename", ""),
            variables: {
              input: {
                id: theNoteRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "TheNoteUpdateForm")}
      {...rest}
    >
      <TextField
        label="Note"
        isRequired={false}
        isReadOnly={false}
        value={note}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              note: value,
              clientID,
            };
            const result = onChange(modelFields);
            value = result?.note ?? value;
          }
          if (errors.note?.hasError) {
            runValidationTasks("note", value);
          }
          setNote(value);
        }}
        onBlur={() => runValidationTasks("note", note)}
        errorMessage={errors.note?.errorMessage}
        hasError={errors.note?.hasError}
        {...getOverrideProps(overrides, "note")}
      ></TextField>
      <TextField
        label="Client id"
        isRequired={false}
        isReadOnly={false}
        value={clientID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              note,
              clientID: value,
            };
            const result = onChange(modelFields);
            value = result?.clientID ?? value;
          }
          if (errors.clientID?.hasError) {
            runValidationTasks("clientID", value);
          }
          setClientID(value);
        }}
        onBlur={() => runValidationTasks("clientID", clientID)}
        errorMessage={errors.clientID?.errorMessage}
        hasError={errors.clientID?.hasError}
        {...getOverrideProps(overrides, "clientID")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || theNoteModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || theNoteModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
