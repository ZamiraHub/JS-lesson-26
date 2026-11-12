const list=document.querySelector(`#list`)
const inputs=document.querySelectorAll('input')
const add=document.querySelector('add')
//CRUD http methods
//C-CREATE
//Read-GET
//U-UPDATE
//D-DELETE
const url="https://dummyjson.com/recipe"
async function getProducts(){
    try{
        const res=await fetch(url);
        const data=await res.json()
        console.log(data.recipes);
        showProducts(data.recipes)

     }  catch(err) {
        console.log(err);
        
    }

}getProducts()
function showProducts(arr){
    for (const pr of arr){
         list.innerHTML+=`
         <li>
         <h4 onclick=delProduct(${pr.id})>${pr.name}</h4>
         <img src=${pr.image} />
         <button onclick="changeProduct(${pr.id})">Update</button>
         </li>
         `

    }
}
async function delProduct (id) {
    try{
        const res=await fetch(url+`/`+id,{
            method:'DELETE',
            headers: {
                'Content-Type': 'applications/json'
            }
        })
        const data=await res.json()
        console.log(data);
        getProducts()
    
    }  catch(err){
        console.log(err);
        
    }
    
}

async function changeProduct(id) {
    const inputTitle=prompt("Enter title")
    const img=prompt("Enter img url")
    const res=await fetch(`${url}/${id}`,{
        method:"PUT",
        headers:{
            'Content-type':'application/json'
        },
        body: JSON.stringify({title: inputTitle,image: img})
    })
    const data=await res.json()
    getProducts()

}

async function creatProduct(params) {
    const res=await fetch(url,{
        method:"POST",
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            title:inputs[0].value,
            price:inputs[1].value,
            image:inputs[2].value
        })
    })
    const data=await res/json()
    console.log(data);
    
    getProducts()
}

add.onclick=()=>{
    createProduct()
}
