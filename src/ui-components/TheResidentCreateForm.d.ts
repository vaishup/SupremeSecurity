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
export declare type TheResidentCreateFormInputValues = {
    Name?: string;
    phoneNo?: string;
    address?: string;
    clientID?: string;
};
export declare type TheResidentCreateFormValidationValues = {
    Name?: ValidationFunction<string>;
    phoneNo?: ValidationFunction<string>;
    address?: ValidationFunction<string>;
    clientID?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TheResidentCreateFormOverridesProps = {
    TheResidentCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    Name?: PrimitiveOverrideProps<TextFieldProps>;
    phoneNo?: PrimitiveOverrideProps<TextFieldProps>;
    address?: PrimitiveOverrideProps<TextFieldProps>;
    clientID?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type TheResidentCreateFormProps = React.PropsWithChildren<{
    overrides?: TheResidentCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: TheResidentCreateFormInputValues) => TheResidentCreateFormInputValues;
    onSuccess?: (fields: TheResidentCreateFormInputValues) => void;
    onError?: (fields: TheResidentCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TheResidentCreateFormInputValues) => TheResidentCreateFormInputValues;
    onValidate?: TheResidentCreateFormValidationValues;
} & React.CSSProperties>;
export default function TheResidentCreateForm(props: TheResidentCreateFormProps): React.ReactElement;
