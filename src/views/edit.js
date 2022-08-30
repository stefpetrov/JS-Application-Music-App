
import { getItemById, updateItem } from '../api/posts.js';
import { html } from '../lib.js';



const editTemplate = (item, onSubmit) => html`
<section class="editPage">
            <form @submit=${onSubmit}>
                <fieldset>
                    <legend>Edit Album</legend>

                    <div class="container">
                        <label for="name" class="vhide">Album name</label>
                        <input id="name" name="name" class="name" type="text" .value=${item.name}>

                        <label for="imgUrl" class="vhide">Image Url</label>
                        <input id="imgUrl" name="imgUrl" class="imgUrl" type="text" .value=${item.imgUrl}>

                        <label for="price" class="vhide">Price</label>
                        <input id="price" name="price" class="price" type="text" .value=${item.price}>

                        <label for="releaseDate" class="vhide">Release date</label>
                        <input id="releaseDate" name="releaseDate" class="releaseDate" type="text" .value=${item.releaseDate}>

                        <label for="artist" class="vhide">Artist</label>
                        <input id="artist" name="artist" class="artist" type="text" .value=${item.artist}>

                        <label for="genre" class="vhide">Genre</label>
                        <input id="genre" name="genre" class="genre" type="text" .value=${item.genre}>

                        <label for="description" class="vhide">Description</label>
                        <textarea name="description" class="description" rows="10" .value=${item.description}
                            cols="10"></textarea>

                        <button class="edit-album" type="submit">Edit Album</button>
                    </div>
                </fieldset>
            </form>
        </section>`




export async function editView(ctx){

    const item = await getItemById(ctx.params.id)
    
    ctx.render(editTemplate(item,onSubmit))

    
    async function onSubmit(event){
        event.preventDefault()

        const formData = new FormData(event.target)

        // change
        const item = {
            
            name: formData.get('name').trim(),
            imgUrl: formData.get('imgUrl').trim(),
            price: formData.get('price').trim(),
            releaseDate: formData.get('releaseDate').trim(),
            artist: formData.get('artist').trim(),
            genre: formData.get('genre').trim(),
            description: formData.get('description').trim()

        }
        // check which are neccessery
        if(item.name == '' || item.imgUrl == '' || item.price == '' || item.releaseDate == '' 
        || item.artist == '' || item.genre == '' || item.description == ''){
            return alert('All fields are required!')
        }

        await updateItem(ctx.params.id, item)

        event.target.reset()
        // change url path
        ctx.page.redirect('/albums/'+ ctx.params.id)

        

    }
    
}

