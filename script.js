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
        currentNum.textContent = `0${currentSlide + 1}`
    })
})

const timer = document.querySelectorAll('.timer__block')
const days = document.querySelector('#days')
const hours = document.querySelector('#hours')
const minutes = document.querySelector('#minutes')
const seconds = document.querySelector('#seconds')
var canvas = document.createElement('canvas');
document.body.appendChild(canvas);


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


var ctx = canvas.getContext('2d');


function drawConfetti(x, y, color) {
  ctx.beginPath();
  ctx.arc(x, y, 5, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
}


function startConfetti() {
  var colors = ['#ff0000', '#00ff00', '#0000ff'];


  for (var i = 0; i < 100; i++) {
    var x = Math.random() * canvas.width;
    var y = Math.random() * canvas.height;
    var color = colors[Math.floor(Math.random() * colors.length)];

    drawConfetti(x, y, color);
  }
}

timer.forEach(time => {
    const deadline = new Date('2023-08-30T19:00:00').getTime()

    const interval = setInterval(() => {

        const now = new Date().getTime()
        const timeLeft = deadline - now

        const daysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24))
        const hoursLeft = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))
        const secondsLeft = Math.floor((timeLeft % (1000 * 60)) / 1000)


        days.innerHTML = daysLeft
        hours.innerHTML = hoursLeft
        minutes.innerHTML = minutesLeft
        seconds.innerHTML = secondsLeft

        if (timeLeft <= 0) {
            startConfetti()
            clearInterval(interval)
            
        }


    }, 1000)

})





