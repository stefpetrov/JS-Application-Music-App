import { del, get, post, put } from "./api.js";


// change url
export async function getAllItems(){
    return get('/data/albums?sortBy=_createdOn%20desc&distinct=name')
}

// export async function getItemsByUsers(userId){
//     return get(`/data/posts?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`)
// }

export async function getItemById(id){
    return get('/data/albums/' + id)
}

export async function createItem(item){
    return post('/data/albums',item)

}

export async function updateItem(id,item){
    return put('/data/albums/'+ id, item)

}

export async function deleteItem(id){
    return del('/data/albums/' + id)

}

export async function searchItem(searchText){
    const query = encodeURIComponent(`name LIKE "${searchText}"`)

    return get(`/data/albums?where=${query}`)

}




