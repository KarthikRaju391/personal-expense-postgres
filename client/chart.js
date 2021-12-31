const headingEl = document.getElementById('heading-el')

function home() {
   window.location = '/client'
}

headingEl.addEventListener('click', home)