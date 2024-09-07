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
export declare type ThePostUpdateFormInputValues = {
    note?: string;
    date?: string;
    clientID?: string;
};
export declare type ThePostUpdateFormValidationValues = {
    note?: ValidationFunction<string>;
    date?: ValidationFunction<string>;
    clientID?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ThePostUpdateFormOverridesProps = {
    ThePostUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    note?: PrimitiveOverrideProps<TextFieldProps>;
    date?: PrimitiveOverrideProps<TextFieldProps>;
    clientID?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ThePostUpdateFormProps = React.PropsWithChildren<{
    overrides?: ThePostUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    thePost?: any;
    onSubmit?: (fields: ThePostUpdateFormInputValues) => ThePostUpdateFormInputValues;
    onSuccess?: (fields: ThePostUpdateFormInputValues) => void;
    onError?: (fields: ThePostUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ThePostUpdateFormInputValues) => ThePostUpdateFormInputValues;
    onValidate?: ThePostUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ThePostUpdateForm(props: ThePostUpdateFormProps): React.ReactElement;
