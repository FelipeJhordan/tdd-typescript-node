import paths from './paths'
import components from './components'
import schemas from './schemas'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Clean Node Api',
    description: 'Api do curso do Mango para relatar enquetes entre programadores',
    version: '1.0.0',
    contact: {
      name: 'Felipe Jhordan',
      email: 'felipejordan.alves@gmail.com',
      url: 'https://github.com/FelipeJhordan'
    },
    license: {
      name: 'GPL-3.0-or-later',
      url: 'https://spdx.org/licenses/GPL-3.0-or-later.html'
    }
  },
  servers: [{
    url: '/api/v1/',
    description: 'Servidor Principal'
  }],
  tags: [{
    name: 'Login',
    description: 'APIs relacionadas a Login'
  }],
  paths,
  schemas,
  components
}
