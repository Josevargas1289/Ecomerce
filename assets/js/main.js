const items = [
    {
      id: 1,
      name: 'Hoodies',
      price: 14.00,
      image: 'assets/images/featured1.png',
      category: 'hoodies',
      quantity: 10
    },
    {
      id: 2,
      name: 'Shirts',
      price: 24.00,
      image: 'assets/images/featured2.png',
      category: 'shirts',
      quantity: 15
    },
    {
      id: 3,
      name: 'Sweatshirts',
      price: 24.00,
      image: 'assets/images/featured3.png',
      category: 'shirts',
      quantity: 20
    }
  ]

  // declaracion de variables


  const body = document.body
  const btnTheme  = document.getElementById('theme-btn') 

  const cartBtnOpen = document.getElementById('cart-btn')
  const cartBtnClose = document.getElementById('close-cart')
  const cartContainer  =document.getElementById('cart-container')

  const menuBtn = document.getElementById('menu-btn')
  const menuBtnClose = document.getElementById('close-menu')
  const menuContainer  =document.getElementById('menu-container')

  const navBarScroller = document.getElementById('navBar');


  const btnMenuHome = document.getElementById('menu-home')
  const btnMenuProducts = document.getElementById('menu-products')


  btnMenuHome .addEventListener('click', e => menuContainer.classList.add('hiden')) 
  btnMenuProducts .addEventListener('click', e => menuContainer.classList.add('hiden')) 




  


// funcion botones de cerrar y abrir

  const darkThemChange = () =>{
   
      if(btnTheme.classList.contains('bx-moon')){
        btnTheme.classList.replace('bx-moon', 'bx-sun')

      }else{
        btnTheme.classList.replace('bx-sun', 'bx-moon')
        
      }
      body.classList.toggle('dark')
         
  }
  btnTheme.addEventListener('click', e => darkThemChange())


// funcionalidad boton-cart

  cartBtnOpen.addEventListener('click', e => cartContainer.classList.remove('hiden')) 

  cartBtnClose.addEventListener('click', e => cartContainer.classList.add('hiden'))

// funcionalidad boton menu

menuBtn .addEventListener('click', e => menuContainer.classList.remove('hiden')) 

menuBtnClose.addEventListener('click', e => menuContainer.classList.add('hiden'))


// agregando color a la barra de navegacion sise detecta un scroll


let lastscroll = 0;
 window.addEventListener('scroll', () =>{
  const  currentScroll = window.pageYOffset
  lastscroll = currentScroll;
  if(lastscroll <= 10 ){
    navBarScroller.classList.remove('scroller-nav')

  }else{
    navBarScroller.classList.add('scroller-nav')

  }
  
 })

 

//  animacion loader


const loadComponent = () => {
  const loader = document.getElementById( "loader" )

 setTimeout( () => { 
     loader.classList.add( "hide" )
  }, 3000 )
}

document.addEventListener( "DOMContentLoaded", ( ) => {
 

  loadComponent()
})



