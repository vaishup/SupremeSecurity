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
export declare type TheResidentUpdateFormInputValues = {
    Name?: string;
    phoneNo?: string;
    address?: string;
    clientID?: string;
    email?: string;
};
export declare type TheResidentUpdateFormValidationValues = {
    Name?: ValidationFunction<string>;
    phoneNo?: ValidationFunction<string>;
    address?: ValidationFunction<string>;
    clientID?: ValidationFunction<string>;
    email?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TheResidentUpdateFormOverridesProps = {
    TheResidentUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    Name?: PrimitiveOverrideProps<TextFieldProps>;
    phoneNo?: PrimitiveOverrideProps<TextFieldProps>;
    address?: PrimitiveOverrideProps<TextFieldProps>;
    clientID?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type TheResidentUpdateFormProps = React.PropsWithChildren<{
    overrides?: TheResidentUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    theResident?: any;
    onSubmit?: (fields: TheResidentUpdateFormInputValues) => TheResidentUpdateFormInputValues;
    onSuccess?: (fields: TheResidentUpdateFormInputValues) => void;
    onError?: (fields: TheResidentUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TheResidentUpdateFormInputValues) => TheResidentUpdateFormInputValues;
    onValidate?: TheResidentUpdateFormValidationValues;
} & React.CSSProperties>;
export default function TheResidentUpdateForm(props: TheResidentUpdateFormProps): React.ReactElement;
