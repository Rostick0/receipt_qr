export const getFormValues = (formData) => {
    const formValues = {};

    formData.forEach((value, key) => {
        formValues[key] = value;
    });

    return formValues;
};
