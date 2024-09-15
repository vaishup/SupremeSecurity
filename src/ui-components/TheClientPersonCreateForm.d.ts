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
export declare type TheClientPersonCreateFormInputValues = {
    clientID?: string;
    name?: string;
    phone?: string;
    email?: string;
};
export declare type TheClientPersonCreateFormValidationValues = {
    clientID?: ValidationFunction<string>;
    name?: ValidationFunction<string>;
    phone?: ValidationFunction<string>;
    email?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TheClientPersonCreateFormOverridesProps = {
    TheClientPersonCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    clientID?: PrimitiveOverrideProps<TextFieldProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    phone?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type TheClientPersonCreateFormProps = React.PropsWithChildren<{
    overrides?: TheClientPersonCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: TheClientPersonCreateFormInputValues) => TheClientPersonCreateFormInputValues;
    onSuccess?: (fields: TheClientPersonCreateFormInputValues) => void;
    onError?: (fields: TheClientPersonCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TheClientPersonCreateFormInputValues) => TheClientPersonCreateFormInputValues;
    onValidate?: TheClientPersonCreateFormValidationValues;
} & React.CSSProperties>;
export default function TheClientPersonCreateForm(props: TheClientPersonCreateFormProps): React.ReactElement;
