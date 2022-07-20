import { FormHandles } from '@unform/core'
import { useCallback, useRef } from 'react'


export const useVForm = () => {
  const formRef = useRef<FormHandles>(null)

  const isSavingAndJoin = useRef(false)
  const isSavingAndBack = useRef(false)

  const handleSave = useCallback(() => {
    isSavingAndJoin.current = false
    isSavingAndBack.current = false
    formRef.current?.submitForm()
  }, [])

  const handleSaveAndJoin = useCallback(() => {
    isSavingAndJoin.current = true
    isSavingAndBack.current = false
    formRef.current?.submitForm()
  }, [])

  const handleSaveAndBack = useCallback(() => {
    isSavingAndJoin.current = false
    isSavingAndBack.current = true
    formRef.current?.submitForm()
  }, [])


  const handleIsSaveAndJoin = useCallback(() => {
    return isSavingAndJoin.current
  }, [])

  const handleIsSaveAndBack = useCallback(() => {
    return isSavingAndBack.current
  }, [])


  return {
    formRef,

    save: handleSave,
    saveAndJoin : handleSaveAndJoin,
    saveAndBack: handleSaveAndBack,

    isSaveAndJoin: handleIsSaveAndJoin,
    isSaveAndBack: handleIsSaveAndBack,
  }
}
