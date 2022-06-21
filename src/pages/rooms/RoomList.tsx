import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ListTools } from '../../shared/components'
import { LayoutDefaultOfPage } from '../../shared/layouts'


export const RoomList: React.FC = () =>  {
  const [searchParams, setSearchParams] = useSearchParams()

  const search = useMemo(() => {
    return searchParams.get('search') || ''
  }, [searchParams])


  return (
    <LayoutDefaultOfPage
      title="Salas"
      toolBar={
        <ListTools
          textButton='Nova'
          searchText={search}
          showSearchInput
          onChangeSearchText={text => setSearchParams(text)}
        />
      }
    >

    </LayoutDefaultOfPage>
  )
}