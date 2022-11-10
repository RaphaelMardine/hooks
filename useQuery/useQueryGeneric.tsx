import React from 'react'
import { apiUrlHelper } from '../globalUrlExample'
import { UseInfiniteQueryResult } from 'react-query/types/react/types'
import { useInfiniteQuery, UseQueryResult, useQuery } from 'react-query'

export interface ErrorData {
  data: any
  error: Error
}

interface InterfaceResponse {}

export interface ModuleData {
  data: Module
  meta: Meta
}

export interface Module {
  id: number
  attributes: ModuleAttributes
}

export interface ModuleAttributes {
  title: string
  description: string
  index: number
  createdAt: string
  updatedAt: string
  publishedAt: string
  checkout_videos: CheckoutVideos
}

export interface CheckoutVideos {
  data: Video[]
}

export interface Video {
  id: number
  attributes: VideoAttributes
}

export interface VideoAttributes {
  title: string
  description: string
  video_duration: string
  index: number
  createdAt: string
  updatedAt: string
  publishedAt: string
  video: Video
}
export interface Video {
  data: Media
}
export interface Media {
  id: number
  attributes: MediaAttributes
}

export interface MediaAttributes {
  name: string
  alternativeText: string
  caption: string
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  provider: string
  createdAt: string
  updatedAt: string
}

export interface Meta {}

// Abaixo use infinity query para paginação com scroll infinito.

const fetchGeneric = (props: any, conditionRefetch: string) => {
  return fetch(apiUrlHelper(`url/${conditionRefetch}`), {
    headers: { IdToken: '123' }
  }).then(r => {
    if (!r.ok) {
      throw new Error('Sorry. Something went wrong.')
    }
    return r.json()
  })
}

export function useQueryGeneric(
  props: any
): UseInfiniteQueryResult<InterfaceResponse> {
  const conditionRefetch = '123'
  return useInfiniteQuery<any, unknown, any>(
    [`generic`, conditionRefetch],
    async ({ pageParam = 1 }) => {
      return fetchGeneric(props, conditionRefetch)
    },
    {
      getNextPageParam: response => {
        if (response.hasMore) {
          return response.page + 1
        }
        return undefined
      }
    }
  )
}

// como usar ?
//  const {
//   data,
//   isLoading,
//   error,
//   hasNextPage,
//   fetchNextPage,
//   isFetchingNextPage,
// } = useQueryGeneric(props, conditionRefetch)

// Um get normal pode ser mais simples :
// Este é um exemplo de uma requisição para buscar um módulo que armazena todos vídeos de uma seção.
// Após finalizar a requisição, caso ela retorne 200, alteramos o valor de setIdVideo pelo primeiro vídeo do array.
// Este tipo de situação evita useEffect's desnecessários.
// Também possuimos refetchOnWindowsFocus como false para que evite renderização desnecessária ao voltar para a tela.

export function useModuleByIdQuery(
  token: string,
  origin: string,
  idModule: number,
  setIdVideo: React.Dispatch<React.SetStateAction<number | undefined>>
): UseQueryResult<ModuleData, ErrorData> {
  return useQuery<ModuleData, ErrorData>(
    ['modules', idModule],
    () =>
      fetch(apiUrlHelper(`${origin}-modules/${idModule}`), {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` }
      }).then(async r => {
        if (r.ok) return r.json()
      }),
    {
      onSuccess: ({ data }) => {
        setIdVideo(data.attributes.checkout_videos.data[0].id)
      },
      onError: () => {
        setIdVideo(undefined)
      },
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: false
    }
  )
}

// Utilizando :
// const { data: responseCMSbyId } = useModuleByIdQuery(
//   token,
//   origin,
//   idModule,
//   setIdVideo
// )

// Se queremos apenas enviar data, este exemplo abaixo é o mais simples.

export function useModulesQuery(
  token: string,
  origin: string
): UseQueryResult<ModuleData, ErrorData> {
  return useQuery<ModuleData, ErrorData>(
    ['modules'],
    () =>
      fetch(apiUrlHelper(`${origin}-modules`), {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` }
      }).then(async r => {
        if (r.ok) return r.json()
      }),
    {
      onSuccess: data => {
        // console.log(data)
      }
    }
  )
}

// Um exemplo com filtro + debounced

export default function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = React.useState(value)
  React.useEffect(() => {
    const handler: NodeJS.Timeout = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // Cancel the timeout if value changes (also on delay change or unmount)
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}
const [value, setValue] = React.useState('')
const debouncedSearchQuery = useDebounce(value, 600)

export function useVideoBySearchQuery(
  token: string,
  origin: string,
  debouncedSearchQuery: string
): UseQueryResult<ModuleData, ErrorData> {
  return useQuery<ModuleData, ErrorData>(
    ['videos', debouncedSearchQuery],
    () =>
      fetch(apiUrlHelper(`${token}-videos?search=${debouncedSearchQuery}`), {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${origin}`
        }
      }).then(async r => {
        if (r.ok) return r.json()
      }),
    {
      onSuccess: data => {
        // console.log(data)
      }
    }
  )
}
