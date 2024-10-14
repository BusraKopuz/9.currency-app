import * as yup from 'yup';

export const schemas = yup.object().shape({
    amount: yup.number().positive("Miktar pozitif olmalıdır.").required("Bir miktar giriniz."),
    fromCurrency: yup.string().required('Döviz seçimi zorunludur'),
    toCurrency: yup.string().required('Döviz seçimi zorunludur')
})