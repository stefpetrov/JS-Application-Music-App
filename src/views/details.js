
import { deleteItem, getAllItems, getItemById } from '../api/posts.js';
import { html } from '../lib.js';
import { getUserData } from '../util.js';


const detailsTemplate = (item, isOwner,onDelete) => html`
<section id="detailsPage">
    <div class="wrapper">
        <div class="albumCover">
            <img src=${item.imgUrl}>
        </div>
        <div class="albumInfo">
            <div class="albumText">

                <h1>Name: ${item.name}</h1>
                <h3>Artist: ${item.artist}</h3>
                <h4>Genre: ${item.genre}</h4>
                <h4>Price: $${item.price}</h4>
                <h4>Date: ${item.releaseDate}</h4>
                <p>Description: ${item.description}</p>
            </div>
            ${isOwner ? html`
            <div class="actionBtn">
                <a href="/edit/${item._id}" class="edit">Edit</a>
                <a @click= ${onDelete} href="javascript:void(0)" class="remove">Delete</a>
            </div>`
            : ''}

            
        </div>
    </div>
</section>`




export async function detailsView(ctx){

    const item = await getItemById(ctx.params.id)
    const userData = getUserData()

    const isOwner = userData?.id == item._ownerId


    ctx.render(detailsTemplate(item, isOwner, onDelete,userData))


    async function onDelete(){
        const choice = confirm('Are you sure you want to delete this item?')

        if(choice){
            await deleteItem(ctx.params.id)
            ctx.page.redirect('/catalog')
        }
    }
}