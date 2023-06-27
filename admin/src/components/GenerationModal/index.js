import React, { useState } from 'react'
import {
  Alert,
  Typography,
  ModalBody,
  ModalHeader,
  ModalLayout,
} from '@strapi/design-system'
import GenerationForm from '../GenerateImageForm'

const Modal = ({ onClose, onAddAssets, showSuccess }) => {

  return (
    <ModalLayout onClose={onClose} labelledBy="title">
      <ModalHeader>
        <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
          Ai Generate Image
        </Typography>
      </ModalHeader>
      <ModalBody>
        { showSuccess && (
          <Alert closeLabel="Close alert" title="Success" variant="success">Now you can find the generated images in the "ai" media library folder</Alert>
        ) }
        { !showSuccess && (
          <GenerationForm onAddAssets={onAddAssets} onClose={onClose}></GenerationForm>
        ) }
      </ModalBody>
    </ModalLayout>
  )
}

export default Modal
