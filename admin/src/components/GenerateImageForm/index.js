import React, { useState, useEffect } from 'react';
import { Link } from '@strapi/design-system/v2';
import PropTypes from 'prop-types';
import pluginPkg from '../../../../package.json';
import {
  Box,
  ModalFooter,
  GridLayout,
  TextInput,
  Textarea,
  Tooltip,
  ContentLayout,
  Badge ,
  Select,
  Option,
  Typography,
  IconButton,
  CardAction,
  CardHeader,
  CardCheckbox,
  ModalLayout,
  ModalHeader,
  ModalBody,
  CardAsset,
  Alert,
  Card,
  Button } from '@strapi/design-system';
import { Information, Eye } from '@strapi/icons';
import { request, Form } from '@strapi/helper-plugin'
import { useIntl } from 'react-intl';
import { Formik } from 'formik';
import { generationSchema as validationSchema } from '../../utils/imageConfigSchema'
import { base64ImagesToBlobs, blobsToAssets } from '../../utils/blob'
import getTrad from '@strapi/plugin-upload/admin/src/utils/getTrad';
const pluginName = pluginPkg.strapi.name;

const UploadForm = ({ onClose, onAddAssets }) => {
  const [checkedImages, setCheckedImages] = useState([])
  const [previewImage, setPreviewImage] = useState(false)
  const [error, setError] = useState(false)
  const [balance, setBalance] = useState(0)
  const [generated, setGenerated] = useState([])
  const [loading, setLoading] = useState(false);
  const { formatMessage } = useIntl();
  const [formData, setFormData] = useState({
    height: 512,
    width: 512,
    cfgScale: 7,
    samples: 4,
    style: null
  });

  const updateBalance = () => {
    request(`/${pluginName}/image/balance`, { method: 'GET' })
      .then((res) => {
        if(!_.isEmpty(res)) {
          setBalance(res.balance)
        }
      })
      .catch(() => {
        setError(<>Can't get balance, please check your API key in <Link isExternal={false} href={`/admin/settings/${pluginName}/image-generation`}>config section</Link></>)
      })
  }

  useEffect(() => {
    updateBalance()
    request(`/${pluginName}/config/image`, { method: 'GET' })
      .then((res) => {
        if(!_.isEmpty(res)) {
          setFormData({
            height: res.height,
            width: res.width,
            cfgScale: res.cfgScale,
            samples: res.samples,
            style: res.style,
          })
        }
      })
      .catch(() => {
      })
  }, []);

  const handleImageCheck = (value) => {
    const index = checkedImages.indexOf(value);
    const newData = [...checkedImages]
    if (index > -1) {
      newData.splice(index, 1)
    } else {
      newData.push(value)
    }
    setCheckedImages(newData)
  }

  const handleSaveImages = () => {
    onAddAssets(blobsToAssets(checkedImages))
  }


  const handleSubmit = async (data) => {
    setLoading(true)
    setError(false)

    request(`/${pluginName}/image/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: data,
    })
      .then((res) => {
        setGenerated(base64ImagesToBlobs(res.images, "image/png"))
        updateBalance()
        setLoading(false)
      })
      .catch((e) => {
        setError(e?.response?.payload?.error ?? 'Unknown error')
        setLoading(false)
      })
  };

  return (
    <>
      { error && (
        <ContentLayout>
          <Box padding={3}>
            <Alert title="Error!" variant="danger">{ error }</Alert>
          </Box>
        </ContentLayout>
      ) }
        { !error && !generated.length && (
          <>
            <Box padding={3} background="neutral200">
              <Typography fontWeight="bold" textColor="neutral800" as="h2">
                Configure parameters and generate a picture
              </Typography>
            </Box>
            <Formik
              enableReinitialize
              initialValues={formData}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
              validateOnChange={false}
            >
              {({ values, errors, handleChange }) => (
                <Form noValidate>
                  <Box padding={1}>
                    <Badge>Credits: { balance }</Badge>
                  </Box>
                  <Box padding={2}>
                    <GridLayout>
                      <Box padding={2} hasRadius shadow="tableShadow">
                        <TextInput required
                          name="height"
                          label="Height"
                          placeholder="Height"
                          value={values.height}
                          error={errors.height}
                          onChange={handleChange}
                        />
                      </Box>
                      <Box padding={2} hasRadius shadow="tableShadow">
                        <TextInput required
                          name="width"
                          label="Width"
                          placeholder="Width"
                          error={errors.width}
                          value={values.width}
                          onChange={handleChange}
                        />
                      </Box>
                      <Box padding={2} hasRadius shadow="tableShadow">
                        <TextInput required placeholder="Guidance Scale"
                                   label="Guidance Scale"
                                   name="cfgScale"
                                   onChange={handleChange}
                                   error={errors.cfgScale}
                                   value={values.cfgScale} labelAction={
                          <Tooltip description="How strictly the diffusion process adheres to the prompt text (higher values keep your image closer to your prompt)">
                            <Information aria-hidden />
                          </Tooltip>} />
                      </Box>
                      <Box padding={2} hasRadius shadow="tableShadow">
                        <TextInput required placeholder="Samples" label="Samples" name="samples" onChange={handleChange} value={values.samples} error={errors.samples} labelAction={
                          <Tooltip description="Number of images to generate. Maximum of four (4)">
                            <Information aria-hidden />
                          </Tooltip>} />
                      </Box>
                      <Box padding={2} hasRadius shadow="tableShadow">
                        <Select label="Style" id={"style"} value={values.style} onChange={(value) => {
                          handleChange({
                            target: { name: 'style', value },
                          });
                        }} placeholder="Style">
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
                    </GridLayout>
                    <Box padding={2} hasRadius shadow="tableShadow">
                      <Textarea onChange={handleChange} hint="Separate tokens by comma" label={"Prompt"} id={"prompt"} name="prompt" error={errors.prompt}>{values.prompt}</Textarea>
                    </Box>
                  </Box>

                  <ModalFooter
                    startActions={
                      <Button onClick={onClose} variant="tertiary">
                        {formatMessage({ id: 'app.components.Button.cancel', defaultMessage: 'cancel' })}
                      </Button>
                    }
                    endActions={
                      <Button type="submit" loading={loading}>
                        {formatMessage({
                          id: getTrad('button.generate'),
                          defaultMessage: 'Generate',
                        })}
                      </Button>
                    }
                  />
                </Form>
              )}
            </Formik>
          </>
        )}
        { generated.length > 0 && (
          <>
            <Box padding={6} background="neutral200">
              <Typography fontWeight="bold" textColor="neutral800" as="h2">
                Select interested images
              </Typography>
            </Box>
            <GridLayout>
            { generated.map((i, num) => <Box padding={2} id={num} hasRadius shadow="tableShadow">
                <Card style={{
                width: '240px'
              }}>
                  <CardHeader>
                    <CardCheckbox onValueChange={ () => handleImageCheck(i)} value={checkedImages.indexOf(i) !== -1} />
                    <CardAction position="end">
                      <IconButton onClick={()=> {setPreviewImage(i)}} icon={<Eye />} />
                    </CardAction>
                    <CardAsset src={URL.createObjectURL(i)} />
                  </CardHeader>
                </Card>
              </Box>)}
            </GridLayout>
            <ModalFooter
              endActions={
                <>
                  <Button type="button" onClick={() => setGenerated([])} loading={loading}>
                    {formatMessage({
                      id: getTrad('button.regenerate'),
                      defaultMessage: 'Regenerate',
                    })}
                  </Button>
                  <Button disabled={checkedImages.length === 0} type="button" onClick={handleSaveImages} loading={loading}>
                    {formatMessage({
                      id: getTrad('button.generate'),
                      defaultMessage: 'Save selected',
                    })}
                  </Button>
                </>
              }
            />
            {!!previewImage && <ModalLayout onClose={() => setPreviewImage(null)} labelledBy="title">
              <ModalHeader>
                <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
                  Preview
                </Typography>
              </ModalHeader>
              <ModalBody>
                <div style={{"text-align": "center"}}>
                  <img src={URL.createObjectURL(previewImage)} />
                </div>
              </ModalBody>
            </ModalLayout>}
          </>
        ) }
    </>
  );
};

UploadForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  onAddAssets: PropTypes.func.isRequired
};

export default UploadForm
