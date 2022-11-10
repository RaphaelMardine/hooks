import React from 'react'
import { Formik, Field, Form, useField, useFormikContext } from 'formik'
import { useGenericFormik } from './hooks/useGenericFormik'
import TextField from '@mui/material/TextField/TextField'

const formik = useGenericFormik(filter, setState)

export const useForm = () => {
  return (
    <form onSubmit={formik.handleSubmit}>
      <h1>Integração básica</h1>
      <TextField
        style={{ width: 180 }}
        value={formik.values.reservation || ''}
        onChange={e => {
          const value = e.target.value
          formik.setFieldValue('generic', value === '' ? undefined : value)
        }}
        type={'text'}
        label="Generic Code"
        placeholder="Generic Code"
      />
    </form>
  )
}

// Um exemplo abaixo utilizando um mutate + um useFormik

export const FormDialogAdditionals = () => {
  const mutate = useEditOrderMutation(auth, checkout, queryOrders, order)
  const formik = useEditOrderFormik(order, auth, mutate, setDialog)
  return (

  )
}