import { DetailTools } from '../../shared/components'
import { LayoutDefaultOfPage } from '../../shared/layouts'


export const Dashboard = () => {

  return (
    <LayoutDefaultOfPage
      titles='Painel'
      toolBar={(
        <DetailTools
          
        />
      )}
    >
      Testando
    </LayoutDefaultOfPage>
  )
}