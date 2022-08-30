import { searchItem } from "../api/posts.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js";


const searchTemplate = (onSubmit,items,userData)=> html`
<section id="searchPage">
    <h1>Search by Name</h1>

    <div class="search">
        <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
        <button @click =${onSubmit} class="button-list">Search</button>
    </div>

    <h2>Results:</h2>

    <!--Show after click Search button-->
    <div class="search-result">
        <!--If have matches-->
        ${items.length > 0 ?
        userData ? items.map(searchCardUser)
        : items.map(searchCardGuest)
        :  html`<p class="no-result">No result.</p>`}

    </div>
</section>`


const searchCardUser = (item)=> html`
<div class="card-box">
    <img src=${item.imgUrl}>
    <div>
        <div class="text-center">
            <p class="name">Name: ${item.name}</p>
            <p class="artist">Artist: ${item.artist}</p>
            <p class="genre">Genre: ${item.genre}</p>
            <p class="price">Price: $${item.price}</p>
            <p class="date">Release Date: ${item.releaseDate}</p>
        </div>
        
        <div class="btn-group">
            <a href="/albums/${item._id}" id="details">Details</a>
        </div>
    </div>
</div>`


const searchCardGuest = (item)=> html`
<div class="card-box">
    <img src=${item.imgUrl}>
    <div>
        <div class="text-center">
            <p class="name">Name: ${item.name}</p>
            <p class="artist">Artist: ${item.artist}</p>
            <p class="genre">Genre: ${item.genre}</p>
            <p class="price">Price: $${item.price}</p>
            <p class="date">Release Date: ${item.releaseDate}</p>
        </div>
    </div>
</div>
`


export async function searchView(ctx){

    
    async function onSubmit(event){
        event.preventDefault()
        let searchInput = document.getElementById('search-input')

        const userData = getUserData()
        const items = await searchItem(searchInput.value)


        ctx.render(searchTemplate(onSubmit,items,userData))
        document.getElementById('search-input').value = ''
    }
    ctx.render(searchTemplate(onSubmit,[]))
    
}


