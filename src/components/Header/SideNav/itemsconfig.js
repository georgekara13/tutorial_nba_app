
//add menu items here
const Items = [
  {
    icon: 'home',
    type: 'option', //TODO pass css class from here
    text: 'Home',
    link: '/',
    login: ''
  },
  {
    icon: 'file-alt',
    type: 'option', //TODO pass css class from here
    text: 'News',
    link: '/articles',
    login: ''
  },
  {
    icon: 'film',
    type: 'option', //TODO pass css class from here
    text: 'Videos',
    link: '/videos',
    login: ''
  },
  {
    icon: 'columns',
    type: 'option', //TODO pass css class from here
    text: 'Dahboard',
    link: '/dashboard',
    login: false
  },
  {
    icon: 'door-open',
    type: 'option', //TODO pass css class from here
    text: 'Sign In',
    link: '/sign-in',
    login: true
  },
  {
    icon: 'door-closed',
    type: 'option', //TODO pass css class from here
    text: 'Sign Out',
    link: '/sign-out',
    login: false
  },
]

export default Items
