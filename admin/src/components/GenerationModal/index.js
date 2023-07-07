import React, { useState } from 'react'
import styled from 'styled-components';
import {
  Alert,
  Typography,
  ModalBody,
  Box,
  ModalHeader,
  ModalLayout,
} from '@strapi/design-system'
const ModalLayoutStyled = styled(ModalLayout)`
  width: 65rem;
`;
import GenerationForm from '../GenerateImageForm'

const Modal = ({ onClose, onAddAssets, showSuccess }) => {

  return (
    <ModalLayoutStyled onClose={onClose} labelledBy="title">
        <ModalHeader>
          <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
            Ai Generate Image
          </Typography>
        </ModalHeader>
        <ModalBody>
          { showSuccess && (
            <Alert onClose={onClose} closeLabel="Close alert" title="Success" variant="success">Now you can find the generated images in the "ai" media library folder</Alert>
          ) }
          { !showSuccess && (
            <GenerationForm onAddAssets={onAddAssets} onClose={onClose}></GenerationForm>
          ) }
        </ModalBody>
    </ModalLayoutStyled>
  )
}

export default Modal
