


const ParrotTemplate = document.querySelector(".template");
const renderParrot = (parrot => {
    const {
        id,
        title,
        img,
        price,
        birthDate,
        sizes,
        features

    } = parrot
    const parrotRow = ParrotTemplate.content.cloneNode(true);
    const teteleParrot = parrotRow.querySelector(".parrots__title")
    teteleParrot.textContent = title
    const imgParrot = parrotRow.querySelector(".parrots__img")
    imgParrot.src = img
    const priceParrot = parrotRow.querySelector(".parrots__mark")
    priceParrot.textContent = `$${price}`
    const birthDateParrot = parrotRow.querySelector(".parrots__date")
    birthDateParrot.textContent = birthDate
    const featuresParrot = parrotRow.querySelector(".parrots__list-item")
    const subtitleParrot = parrotRow.querySelector(".parrots__subtitle")
    subtitleParrot.textContent = `${sizes.width} x ${sizes.height}`
    featuresParrot.textContent = features
    const editBtn = parrotRow.querySelector(".parrots__edit-btn")
    editBtn.setAttribute("data-id", id)
    const delBtn = parrotRow.querySelector(".parrots__del-btn")
    delBtn.setAttribute("data-id", id)
    return parrotRow
})

let showingParrots = products.slice()
let parrotUL = document.querySelector(".list-unstyled")
const count = document.querySelector(".count")

const renderParrots = () => {

    const parrotFragment = document.createDocumentFragment()
    count.textContent = `Count ${products.length}`
    parrotUL.innerHTML = ''
    showingParrots.forEach((parrot) => {
        const ParrotRow = renderParrot(parrot)
        parrotFragment.appendChild(ParrotRow);
    })
    parrotUL.appendChild(parrotFragment)

}

renderParrots();

const addForm = document.getElementById("add-form")
const modal = document.querySelector("#add-parrot-modal")
const Modal = new bootstrap.Modal(modal)

addForm.addEventListener("submit", evt => {
    evt.preventDefault()
 
    const title = document.getElementById("title")
    const img = document.getElementById("img")
    const price = document.getElementById("price")
    const date = document.getElementById("date")
    const width = document.getElementById("width")
    const height = document.getElementById("height")
    const features = document.getElementById("features")
    if (title.value.trim() && img.value.trim() && price.value && features.value.trim()) {
        let objParrot = {
            id: Math.round(Math.random *2000) ,
            title:title.value,
            img:img.value,
            price:+price.value ,
            birthDate:date.value ,
            sizes: {
                width:+width.value ,
                height:+height.value,
                },
            
            features: features.value
        }
        products.push(objParrot)
        showingParrots.push(objParrot)
        localStorage.setItem("parrot", JSON.stringify(products))
    }
    renderParrots();
    Modal.hide()
    addForm.reset()
})

// ///////////
const editForm = document.querySelector("#edit-parrot-modal")
const editFormModul = new bootstrap.Modal(editForm)
let title = document.getElementById("edit-parrot-title")
let img = document.getElementById("edit-parrot-img")
let price = document.getElementById("edit-price")

let date = document.getElementById("edit-parrot-date")
let width = document.getElementById("edit-parrot_width")
let height = document.getElementById("edit-parrot_height")
let features = document.getElementById("edit-features")

parrotUL.addEventListener("click", evt =>{
    if(evt.target.matches(".parrots__del-btn")){
        const clickBtn = +evt.target.dataset.id
        const clickBtnindex = products.findIndex((parrots) => {
            return (parrots.id == clickBtn)
        })
        products.splice(clickBtnindex,1)
    
        showingParrots.splice(clickBtn,1)
        localStorage.setItem("parrot", JSON.stringify(products))
        renderParrots()
    }else if(evt.target.matches(".parrots__edit-btn")){
        
       

        const clickBtn = +evt.target.dataset.id
        const clickBtnindex = products.find((parrots) => {
            return (parrots.id == clickBtn)

        })

        title.value = clickBtnindex.title
        img.value = clickBtnindex.img
        price.value = clickBtnindex.price
        date.value = clickBtnindex.birthDate
        width.value = clickBtnindex.sizes.width
        height.value = clickBtnindex.sizes.height
        features.value = clickBtnindex.features

        editForm.setAttribute("data-editingId", clickBtnindex.id)
    }
    
    
})
const titleEdit  = document.querySelector("#edit-parrot-title")
const imgEdit  = document.querySelector("#edit-parrot-img")
const priceEdit  = document.querySelector("#edit-price")
const dateEdit  = document.querySelector("#edit-parrot-date")
const widthEdit = document.querySelector("#edit-parrot_width");
const heightEdit = document.querySelector("#edit-parrot_height")
const featuresEdit = document.querySelector("#edit-features")

const editFormBtn = document.getElementById("edit-form")
editFormBtn.addEventListener("submit", (e)=>{
    e.preventDefault();
    const editClicked = +e.target.dataset.editingId; 
   console.log(editClicked);
    if(titleEdit.value.trim()){
        let objParrot ={
            id: editClicked,
            title: titleEdit.value,
            img: String(imgEdit.value),
            price:priceEdit.value,
            birthDate: dateEdit.value,
             sizes:{
                width: widthEdit.value,
                height: heightEdit.value
             },
             features:featuresEdit.value
        }
        const editedParrot = products.findIndex((parrot)=>{
            return parrot.id === editClicked
        }) 
        const editParrot =showingParrots.findIndex((parrot)=>{
            return parrot.id === editClicked
        }) 
        products.splice(editedParrot,1,objParrot)
        showingParrots.splice(editParrot,1,objParrot)
        JSON.parse(localStorage.getItem("parrot")).find((editedParrot) => {
            return objParrot = editedParrot
        })
        localStorage.setItem("parrot" , JSON.stringify(products))
      
 
       
    }   
renderParrots()
editFormModul.hide()
})



const filterForm = document.querySelector(".filter")
filterForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const elements = e.target.elements;

    const from = elements.from.value;
    const to = elements.to.value;
    const search = elements.search.value;
    const fromW = elements.from_width.value;
    const toW = elements.to_width.value;
    const fromH = elements.from_height.value;
    const toH= elements.to_height.value;
    const sortValue = elements.sortby.value;

    showingParrots = products.sort((a,b)=>{
        switch (sortValue) {
            case "1":
                if (a.name > b.name) {
                return -1
                } else if (a.name < b.name) {
                    return 1
                };
                case "2":
                    return b.price - a.price
                case "3":
                    return a.price - b.price
                case "4":
                    return toString(Math.floor(a.birthDate) - Math.floor(b.birthDate))
                
                case "5": 
                    return toString(Math.floor(b.birthDate) - Math.floor(a.birthDate))
                break;
            default:
                break;
        }  
    }).filter((parrot)=>{
        return parrot.price >= from
    }).filter((parrot)=>{
        return !to ? true : parrot.price <= to;
    }).filter((parrot)=> {
        return parrot.sizes.width >= fromW;
    }).filter((parrot)=> {
        return !toW ? true : parrot.sizes.width <= toW;
    }).filter((parrot)=> {
        return parrot.sizes.height >= fromH;
    }).filter((parrot)=>{
        return !toH ? true : parrot.sizes.height <= toH;
    }).filter(function(parrot) {
        const regExp = new RegExp(search, 'gi')
        return parrot.title.match(regExp);
    });
renderParrots()
})