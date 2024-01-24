import { Controller, type Control } from 'react-hook-form';
import {
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
} from '@mui/material';

export const SelectInput = ({
    name,
    control,
    label,
    options,
    fieldType = 'text',
}: {
    name: string;
    control: Control<any>;
    label: string;
    fieldType?: 'text' | 'password';
    options: string[];
}) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel id={`${name}-label`}>{label}</InputLabel>
                    <Select
                        labelId={`${name}-label`}
                        error={!!error}
                        onChange={onChange}
                        value={value}
                        fullWidth
                        label={label}
                        variant="outlined"
                        type={fieldType}
                    >
                        {options.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                    {error && (
                        <FormHelperText error={!!error}>
                            {error.message}
                        </FormHelperText>
                    )}
                </FormControl>
            )}
        />
    );
};
