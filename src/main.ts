import { getProduct,Product} from "./modules/fetch.ts";

const mainDiv = document.querySelector('#mainDiv') as HTMLDivElement;

function displayAllProduct(products:Product[]):void{
    mainDiv.innerHTML = '';
    for(const item of products){        
        
        const productCard = document.createElement('div');
        const imageDiv = document.createElement('div');
        const infoDiv = document.createElement('div');
        
        productCard.classList.add('productCardStyle');

        createAndAppendElement('img', item.thumbnail, imageDiv);
        createAndAppendElement('h2', item.title, infoDiv);

        createAndAppendElement('p', `Brand: ${item.brand}`, infoDiv);
        createAndAppendElement('p', `Description: ${item.description}`, infoDiv);
        createAndAppendElement('p', `Category: ${item.category}`, infoDiv);
        createAndAppendElement('p', `Price: ${item.price} $`, infoDiv);
        createAndAppendElement('p', `Discount: ${item.discountPercentage} $`, infoDiv);

        if(item.stock < 10) createAndAppendElement('p', `In stock: ${item.stock} ( low in stock )`, infoDiv);
        else createAndAppendElement('p', `In stock: ${item.stock}`, infoDiv);
        createAndAppendElement('p', `Rating: ${item.rating}`, infoDiv);

        
        productCard.append(imageDiv,infoDiv);
        createAddToCartBtn(infoDiv);
        mainDiv.append(productCard);
    }
}

type DynamicElement = HTMLParagraphElement | HTMLImageElement;

function createAndAppendElement(type:string,content:string,container:HTMLElement):DynamicElement{

    const el = document.createElement(type) as DynamicElement;
    
    if(isImageEl(el)) el.src = content;
    else el.innerText = content;

    container.append(el);
    return el;
}

function isImageEl(el: DynamicElement): el is HTMLImageElement{
    return (el as HTMLImageElement).src !== undefined;
}

const form = document.querySelector('form') as HTMLFormElement;
form.addEventListener('submit', event => {
    event.preventDefault();
    const userInput = document.querySelector('input') as HTMLInputElement;
    // console.log(userInput.value);
    getProduct(userInput.value).then(displayAllProduct).catch(displayError)
    
})

function createAddToCartBtn(container:HTMLDivElement):HTMLFormElement{

    const addBtn = document.createElement('button');

    addBtn.classList.add('addBtnStyle');
    addBtn.innerText = 'Add to cart';
    container.append(addBtn);

    addBtn.addEventListener('click', ()=> {
       console.log('Add to cart');
       
    })
    return form;
}

function displayError(error:Error):void{
    console.log(error);
    
    const dialog = document.querySelector('dialog') as HTMLDialogElement;
    const messageContainer = document.querySelector('#errorContainer') as HTMLDivElement;
    const closebtn = document.querySelector('#closeBtn') as HTMLButtonElement;
    const h3El = document.createElement('h3');

    messageContainer.innerHTML = '';
    h3El.innerText = error.message;
    messageContainer.append(h3El);
    dialog.showModal();

    closebtn.addEventListener('click', ()=> {
        dialog.close();     
    }) 
}

getProduct().then(displayAllProduct)
