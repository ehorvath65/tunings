export default class View {
    constructor(synthesizer) {
        this.checkboxes = []
        this.clicked = []
        this.synthesizer = synthesizer
        this.write_fifths()
    }

    write_fifths() {
        let startnote = 69 //440 Hz
        for (let i = 0; i <= 12; i++) {
            fifths.innerHTML +=
                '<div><input type="checkbox" name="checkbox' +
                i +
                '">&nbsp&nbsp&nbsp' +
                this.synthesizer.tuningEqual[i + startnote].toFixed(4) +
                '&nbsp&nbsp&nbsp' +
                this.synthesizer.tuningCircleOfFifth[i + startnote].toFixed(4) +
                '&nbsp&nbsp&nbsp' +
                (
                    (100 *
                        (this.synthesizer.tuningEqual[i] -
                            this.synthesizer.tuningCircleOfFifth[i])) /
                    this.synthesizer.tuningEqual[i]
                ).toFixed(2) +
                ' %</div>'
        }
        for (let i = 0; i <= 12; i++) {
            this.checkboxes[i] = document.querySelector(
                'input[name="checkbox' + i + '"]'
            )
            this.checkboxes[i].onclick = function () {
                if (
                    document.querySelector('input[name="checkbox' + i + '"]')
                        .checked
                ) {
                    console.log('btns[' + i + '] checked')
                    this.synthesizer.noteOn(i + startnote, 0)
                    this.synthesizer.noteOn(i + startnote, 1)
                } else {
                    console.log('btns[' + i + '] up')
                    this.synthesizer.noteOff(i + startnote, 0)
                    this.synthesizer.noteOff(i + startnote, 1)
                }
            }.bind(this)
        }
    }
}
