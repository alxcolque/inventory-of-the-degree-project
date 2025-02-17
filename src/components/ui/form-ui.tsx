import { Input, Checkbox, Textarea, Select, SelectItem} from '@nextui-org/react';

interface IFormField {
    name: string;
    label: string;
    type: 'text' | 'email' | 'number' | 'textarea' | 'checkbox' | 'select' | 'color' | 'password' | 'radio';
    options?: string[];  // Opciones para el campo select, si aplica
    placeholder?: string;
    defaultValue?: any;   // Valor por defecto
}

interface IFormInputProps {
    fields: IFormField[];
    formData: Record<string, any>;
    onChange: (name: string, value: any) => void;
}

export const FormUI: React.FC<IFormInputProps> = ({ fields, formData, onChange }) => {
    return (
        <>
            {fields.map((field) => (
                <div key={field.name} style={{ marginBottom: '15px' }}>
                    {field.type === 'text' || field.type === 'email' || field.type === 'number' || field.type === 'password' || field.type === 'color' ? (
                        <Input
                            label={field.label}
                            type={field.type}
                            value={formData[field.name]}
                            onChange={(e) => onChange(field.name, e.target.value)}
                            placeholder={field.placeholder}
                            fullWidth
                        />
                    ) : field.type === 'textarea' ? (
                        <Textarea
                            label={field.label}
                            value={formData[field.name]}
                            onChange={(e) => onChange(field.name, e.target.value)}
                            placeholder={field.placeholder}
                            fullWidth
                        />
                    ) : field.type === 'checkbox' ? (
                        <Checkbox
                            isSelected={formData[field.name]}
                            onChange={(checked) => onChange(field.name, checked)}
                        >
                            {field.label}
                        </Checkbox>
                    ) : field.type === 'select' && field.options ? (
                        <Select
                            placeholder={field.placeholder}
                            value={formData[field.name]}
                            onChange={(value) => onChange(field.name, value)}
                            fullWidth
                        >
                            {field.options.map((option) => (
                                <SelectItem key={option} value={option}>
                                    {option}
                                </SelectItem>
                            ))}
                        </Select>
                    ) : null}
                </div>
            ))}
        </>
    );
};
