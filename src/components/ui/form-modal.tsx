import { useState, useEffect } from 'react';
import { Modal, Button, ModalHeader, ModalBody, ModalFooter, ModalContent } from '@nextui-org/react';
import { FaSave } from 'react-icons/fa';
import { FormUI } from './form-ui';

interface IFormField {
    name: string;
    label: string;
    type: 'text' | 'email' | 'number' | 'textarea' | 'checkbox' | 'select' | 'color' | 'password' | 'radio';
    options?: string[];  // Opciones para el campo select, si aplica
    placeholder?: string;
    defaultValue?: any;   // Valor por defecto
}

interface IReusableModalFormProps {
    fields: IFormField[] | any;
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: Record<string, any>) => void;
    initialValues?: Record<string, any>;  // Valores iniciales para edición
}

export const FormModal = ({ fields, isOpen, onClose, onSubmit, initialValues = {} }: IReusableModalFormProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState<Record<string, any>>(
        fields.reduce((acc: any, field: any) => {
            acc[field.name] = initialValues[field.name] || field.defaultValue || '';  // Inicializamos con valores iniciales o vacíos
            return acc;
        }, {} as Record<string, any>)
    );

    // Actualizar el estado si los valores iniciales cambian (para edición)
    useEffect(() => {
        setFormData(fields.reduce((acc: any, field: any) => {
            acc[field.name] = initialValues[field.name] || field.defaultValue || '';  // Actualizar con nuevos valores
            return acc;
        }, {} as Record<string, any>));
    }, [initialValues, fields]);

    // Manejador de cambios para todos los inputs
    const handleChange = (name: string, value: any) => {
        setFormData({ ...formData, [name]: value });
    };

    // Manejador del envío del formulario
    const handleSubmit = async () => {
        setIsLoading(true);
        initialValues.id ? formData['id'] = initialValues.id : null;
        await onSubmit(formData);  // Simulando una operación asíncrona
        setIsLoading(false);
        onClose();  // Cerrar el modal
    };

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalContent>
                    <ModalHeader>{initialValues?.name ? 'Editar' : 'Nuevo'}</ModalHeader>
                    <ModalBody>
                        {/* Componente de inputs reutilizable */}
                        <FormUI fields={fields} formData={formData} onChange={handleChange} />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onPress={onClose}>
                            Cancelar
                        </Button>
                        <Button onClick={handleSubmit} isLoading={isLoading} color="primary" variant="bordered">
                            <FaSave size={18} />
                            {initialValues?.name ? 'Actualizar' : 'Crear'}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};
