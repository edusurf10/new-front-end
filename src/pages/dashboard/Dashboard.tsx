import { ListTools } from '../../shared/components'
import { LayoutDefaultOfPage } from '../../shared/layouts'


export const Dashboard = () => {

  return (
    <LayoutDefaultOfPage
      titles='Painel'
      toolBar={(
        <ListTools
          showSearchInput
          textButton='Nova'
        />
      )}
    >
      Testando
    </LayoutDefaultOfPage>
  )
}