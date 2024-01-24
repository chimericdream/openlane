import { Controller, type Control } from 'react-hook-form';
import { TextField } from '@mui/material';

export const TextInput = ({
    name,
    control,
    label,
    fieldType = 'text',
}: {
    name: string;
    control: Control<any>;
    label: string;
    fieldType?: 'text' | 'password';
}) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                    helperText={error ? error.message : null}
                    error={!!error}
                    onChange={onChange}
                    value={value}
                    fullWidth
                    label={label}
                    variant="outlined"
                    type={fieldType}
                    sx={{ mb: 2 }}
                />
            )}
        />
    );
};
