import {render} from './lib.js'
import page from '../node_modules/page/page.mjs';
import { catalogView } from './views/catalog.js';
import { loginView } from './views/login.js';
import { getUserData } from './util.js';
import { registerView } from './views/register.js';
import { logout } from './api/users.js';
import { createView } from './views/create.js';
import { detailsView } from './views/details.js';
import { editView } from './views/edit.js';
import { homeView } from './views/home.js';
import { searchView } from './views/searchView.js';



// chech how to select main element
const main = document.querySelector('main')

// change url path where if necessery (posts)
page(decorateContext)
page("/", homeView)
page("/catalog",catalogView)
page("/albums/:id", detailsView)
page("/edit/:id", editView)
page("/login", loginView)
page("/register", registerView)
page("/create", createView)
page("/search", searchView)






page.start()

updateNav()

function decorateContext(ctx,next){
    ctx.render = renderMain
    ctx.updateNav = updateNav
    next()
}

function renderMain(templateResult){
    render(templateResult,main)
}

function updateNav(){

    const userData = getUserData()
    if(userData){
        //  check  class or id  selector
        document.querySelectorAll('.user').forEach(el => el.style.display = 'inline-block')
        document.querySelectorAll('.guest').forEach(el => el.style.display = 'none')


    }else {
        document.querySelectorAll('.user').forEach(el => el.style.display = 'none')
        document.querySelectorAll('.guest').forEach(el => el.style.display = 'inline-block')

    }
}

document.getElementById('logoutBtn').addEventListener('click',onLogout)

function onLogout(){

    logout()
    updateNav()
    page.redirect('/')

}





