import { getAllItems} from '../api/posts.js';
import { html } from '../lib.js';
import { getUserData } from '../util.js';


const catalogTemplate = (items,userData) => html`
<section id="catalogPage">
    <h1>All Albums</h1>

    ${items.length == 0 ? html`<p>No Albums in Catalog!</p>`
    : userData ? items.map(itemCardUser)
: items.map(itemCardGuest)}
</section>`


const itemCardUser = (item)=> html`
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
</div>
`

const itemCardGuest = (item)=> html`
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

export async function catalogView(ctx){
    const items = await getAllItems()
    const userData = getUserData()
    
    ctx.render(catalogTemplate(items,userData))

}


