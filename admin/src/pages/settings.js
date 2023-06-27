import React, { useState } from 'react'
import { useIntl } from 'react-intl'
import { ContentLayout, HeaderLayout } from '@strapi/design-system/Layout'
import { Button } from '@strapi/design-system/Button'
import { Alert } from '@strapi/design-system'
import ImageForm from '../components/Settings/ImageForm'
// import PropTypes from 'prop-types';
import pluginId from '../pluginId'

const ConfigPage = () => {
  const [state, setState] = useState({ submitted: false })

  const { formatMessage } = useIntl()
  return (
    <div>
      <HeaderLayout
        title={formatMessage({ id: 'ai.settings.imageGenTitle', defaultMessage: 'Image Generation Settings' })}
        subtitle={formatMessage({
          id: 'ai.settings.subTitle',
          defaultMessage: 'Configure AI image generation.'
        })}
        as="h2"
      />
      <ContentLayout>
        {state.submitted ? (
          <Alert style={{ marginBottom: 16 }} closeLabel="Close" title="Success">{formatMessage({
            id: 'ai.settings.saveSuccess',
            defaultMessage: 'Settings saved.'
          })}</Alert>
        ) : null}
        <ImageForm onSubmit={() => {setState({ submitted: true })}}></ImageForm>
      </ContentLayout>
    </div>
  )
}

export default ConfigPage
