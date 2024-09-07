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
export declare type ThePostCreateFormInputValues = {
    note?: string;
    date?: string;
    clientID?: string;
};
export declare type ThePostCreateFormValidationValues = {
    note?: ValidationFunction<string>;
    date?: ValidationFunction<string>;
    clientID?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ThePostCreateFormOverridesProps = {
    ThePostCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    note?: PrimitiveOverrideProps<TextFieldProps>;
    date?: PrimitiveOverrideProps<TextFieldProps>;
    clientID?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ThePostCreateFormProps = React.PropsWithChildren<{
    overrides?: ThePostCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ThePostCreateFormInputValues) => ThePostCreateFormInputValues;
    onSuccess?: (fields: ThePostCreateFormInputValues) => void;
    onError?: (fields: ThePostCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ThePostCreateFormInputValues) => ThePostCreateFormInputValues;
    onValidate?: ThePostCreateFormValidationValues;
} & React.CSSProperties>;
export default function ThePostCreateForm(props: ThePostCreateFormProps): React.ReactElement;
