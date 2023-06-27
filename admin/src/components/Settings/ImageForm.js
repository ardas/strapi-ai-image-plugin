import React, { useState, useEffect } from 'react';
import {
  Button,
  TextInput,
  NumberInput,
  Tooltip,
  Box,
  ModalFooter,
  Select,
  Option,
} from '@strapi/design-system'
import _ from 'lodash'
import { useIntl } from 'react-intl';
import { Information } from '@strapi/icons';
import { Formik } from 'formik';
import { request, Form } from '@strapi/helper-plugin'
import { configSchema as validationSchema } from '../../utils/imageConfigSchema'
import getTrad from '@strapi/plugin-upload/admin/src/utils/getTrad';

const ImageForm = ({ onSubmit }) => {
  const { formatMessage } = useIntl();
  const [formData, setFormData] = useState({
    apiKey: '',
    height: 512,
    width: 512,
    cfgScale: 7,
    samples: 4,
    style: null
  });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    request(`/ai/config/image`, { method: 'GET' })
      .then((res) => {
        if(!_.isEmpty(res)) {
          setFormData(res)
        }
      })
      .catch(() => {
      })
  }, []);

  const handleSubmit = (data) => {
    setLoading(true)
    request(`/ai/config/image`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: data,
    })
      .then((res) => {
        setLoading(false)
        onSubmit({submitted: true})
      })
      .catch(() => {
        setLoading(false)
      })
  }

  return (
    <Formik
      enableReinitialize
      initialValues={formData}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      validateOnChange={false}
    >
      {({ values, errors, handleChange }) => (
        <Form noValidate>
          <Box padding={2}>
            <TextInput required placeholder="Your API key" label="API Key" name="apiKey"
                       onChange={handleChange}
                       error={errors.apiKey}
                       value={values.apiKey} labelAction={
              <Tooltip description="Your API key of stability.ai service">
                <Information aria-hidden />
            </Tooltip>} />
          </Box>
          <Box padding={2}>
          <TextInput required
            name="height"
            label="Default Height"
            placeholder="Default Height"
            value={values.height}
            error={errors.height}
            onChange={handleChange}
          />
          </Box>
          <Box padding={2}>
          <TextInput required
            name="width"
            label="Default Width"
            placeholder="Default Width"
            value={values.width}
            error={errors.width}
            onChange={handleChange}
          />
          </Box>
          <Box padding={2}>
          <TextInput required placeholder="Guidance Scale"
                     label="Default Guidance Scale"
                     name="cfgScale"
                     onChange={handleChange}
                     error={errors.cfgScale}
                     value={values.cfgScale} labelAction={
            <Tooltip description="How strictly the diffusion process adheres to the prompt text (higher values keep your image closer to your prompt)">
              <Information aria-hidden />
            </Tooltip>} />
          </Box>
          <Box padding={2}>
          <TextInput required placeholder="Default Samples" label="Default Samples" name="samples"
                     value={values.samples}
                     onChange={handleChange}
                     error={errors.samples}
                     labelAction={
            <Tooltip description="Number of images to generate. Maximum of four (4)">
              <Information aria-hidden />
            </Tooltip>} />
          </Box>
          <Box padding={2}>
            <Select label="Default Style" id={"Default Style"} value={values.style} onChange={(value) => {
              handleChange({
                target: { name: 'style', value },
              })
            }} placeholder="Default Style">
              <Option value="">NONE</Option>
              <Option value="3d-model">3D Model</Option>
              <Option value="analog-film">Analog Film</Option>
              <Option value="anime">Anime</Option>
              <Option value="cinematic">Cinematic</Option>
              <Option value="comic-book">Comic Book</Option>
              <Option value="digital-art">Digital Art</Option>
              <Option value="enhance">Enhance</Option>
              <Option value="fantasy-art">Fantasy Art</Option>
              <Option value="isometric">Isometric</Option>
              <Option value="line-art">Line Art</Option>
              <Option value="low-poly">Low Poly</Option>
              <Option value="modeling-compound">Modeling Compound</Option>
              <Option value="neon-punk">Neon Punk</Option>
              <Option value="origami">Origami</Option>
              <Option value="photographic">Photographic</Option>
              <Option value="pixel-art">Pixel Art</Option>
              <Option value="tile-texture">Tile Texture</Option>
            </Select>
          </Box>
          <Box padding={2}>
            <Button type="submit" loading={loading}>
              {formatMessage({
                id: getTrad('button.save'),
                defaultMessage: 'Save',
              })}
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default ImageForm;
