import * as Yup from 'yup';

export type FormProps = {
    name: string;
    tags: string;
    file: string|Blob;
}

export const formScheme: FormProps = {name: '', tags:'',file:''}


export const formValidationSchema = Yup.object().shape({
    name: Yup.string().trim()
            .required("Nome é obrigatório")
            .max(50, 'Campo nome só pode ter 50 caracteres'),
    tags: Yup.string().trim()
            .required("Tags é obrigatório")
            .max(50, 'Campo nome só pode ter 50 caracteres'),
    file: Yup.mixed<Blob>()
            .required("Selecione uma image para fazer o upload")
            .test('size',"Imagem não pode ser maior de 4MB", (file)=> {
                return file.size < 4000000
            })
            .test('type', "Formatos aceitos: jpef, giff or png", (file)=>{
                return file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif';
            })
})