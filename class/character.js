class Character extends Ring {

    #queued_informations = [];    // Contains instances of Information objects provided to the Character instance.
    #displayed_informations = []; // Contains instances of Information objects to be displayed every frame.

    /**
     * Constructor for Character instance.
     * @param {string} name
     * @param {number} id
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
        this.getSketch().push();
        this.getSketch().noStroke();
        this.getSketch().fill(this.getColor());
        this.getSketch().circle(this.getCenterX(), this.getCenterY(), this.getDiameter());

        // Display text.
        this.getSketch().textSize(15);
        this.getSketch().fill(255);
        this.getSketch().text(this.getName(), this.getCenterX() - (this.getSketch().textWidth(this.getName()) / 2), this.getCenterY() + ((this.getSketch().textAscent() + this.getSketch().textDescent()) / 4));
        this.getSketch().pop();

    }

    /**
     * Method to add Information object to #informations array.
     * @param {Information} info Instance of an Information object.
     */
    addInformation(info) {
        this.#queued_informations.push(info);
    }

    /**
     * Method to add Information object from user to #informations array.
     * @param {Information} info Instance of an Information object.
     */
    addInformationFromUser(info) {
        this.#queued_informations.unshift(info);
    }

    /**
     * Method to display the information and update
     */
    emitInformation() {

        // Add new element to #displayed_information every multiple of the frameCount only if #informations is populated.
        if( (this.#queued_informations.length > 0) && (this.getSketch().frameCount % 30 === 0)) {
            let new_info = this.#queued_informations.shift(); // Get Information instance from #informations array.
            new_info.initPropStatus();                        // Initialize the propagation status.
            this.#displayed_informations.push(new_info);      // Add Information instance to #displayed_informations array.
        }

        this.#displayed_informations.forEach(info => {
            info.displayInformation();        // Display current information.
            info.updateInformationDiameter(); // Update the information diameter for the next frame.
        })

    }

    /**
     * Get array of queued information.
     * @returns {Information[]}
     */
    getQueuedInformations() {
        return this.#queued_informations;
    }

    /**
     * Get array of displayed information.
     * @returns {Information[]}
     */
    getDisplayedInformations() {
        return this.#displayed_informations;
    }



}