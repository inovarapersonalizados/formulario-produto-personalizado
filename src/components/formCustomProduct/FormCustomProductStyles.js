import styled from "styled-components";

export const FormContainer = styled.form`
    background-color: #FFF;
    max-width: 800px;
    padding: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: left;
    gap: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    border-radius: 30px;
    margin: 0 auto;
    width: 100%;

    @media screen and (max-width: 900px) {
        padding: 20px;
    }

    @media screen and (max-width: 600px) {
        padding: 15px;
    }
`;

export const FormHeader = styled.header`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: left;
    gap: 10px;
`;

export const Underline = styled.hr`
    width: 85px;
    border: 2px solid #0D5190;
    border-radius: 30px;
`;

export const DataArea = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;

    @media screen and (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

export const InputArea = styled.div`
    display: flex;
    flex-direction: column;
`;

export const ContainerCheckboxArea = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    gap: 5px;
`;

export const CheckboxArea = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
`;

export const CustomArea = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: left;
    gap: 15px;
`;

export const CustomInput = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    font-weight: 600;
`;

export const LabelInputUploadFile = styled.label`
    background-color: #EFEFEF;
    padding: 10px;
    border-radius: 30px;
    border: 2px solid transparent;
    cursor: pointer;
    width: fit-content;
    color: gray;

    &:hover {
        border: 2px solid #0D5190;
    }

`;

export const ImagePreview = styled.img`
    max-width: 100%;
    max-height: 200px;
    margin-top: 10px;
`;

export const CustomObs = styled.textarea`
    border: 2px solid transparent;
    outline: none;
    border-radius: 30px;
    background-color: #EFEFEF;
    height: 100px;
    padding: 20px;
    width: 100%;
    resize: none;

    &:hover {
        border: 2px solid #0D5190;
    }

    &:focus {
        border: 2px solid #0D5190;
    }
`;

export const ButtonsArea = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 5px;
    margin-top: 10px;

    @media screen and (max-width: 768px) {
        flex-direction: column;
    }
`;

export const FormButton = styled.button`
    background-color: ${({$primary}) => ($primary ? 'transparent' : '#0D5190')};
    color: ${({$primary}) => ($primary ? '#0D5190' : 'white')};
    font-weight: 600;
    border: 2px solid #0D5190;
    border-radius: 30px;
    padding: 10px;
    width: 400px;
    cursor: pointer;

    @media screen and (max-width: 768px) {
        width: 100%;
    }
`;
