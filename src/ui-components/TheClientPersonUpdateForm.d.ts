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
export declare type TheClientPersonUpdateFormInputValues = {
    clientID?: string;
    name?: string;
    phone?: string;
    email?: string;
};
export declare type TheClientPersonUpdateFormValidationValues = {
    clientID?: ValidationFunction<string>;
    name?: ValidationFunction<string>;
    phone?: ValidationFunction<string>;
    email?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TheClientPersonUpdateFormOverridesProps = {
    TheClientPersonUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    clientID?: PrimitiveOverrideProps<TextFieldProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    phone?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type TheClientPersonUpdateFormProps = React.PropsWithChildren<{
    overrides?: TheClientPersonUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    theClientPerson?: any;
    onSubmit?: (fields: TheClientPersonUpdateFormInputValues) => TheClientPersonUpdateFormInputValues;
    onSuccess?: (fields: TheClientPersonUpdateFormInputValues) => void;
    onError?: (fields: TheClientPersonUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TheClientPersonUpdateFormInputValues) => TheClientPersonUpdateFormInputValues;
    onValidate?: TheClientPersonUpdateFormValidationValues;
} & React.CSSProperties>;
export default function TheClientPersonUpdateForm(props: TheClientPersonUpdateFormProps): React.ReactElement;
