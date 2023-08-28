const openBtns = document.querySelectorAll('[data-modal]')
const closeBtns = document.querySelectorAll('[data-close]')
const modal = document.querySelector('.modal')


openClose(openBtns, 'add')
openClose(closeBtns, 'remove')

function openClose(arr, method) {
    arr.forEach(btn => {
        btn.onclick = () => {
            modal.classList[method]('fade', 'show')
        }
    })
}



function submit(form) {
    let user = {}

    let fm = new FormData(form)

    fm.forEach((value, key) => {
        user[key] = value
    })

    console.log(user);
    form.reset()
}

const pattern = {
    name: /^[a-z ,.'-]+$/i,
    phone: /^\+998([- ])?(90|91|93|94|95|98|99|33|97|71)([- ])?(\d{3})([- ])?(\d{2})([- ])?(\d{2})$/g
}



const forms = document.querySelectorAll('form')

forms.forEach(form => {
    let inps = form.querySelectorAll('input')

    inps.forEach(inp => {
        inp.onkeyup = () => {
            if (pattern[inp.name].test(inp.value)) {
                inp.style.border = "1px solid blue"
            } else {
                inp.style.border = "1px solid red"
            }
        }
    }

    )

    form.onsubmit = (event) => {
        event.preventDefault()
        let error = false
        inps.forEach(inp => {
            if (inp.value.length === 0 || inp.style.borderColor === 'red') {
                error = true
                inp.style.border = "1px solid red"
            } else {
                inp.style.border = "1px solid blue"
            }
        })



        if (!error) {
            submit(form)
        }


    }
})


const tabContents = document.querySelectorAll('.tabcontent')
const tabBtns = document.querySelectorAll('.tabheader__item')


tabContents.forEach(item => item.classList.add('hide', 'fade'))
tabContents[0].classList.remove('hide')

tabBtns.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(btn => btn.classList.remove('tabheader__item_active'))
        btn.classList.add('tabheader__item_active')

        tabContents.forEach(item => item.classList.add('hide'))
        tabContents[idx].classList.remove('hide')
    })
})

const slide = document.querySelectorAll('.offer__slide')
const slideBtns = document.querySelectorAll('[data-slider]')
let currentNum = document.querySelector('.current')
let currentSlide = 0

slide.forEach(item => item.classList.add('hide', 'fade'))
slide[0].classList.remove('hide')


slideBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        if (btn.dataset.slider === 'prev') {
            currentSlide--
            if (currentSlide < 0) {
                currentSlide = slide.length - 1
            }
        } else {
            currentSlide++
            if (currentSlide >= slide.length) {
                currentSlide = 0
            }
        }
        slide.forEach(item => item.classList.add('hide'))
        slide[currentSlide].classList.remove('hide')
        currentNum.textContent = `0${currentSlide+ 1}`
    })
})


