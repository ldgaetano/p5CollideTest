class Character extends Ring {

    #informations = [];
    #displayed_informations = [];

    /**
     * Constructor for Character instance.
     * @param {string} name
     * @param {number} id
     * @param {number} value
     * @param {number} center_x
     * @param {number} center_y
     * @param {number} diameter
     * @param {string} color
     * @param {Sketch} sketch
     */
    constructor(name, id, center_x, center_y, diameter, color, sketch) {
        super(name, id, center_x, center_y, diameter, color, sketch);
    }

    /**
     * Method to display the current Character instance.
     */
    displayCharacter() {

        // Display circle and inner color.
        this.sketch.push();
        this.sketch.noStroke();
        this.sketch.fill(this.color);
        this.sketch.circle(this.center_x, this.center_y, this.diameter);

        // Display text.
        this.sketch.textSize(15);
        this.sketch.fill(255);
        this.sketch.text(this.name, this.center_x - (this.sketch.textWidth(this.name) / 2), this.center_y + ((this.sketch.textAscent() + this.sketch.textDescent()) / 4));
        this.sketch.pop();

    }

    /**
     * Method to add Information object to information array.
     * @param {Information} info Instance of an Information object.
     */
    addInformation(info) {
        this.#informations.push(info);
    }

    /**
     * Method to display the information and update
     */
    emitInformation() {

        // Add new element to displayed_information every multiple of the frameCount.
        if( (this.#informations.length > 0) && (this.sketch.frameCount % 30 === 0)) {
            let new_info = this.#informations.shift();
            new_info.initPropStatus();
            this.#displayed_informations.push(new_info);
        }

        this.#displayed_informations.forEach(info => {
            info.displayInformation();        // Display current information.
            info.updateInformationDiameter(); // Update the information diameter for the next frame.
        })

    }

}