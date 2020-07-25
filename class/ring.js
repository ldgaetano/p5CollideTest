class Ring {

    #name;
    #id;
    #center_x;
    #center_y;
    #diameter;
    #color;
    #sketch;
    #init_diameter;

    /**
     * Constructor for Ring instance.
     * @param {string} name
     * @param {number} id
     * @param {number} center_x
     * @param {number} center_y
     * @param {number} diameter
     * @param {string} color
     * @param {Object} sketch
     */
    constructor(name, id, center_x, center_y, diameter, color, sketch) {
        this.#name = name;
        this.#id = id;
        this.#center_x = center_x;
        this.#center_y = center_y;
        this.#diameter = diameter;
        this.#init_diameter = diameter;
        this.#color = color;
        this.#sketch = sketch;
    }

    /**
     * Method to statically display the current Ring instance.
     */
    displayStaticRingInstance() {
        this.#sketch.push();
        this.#sketch.noFill();
        this.#sketch.stroke(this.#color);
        this.#sketch.circle(this.#center_x, this.#center_y, this.#init_diameter);
        this.#sketch.pop();
    }

    /**
     * Method to check if current instance of Ring has collided with a target ring.
     * @param  {Ring}    target_ring     Ring that is going to be collided with.
     * @param  {string}  collision_color Color to change current ring instance once target is reached.
     * @return {boolean}
     */
    check_ring2collision(target_ring, collision_color) {

        // Check if collision has occurred.
        this.collision_status = this.#sketch.collideCircleCircle(this.#center_x, this.#center_y, this.#diameter, target_ring.#center_x, target_ring.center_y, target_ring.diameter);

        // Change color of ring if collision has occurred.
        if (this.collision_status) {
            this.color = this.sketch.color(collision_color);
        }
        return this.collision_status;
    }


    /**
     * Get name.
     * @returns {string}
     */
    getName() {
        return this.#name;
    }

    /**
     * Get id.
     * @returns {number}
     */
    getID() {
        return this.#id;
    }

    /**
     * Get center_x position.
     * @returns {number}
     */
    getCenterX() {
        return this.#center_x;
    }

    /**
     * Get center_y position.
     * @returns {number}
     */
    getCenterY() {
        return this.#center_y;
    }

    /**
     * Get diameter.
     * @returns {number}
     */
    getDiameter() {
        return this.#diameter;
    }

    /**
     * Get radius.
     * @returns {number}
     */
    getRadius() {
        return this.#diameter / 2;
    }

    /**
     * Get initial diameter.
     * @returns {number}
     */
    getInitDiameter() {
        return this.#init_diameter;
    }

    /**
     * Get color.
     * @returns {string}
     */
    getColor() {
        return this.#color;
    }

    /**
     * Get sketch.
     * @returns {Object}
     */
    getSketch() {
        return this.#sketch;
    }

    /**
     * Set center_x position.
     * @param {number} center_x
     */
    setCenterX(center_x) {
        this.#center_x = center_x;
    }

    /**
     * Set center_y position.
     * @param {number} center_y
     */
    setCenterY(center_y) {
        this.#center_y = center_y;
    }

    /**
     * Set diameter.
     * @param {number} diameter
     */
    setDiameter(diameter) {
        this.#diameter = diameter;
    }

    /**
     * Set color.
     * @param {string } color
     */
    setColor(color) {
        this.#color = color;
    }
}