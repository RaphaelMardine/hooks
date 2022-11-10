import {
  QueryObserverResult,
  RefetchOptions,
  UseMutationResult
} from 'react-query'

export interface IAuttarIntegration {
  id?: number | null
  generalData?: GeneralData
  gateway?: string
  responsibleData?: ResponsibleData
  address?: Address
  externalKey?: ExternalKey
  acquirerData?: AcquirerData
}

export interface GeneralData {
  taxPayerId: string
  legalName: string
  businessName: string
}

export interface ResponsibleData {
  name: string
  taxPayerId: string
  email: string
  phone: string
}

export interface Address {
  postalCode: string
  state: string
  city: string
  street: string
  neighborhood: string
  number: string
  complement: string
}

export interface ExternalKey {
  companyChainKey: string
  companyKey: string | null
  domain: string
}

export interface AcquirerData {
  provider?: string
  tefNumber?: string
  ecNumber?: string
  user?: string
  key?: string
  password?: string
}

export interface IAuttarIntegrationError {
  timestamp: Date
  status: number
  error: string
  message: string
  path: string
}

export interface IAuttarIntegrationForm {
  basicIntegration: IAuttarIntegration | undefined
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  refetch: (
    variables?: Partial<any> | undefined
  ) => Promise<UseMutationResult<any>>
  refetchBasicIntegration: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<IAuttarIntegration>>
  setErrorDialog: any
  errorDialog: any
}
