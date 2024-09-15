/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type TheNoteCreateFormInputValues = {
    note?: string;
    clientID?: string;
    staffID?: string;
};
export declare type TheNoteCreateFormValidationValues = {
    note?: ValidationFunction<string>;
    clientID?: ValidationFunction<string>;
    staffID?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TheNoteCreateFormOverridesProps = {
    TheNoteCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    note?: PrimitiveOverrideProps<TextFieldProps>;
    clientID?: PrimitiveOverrideProps<TextFieldProps>;
    staffID?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type TheNoteCreateFormProps = React.PropsWithChildren<{
    overrides?: TheNoteCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: TheNoteCreateFormInputValues) => TheNoteCreateFormInputValues;
    onSuccess?: (fields: TheNoteCreateFormInputValues) => void;
    onError?: (fields: TheNoteCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TheNoteCreateFormInputValues) => TheNoteCreateFormInputValues;
    onValidate?: TheNoteCreateFormValidationValues;
} & React.CSSProperties>;
export default function TheNoteCreateForm(props: TheNoteCreateFormProps): React.ReactElement;
