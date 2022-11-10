import { useMutation, UseMutationResult } from 'react-query'
import { apiUrlHelper } from '../globalUrlExample'
import { saveAs } from 'file-saver'
import {
  IAuttarIntegration,
  IAuttarIntegrationError,
  IAuttarIntegrationForm
} from './types/IAuttarIntegration'

// Exemplo de uso de useMutation para publicar arquivos.

export const downloadDocument = (
  prefix: 'nf' | 'slip' | 'confirmation' | string,
  app: any
): UseMutationResult<Blob, any, any> => {
  let filename = ''
  return useMutation<Blob, any, any>(
    'uploadDocument',
    ({ order }) =>
      fetch(apiUrlHelper(`file/${prefix}/${order.id}`), {
        headers: { IdToken: '123' }
      }).then(response => {
        if (response.ok) {
          const str = response.headers.get('content-disposition') || ''
          filename = str
          return response.blob()
        } else {
          throw new Error('O download do arquivo falhou inesperadamente.')
        }
      }),
    {
      onSuccess: data => saveAs(data, filename),
      onError: error => {
        app.openDialog({
          title: 'Erro Inesperado',
          msg: error.message,
          submitlabel: 'OK'
        })
      }
    }
  )
}

// Uma outra requisição, no entanto para envio de formulário, também verifica se o formulário já foi enviado, e se já foi, apenas altera.

export function useAuttarIntegrationMutation({
  basicIntegration,
  setOpen,
  refetch,
  refetchBasicIntegration,
  setErrorDialog,
  errorDialog
}: IAuttarIntegrationForm): UseMutationResult<
  IAuttarIntegration,
  IAuttarIntegrationError,
  unknown
> {
  const id = '123'
  return useMutation<IAuttarIntegration, IAuttarIntegrationError, unknown>(
    'auttarIntegration',
    async values => {
      return fetch(
        apiUrlHelper(
          `v1/integration/basic${
            basicIntegration !== undefined ? `/${basicIntegration?.id}` : ``
          }`
        ),
        {
          method: basicIntegration !== undefined ? 'PUT' : 'POST',
          body: JSON.stringify(values),
          headers: {
            idToken: '123',
            'Content-Type': 'application/json'
          }
        }
      ).then(async response => {
        if (response.ok) {
          return response.json()
        }
        throw await response.json()
      })
    },
    {
      onError: e => {
        setOpen(false)
        setErrorDialog({
          ...errorDialog,
          open: true,
          code: e.status,
          msg: e.message != '' ? e.message : e.error
        })
      },
      onSuccess: () => {
        setOpen(false)
        refetch()
        refetchBasicIntegration()
      }
    }
  )
}
