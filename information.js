class Information extends Ring {

    #growth_rate;
    #prop_status = false;
    #val;

    /**
     * Constructor for Information instance.
     * @param {string} name
     * @param {number} id
     * @param {number} value
     * @param {number} center_x
     * @param {number} center_y
     * @param {number} diameter
     * @param {number} growth_rate
     * @param {string} color
     * @param {Sketch} sketch
     */
    constructor(name, id, val, center_x, center_y, diameter, growth_rate, color, sketch) {
        super(name, id, center_x, center_y, diameter, color, sketch);
        this.#val = val;
        this.#growth_rate = growth_rate;
    }

    /**
     * Method to display the increasing diameter of the Information instance.
     * @param {number} new_diameter
     */
    displayInformation() {
        this.sketch.push();
        this.sketch.noFill();
        this.sketch.stroke(this.color);
        this.sketch.circle(this.center_x, this.center_y, this.diameter);
        this.sketch.pop();
    }


    /**
     * Method for increasing the diameter of the current Information instance by one growth_rate step.
     */
    updateInformationDiameter() {
        this.diameter += this.#growth_rate;
    }

    /**
     * Method to initialize the propagation status, to know if information has been displayed.
     */
    initPropStatus() {
        this.#prop_status = true;
    }

}