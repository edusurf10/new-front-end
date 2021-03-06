

export const Environment = {
  /**
   * Define a quantidade de linhas a ser carregada por padrão nas listagens
   */
  LINE_LIMIT: 10,

  SEARCH_INPUT: 'Pesquisar...',

  EMPTY_LIST: 'Nenhum registro encontrado!',

  BASE_URL: process.env.REACT_APP_VERCEL_ENV ? 'https://atlaabackendrails.herokuapp.com/api' : 'http://0.0.0.0:3500/api',

  CHAT_URL: 'http://0.0.0.0:4000'

}
