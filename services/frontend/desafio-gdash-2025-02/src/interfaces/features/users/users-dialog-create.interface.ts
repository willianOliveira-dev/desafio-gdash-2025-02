import type {
    FormAsyncValidateOrFn,
    FormValidateOrFn,
    ReactFormExtendedApi,
} from '@tanstack/react-form';
import type { Dispatch, SetStateAction } from 'react';
import type { UserFormSchemaType } from '@/http/schemas/user-create.schema';

export type UserFormValues = ReactFormExtendedApi<
    UserFormSchemaType,
    FormValidateOrFn<UserFormSchemaType>,
    FormValidateOrFn<UserFormSchemaType>,
    FormAsyncValidateOrFn<UserFormSchemaType>,
    FormValidateOrFn<UserFormSchemaType>,
    FormAsyncValidateOrFn<UserFormSchemaType>,
    FormValidateOrFn<UserFormSchemaType>,
    FormAsyncValidateOrFn<UserFormSchemaType>,
    FormValidateOrFn<UserFormSchemaType>,
    FormAsyncValidateOrFn<UserFormSchemaType>,
    FormAsyncValidateOrFn<UserFormSchemaType>,
    unknown
>;

export interface UsersDialogCreateProps {
    file: File | null;
    form: UserFormValues;
    setFile: Dispatch<SetStateAction<File | null>>;
    isLoading: boolean;
}
