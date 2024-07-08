import React, { useState } from 'react';
import axios from 'axios';
import { 
  FormContainer, 
  InputArea, 
  DataArea, 
  Underline, 
  FormHeader, 
  Inputs, 
  CheckboxArea, 
  ContainerCheckboxArea, 
  CustomArea, 
  CustomInput, 
  LabelInputUploadFile, 
  ImagePreview, 
  CustomObs, 
  FormButton, 
  ButtonsArea 
} from './FormCustomProductStyles';
import InputMask from 'react-input-mask';

function FormCustomProduct() {

    const [file, setFile] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [formData, setFormData] = useState({
        nomeCompleto: '',
        cpf: '',
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

        const { nomeCompleto, cpf, telefone } = formData;
        if (!nomeCompleto || !cpf || !telefone) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append('nomeCompleto', formData.nomeCompleto);
        formDataToSend.append('cpf', formData.cpf);
        formDataToSend.append('telefone', formData.telefone);
        formDataToSend.append('produto', selectedProduct);
        formDataToSend.append('nomeParaPersonalizar', formData.nomeParaPersonalizar);
        formDataToSend.append('observacoes', formData.observacoes);
        formDataToSend.append('imagem', file);

        try {
            const response = await axios.post('http://localhost:3000/api/send-email', formDataToSend, {
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

    return (
        <div>
            <FormContainer onSubmit={handleSubmit}>
                <FormHeader>
                    <h1>Formulário para personalizar produto</h1>
                    <Underline />
                    <p>Após a compra, você tem até 24 horas para nos enviar seus dados e suas personalizações que vamos entrar em contato com você para confirmar o informado.</p>
                    <p>*Obs: o tempo de entrega está sujeito a alterações devido a aprovação da arte e personalização.</p>
                </FormHeader>
                <h2>Preencha os campos abaixo:</h2>
                <DataArea>
                    <InputArea>
                        <label>Nome completo</label>
                        <Inputs mask="(99) 9 9999-9999" maskChar=" " type="text" id="nomeCompleto" value={formData.nomeCompleto} onChange={handleChange} placeholder='Digite seu nome completo' required />
                    </InputArea>
                    <InputArea>
                        <label>CPF</label>
                        <Inputs type="text" id="cpf" value={formData.cpf} onChange={handleChange} placeholder='___.___.__-__' required />
                    </InputArea>
                    <InputArea>
                        <label>Telefone</label>
                        <Inputs type="text" id="telefone" value={formData.telefone} onChange={handleChange} placeholder='(    ) _ ____-____' required />
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
                            <Inputs type="text" id="nomeParaPersonalizar" value={formData.nomeParaPersonalizar} onChange={handleChange} />
                        </CustomInput>
                        <CustomInput>
                            <LabelInputUploadFile htmlFor='upload'>
                                {file ? 'Clique novamente caso deseje mudar a imagem' : 'Clique aqui para escolher sua imagem para personalizar'}
                                <br />
                                {file && <ImagePreview src={URL.createObjectURL(file)} alt="Sua Imagem" />}
                            </LabelInputUploadFile>
                            <Inputs type="file" id="upload" onChange={handleFileChange} required/>
                        </CustomInput>
                        <CustomInput>
                            <label>Observações</label>
                            <CustomObs cols="30" rows="10" id="observacoes" value={formData.observacoes} onChange={handleChange}></CustomObs>
                        </CustomInput>
                    </CustomArea>
                )}
                <ButtonsArea>
                    <FormButton $primary={true} type="button">Voltar</FormButton>
                    <FormButton type='submit'>Enviar</FormButton>
                </ButtonsArea>
            </FormContainer>
        </div>
    );
}

export default FormCustomProduct;
