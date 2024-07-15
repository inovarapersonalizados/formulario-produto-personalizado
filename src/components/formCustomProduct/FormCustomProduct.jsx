import React, { useState } from 'react';
import axios from 'axios';
import {
    FormContainer,
    InputArea,
    DataArea,
    Underline,
    FormHeader,
    CheckboxArea,
    ContainerCheckboxArea,
    CustomArea,
    CustomInput,
    LabelInputUploadFile,
    ImagePreview,
    CustomObs,
    FormButton,
    ButtonsArea,
    FormFooter
} from './FormCustomProductStyles';
import ImgLogoInovara from '../../assets/images/logoInovara.png';
import styles from '../formCustomProduct/FormCustomProduct.module.css';
import InputMask from 'react-input-mask';

function FormCustomProduct() {
    const [file, setFile] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [formData, setFormData] = useState({
        nomeCompleto: '',
        cpf: '',
        email: '',
        telefone: '',
        nomeParaPersonalizar: '',
        observacoes: ''
    });

    const handleCheckboxChange = (product) => {
        setSelectedProduct(selectedProduct === product ? null : product);
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedProduct) {
            alert('Por favor, selecione um produto.');
            return;
        }

        const { nomeCompleto, cpf, email, telefone } = formData;
        if (!nomeCompleto || !cpf || !email || !telefone) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append('nomeCompleto', formData.nomeCompleto);
        formDataToSend.append('cpf', formData.cpf);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('telefone', formData.telefone);
        formDataToSend.append('produto', selectedProduct);
        formDataToSend.append('nomeParaPersonalizar', formData.nomeParaPersonalizar);
        formDataToSend.append('observacoes', formData.observacoes);
        formDataToSend.append('imagem', file);

        try {
            const response = await axios.post(import.meta.env.VITE_BASE_URL_API, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 200) {
                console.log('E-mail enviado com sucesso!');
                alert('E-mail enviado com sucesso!');
                setFormData({
                    nomeCompleto: '',
                    cpf: '',
                    email: '',
                    telefone: '',
                    nomeParaPersonalizar: '',
                    observacoes: ''
                });
                setSelectedProduct(null);
                setFile(null);
            } else {
                console.error('Erro ao enviar e-mail:', response.statusText);
                alert('Erro ao enviar e-mail. Por favor, tente novamente.');
            }
        } catch (error) {
            console.error('Erro ao enviar e-mail:', error);
            alert('Erro ao enviar e-mail. Por favor, tente novamente.');
        }
    };

    const getDate = () => {
        const date = new Date();
        return `${date.getFullYear()} Inovara Personalizados. Todos os direitos reservados.`;
    };

    return (
        <div>
            <FormContainer onSubmit={handleSubmit}>
                <FormHeader>
                    <img src={ImgLogoInovara} alt="Logo Inovara" />
                    <h1>Personalizar produto</h1>
                    <Underline />
                    <p>Após a compra, você tem até 24 horas para nos enviar seus dados e suas personalizações que vamos entrar em contato com você para confirmar o informado.</p>
                    <p>*Obs: o tempo de entrega está sujeito a alterações devido a aprovação da arte e personalização.</p>
                </FormHeader>
                <h2>Preencha os campos abaixo:</h2>
                <DataArea>
                    <InputArea>
                        <label>Nome completo</label>
                        <InputMask className={styles.inputStyle} type="text" id="nomeCompleto" value={formData.nomeCompleto} onChange={handleChange} placeholder='Digite seu nome completo' required />
                    </InputArea>
                    <InputArea>
                        <label>CPF</label>
                        <InputMask mask="999.999.999-99" className={styles.inputStyle} type="text" id="cpf" value={formData.cpf} onChange={handleChange} placeholder='___.___.___.__' required />
                    </InputArea>
                    <InputArea>
                        <label>Email</label>
                        <input className={styles.inputStyle} type='email' id="email" value={formData.email} onChange={handleChange} placeholder='Digite seu email' />
                    </InputArea>
                    <InputArea>
                        <label>Telefone</label>
                        <InputMask mask="(99) 9 9999-9999" className={styles.inputStyle} type="text" id="telefone" value={formData.telefone} onChange={handleChange} placeholder='(    ) _ ____-____' required />
                    </InputArea>
                </DataArea>
                <ContainerCheckboxArea>
                    <h2>Qual produto você comprou?</h2>
                    <div>
                        <CheckboxArea>
                            <label>Caneca</label>
                            <input
                                type="checkbox"
                                checked={selectedProduct === 'caneca'}
                                onChange={() => handleCheckboxChange('caneca')}
                                disabled={selectedProduct !== null && selectedProduct !== 'caneca'}
                            />
                        </CheckboxArea>
                        <CheckboxArea>
                            <label>Agenda</label>
                            <input
                                type="checkbox"
                                checked={selectedProduct === 'agenda'}
                                onChange={() => handleCheckboxChange('agenda')}
                                disabled={selectedProduct !== null && selectedProduct !== 'agenda'}
                            />
                        </CheckboxArea>
                        <CheckboxArea>
                            <label>Caderno</label>
                            <input
                                type="checkbox"
                                checked={selectedProduct === 'caderno'}
                                onChange={() => handleCheckboxChange('caderno')}
                                disabled={selectedProduct !== null && selectedProduct !== 'caderno'}
                            />
                        </CheckboxArea>
                    </div>
                </ContainerCheckboxArea>
                {selectedProduct && (
                    <CustomArea>
                        <CustomInput>
                            <label>Digite seu nome para personalizar</label>
                            <input type="text" className={styles.inputStyle} id="nomeParaPersonalizar" value={formData.nomeParaPersonalizar} onChange={handleChange} />
                        </CustomInput>
                        <CustomInput>
                            <LabelInputUploadFile htmlFor='upload'>
                                {file ? 'Clique novamente caso deseje mudar a imagem' : 'Clique aqui para escolher sua imagem para personalizar'}
                                <br />
                                {file && <ImagePreview src={URL.createObjectURL(file)} alt="Sua Imagem" />}
                            </LabelInputUploadFile>
                            <input type="file" className={styles.upload} id="upload" onChange={handleFileChange} required />
                        </CustomInput>
                        <CustomInput>
                            <label>Observações</label>
                            <CustomObs cols="30" rows="10" id="observacoes" value={formData.observacoes} onChange={handleChange}></CustomObs>
                        </CustomInput>
                    </CustomArea>
                )}
                <ButtonsArea>
                    <FormButton onClick={() => {
                        window.location = 'https://inovarapersonalizados.com/'
                    }} $primary={true} type="button">Voltar</FormButton>
                    <FormButton type='submit'>Enviar</FormButton>
                </ButtonsArea>
            </FormContainer>
            <FormFooter>
                <p>&copy; {getDate()}</p>
            </FormFooter>

        </div>
    );
}

export default FormCustomProduct;