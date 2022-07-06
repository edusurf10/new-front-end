import { DetailTools } from '../../shared/components'
import { LayoutDefaultOfPage } from '../../shared/layouts'


export const Dashboard = () => {

  return (
    <LayoutDefaultOfPage
      title='Painel de controle'
      toolBar={(
        <DetailTools

        />
      )}
    >
      Testando
    </LayoutDefaultOfPage>
  )
}
