import './index.css'
import Masonry from './masonry';

const dimensions = [];

while (dimensions.length < 500) {
    const rand = Math.random()
    dimensions.push({
        width: 400,
        height: [300,400,500,600,700][(rand * 5) >> 0],
    })
}

const masonry = new Masonry({
    dimensions,
    columns: 5,
    containerWidth: 1200,
})

const app = document.getElementById('app')

const getColor = () => {
    let color = new Array(3)

    for (let i = 0; i < color.length; i++) {
        color[i] = Math.random() * 256 >> 0
    }

    return color
}

const printColor = (color) => {
    return '#' + color.map(c => c.toString(16).padStart(2, '0')).join('')
}

const printOppositeColor = (color) => {
    return '#' + color.map(c => (255-c).toString(16).padStart(2, '0')).join('')
}

const grids = masonry.map((item, index) => {
    const div = document.createElement('div')
    div.classList.add('grid')
    div.style.width = item.width + 'px'
    div.style.height = item.height + 'px'
    div.style.transform = `translate(${item.x}px, ${item.y}px)`

    div.innerHTML = `
        <div>${index}</div>
        <button class="grid__btn" data-index=${index}>click</button>
    `

    const color = getColor()
    div.style.backgroundColor = printColor(color)
    div.style.color = printOppositeColor(color)

    return div
})

const container = document.createElement('div')
container.classList.add('grid-container')
container.append(...grids)

app.appendChild(container)

app.addEventListener('click', e => {
    if (e.target.classList.contains('grid__btn')) {
        const index = e.target.dataset.index
        const colSpan = dimensions[index].colSpan || 1
        dimensions[index].colSpan = (colSpan + 1) % 5 || 1
        masonry.calculate()

        const grids = document.querySelectorAll('.grid')
        masonry.each((item, i) => {
            const div = grids[i]
            div.style.width = item.width + 'px'
            div.style.height = item.height + 'px'
            div.style.transform = `translate(${item.x}px, ${item.y}px)`
        })
    }
})