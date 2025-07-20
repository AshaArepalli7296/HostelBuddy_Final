import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // Make sure you have this file

// Font Awesome setup
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome, faUsers, faConciergeBell } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faHome, faUsers, faConciergeBell, faFacebook, faTwitter, faInstagram, faLinkedin)

const app = createApp(App)

// Register global components
app.component('font-awesome-icon', FontAwesomeIcon)

// Use router
app.use(router)

app.mount('#app')