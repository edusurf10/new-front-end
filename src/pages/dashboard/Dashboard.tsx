import { DetailTools } from '../../shared/components'
import { LayoutDefaultOfPage } from '../../shared/layouts'


export const Dashboard = () => {

  return (
    <LayoutDefaultOfPage
      title='Painel'
      toolBar={(
        <DetailTools
          
        />
      )}
    >
      Testando
    </LayoutDefaultOfPage>
  )
}