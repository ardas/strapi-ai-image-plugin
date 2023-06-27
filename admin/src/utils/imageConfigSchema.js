import * as yup from 'yup'

const shape = {
  height: yup.number().typeError('The value must be a number').integer().required().test(
    'is-multiple-of-64',
    'The number must be a multiple of 64',
    value => value % 64 === 0
  ),
  width: yup.number().typeError('The value must be a number').integer().required().test(
    'is-multiple-of-64',
    'The number must be a multiple of 64',
    value => value % 64 === 0
  ),
  cfgScale: yup.number().typeError('The value must be a number').integer().min(0).max(35).required(),
  samples: yup.number().typeError('The value must be a number').integer().min(1).max(4).required(),
}

const generationSchema = yup.object().shape({...shape, prompt: yup.string().required()})
const configSchema = yup.object().shape({...shape, apiKey:  yup.string().required().min(1, 'Api key should be not empty')})
export {
  generationSchema,
  configSchema
}
