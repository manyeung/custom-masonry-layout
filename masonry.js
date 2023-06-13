export default class Masonry
{
    dimensions = []

    columns = 3    
    containerWidth = 1200
    colWidth = 400
    colYList = []
    
    layout = []

    constructor({dimensions=[], columns=3, containerWidth=1200}) {
        this.dimensions = dimensions
        this.columns = columns
        this.containerWidth = containerWidth
        this.colWidth = Math.floor(containerWidth / columns)
        this.calculate()
    }

    calculate() {
        this.colYList = new Array(this.columns).fill(0)

        this.layout = this.dimensions.map(d => {
            const colSpan = Math.min(d.colSpan || 1, this.columns)
            const rate = this.colWidth / d.width
            const width = this.colWidth * colSpan
            const height = d.height * rate * colSpan

            let x = 0
            let y = Number.POSITIVE_INFINITY
            let column = 0

            const availableColYList = []
            if (colSpan === 1) {
                availableColYList.push(...this.colYList)
            } else {
                for (let col = 0; col < this.columns - colSpan + 1; col++) {
                    availableColYList.push(
                        Math.max(...this.colYList.slice(col, col + colSpan))
                    )
                }
            }
            
            for (let col = 0; col < availableColYList.length; col++) {
                if (availableColYList[col] < y) {
                    x = col * this.colWidth
                    y = availableColYList[col]
                    column = col
                }
            }

            for (let col = column; col < column + colSpan; col++) {
                this.colYList[col] = y + height
            }

            return {
                width,
                height,
                x,
                y,
                colSpan,
            }
        })
    }

    map(...args) {
        return this.layout.map(...args)
    }

    each(...args) {
        return this.layout.forEach(...args)
    }
}