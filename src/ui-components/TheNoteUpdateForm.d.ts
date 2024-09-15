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
export declare type TheNoteUpdateFormInputValues = {
    note?: string;
    clientID?: string;
    staffID?: string;
};
export declare type TheNoteUpdateFormValidationValues = {
    note?: ValidationFunction<string>;
    clientID?: ValidationFunction<string>;
    staffID?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TheNoteUpdateFormOverridesProps = {
    TheNoteUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    note?: PrimitiveOverrideProps<TextFieldProps>;
    clientID?: PrimitiveOverrideProps<TextFieldProps>;
    staffID?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type TheNoteUpdateFormProps = React.PropsWithChildren<{
    overrides?: TheNoteUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    theNote?: any;
    onSubmit?: (fields: TheNoteUpdateFormInputValues) => TheNoteUpdateFormInputValues;
    onSuccess?: (fields: TheNoteUpdateFormInputValues) => void;
    onError?: (fields: TheNoteUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TheNoteUpdateFormInputValues) => TheNoteUpdateFormInputValues;
    onValidate?: TheNoteUpdateFormValidationValues;
} & React.CSSProperties>;
export default function TheNoteUpdateForm(props: TheNoteUpdateFormProps): React.ReactElement;
