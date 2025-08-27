import { useState, useCallback } from 'react';
import { NFTFormData, NFTFormErrors } from '../types/nft';

export function useNFTForm() {
    const [formData, setFormData] = useState<NFTFormData>({
        name: '',
        symbol: '',
        image: null,
    });

    const [errors, setErrors] = useState<NFTFormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = useCallback((): boolean => {
        const newErrors: NFTFormErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'NFT name is required';
        } else if (formData.name.length > 50) {
            newErrors.name = 'Name must be less than 50 characters';
        }

        if (!formData.symbol.trim()) {
            newErrors.symbol = 'Symbol is required';
        } else if (formData.symbol.length > 10) {
            newErrors.symbol = 'Symbol must be less than 10 characters';
        } else if (!/^[A-Za-z]+$/.test(formData.symbol)) {
            newErrors.symbol = 'Symbol must contain only letters';
        }

        if (!formData.image) {
            newErrors.image = 'Image is required';
        } else if (formData.image.size > 10 * 1024 * 1024) {
            newErrors.image = 'Image must be less than 10MB';
        } else if (!formData.image.type.startsWith('image/')) {
            newErrors.image = 'File must be an image';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [formData]);

    const handleInputChange = useCallback((field: keyof NFTFormData, value: string | File) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));

        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: undefined
            }));
        }
    }, [errors]);

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (!validateForm()) {
            setIsSubmitting(false);
            return;
        }

        try {
            // deployment logic
            console.log('Submitting form:', formData);
            // await deployNFT(formData);

        } catch (error) {
            console.error('Form submission error:', error);
        } finally {
            setIsSubmitting(false);
        }
    }, [formData, validateForm]);

    const resetForm = useCallback(() => {
        setFormData({ name: '', symbol: '', image: null });
        setErrors({});
    }, []);

    return {
        formData,
        errors,
        isSubmitting,
        handleInputChange,
        handleSubmit,
        resetForm,
        validateForm,
    };
}
