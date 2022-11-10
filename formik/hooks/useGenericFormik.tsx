import { FormikProps, useFormik } from 'formik'
import { Dispatch, SetStateAction } from 'react'
import * as Yup from 'yup'
import { IAuttarIntegration } from '../../useQuery/types/IAuttarIntegration'
type Moment = import('moment').Moment

export interface FinanceFilters {
  advanced?: string | null
  codReserva?: string | null
  dateEnd?: Moment | string | null | undefined
  dateRange?: Moment | string | null | undefined
  dateStart?: Moment | string | null | undefined
  dateType?: string | null
  guestName?: string | null
  reservation?: string | null
}

export interface PaginatedTableState<T, F> {
  orderBy: keyof T | 'action'
  filters: F
  page: number
  rowsPerPage: number
  selected: (keyof T)[]
  order: number
  columns: boolean
  detail: boolean
  formDialog?: boolean
}

//useFormik simples, envia o formik.values para o setState, nesta situação reserva o valor do filtro.

export function useGenericFormik(
  filter: FinanceFilters,
  setState: Dispatch<
    SetStateAction<PaginatedTableState<IAuttarIntegration, FinanceFilters>>
  >
): FormikProps<FinanceFilters> {
  return useFormik<FinanceFilters>({
    initialValues: filter,
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      status: Yup.array(Yup.string()).min(1).required(),
      mode: Yup.string().required(),
      value: Yup.number().required()
    }),
    onSubmit: values => {
      setState(st => ({
        ...st,
        page: 0,
        filters: values
      }))
    }
  })
}
