import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import {
  Box,
  Divider,
  Typography,
  Button
} from '@strapi/design-system'
import { useIntl } from 'react-intl'
import getTrad from '../../utils/getTrad'
import Modal from '../GenerationModal'
import { request, useFetchClient, CheckPermissions } from '@strapi/helper-plugin'
import pluginPkg from '../../../../package.json';
const pluginName = pluginPkg.strapi.name;

const ActionLayout = () => {
  const { formatMessage } = useIntl()
  const [showModal, setShowModal] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const { post } = useFetchClient()

  const getAiFolderId = async () => {
    const response = await request(`/upload/folders?pagination[pageSize]=-1&filters[$and][0][parent][id][$null]=true`, { method: 'GET' })
      .catch(() => {
      })
    if (!_.isEmpty(response)) {
      let aiFolderId = response?.data?.find((i) => i.name === 'ai')?.id
      if (!!aiFolderId) {
        return aiFolderId
      }
      const createFolderResponse = await request(`/upload/folders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: {
          'name': 'ai',
          'parent': null
        },
      }).catch(() => {
      })
      return createFolderResponse.data.id
    }
    return null
  }

  const uploadAsset = async (asset, folderId) => {
    const formData = new FormData()

    formData.append('files', asset.rawFile)

    formData.append(
      'fileInfo',
      JSON.stringify({
        name: asset.name,
        folder: folderId,
      })
    )

    await post(`/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).catch(() => {
    })
  }

  const onAddAssets = async (assets) => {
    const aiFolderId = await getAiFolderId()
    assets.map(asset => uploadAsset(asset, aiFolderId))

    setShowSuccess(true)
  }

  const handleButtonClick = () => {
    setShowModal(true)
  }
  const handleModalClose = () => {
    setShowModal(false)
    setShowSuccess(false)
  }

  return (
    <CheckPermissions permissions={[{action: `plugin::${pluginName}.generate`, subject: null}]}>
      <Box
        background="neutral0"
        borderColor="neutral150"
        hasRadius
        paddingBottom={4}
        paddingLeft={4}
        paddingRight={4}
        paddingTop={6}
        shadow="tableShadow"
      >
        <Typography variant="sigma" textColor="neutral600" id={pluginName}>
          {formatMessage({
            id: getTrad('Plugin.name'),
            defaultMessage: 'AI Image Generation',
          })}
        </Typography>
        <Box paddingTop={2} paddingBottom={6}>
          <Divider/>
        </Box>
        <Box paddingTop={1}>
          <Button fullWidth onClick={handleButtonClick}>
            Generate
          </Button>
        </Box>
        {showModal && (
          <Modal showSuccess={showSuccess} onAddAssets={onAddAssets} onClose={handleModalClose}></Modal>
        )}
      </Box>
    </CheckPermissions>
  )
}

export default ActionLayout
