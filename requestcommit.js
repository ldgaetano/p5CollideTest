class RequestCommit extends Ring {

    /**
     *
     * @param {int}    id
     * @param {int}    request_val
     * @param {number} center_x
     * @param {number} center_y
     * @param {number} diameter
     * @param {number} growth_speed
     * @param {string} color
     * @param {Sketch} sketch
     */
    constructor(id, request_val, center_x, center_y, diameter, growth_speed, color, sketch) {
        super(id, request_val, center_x, center_y, diameter, color, sketch);
        this.growth_speed = growth_speed;
    }

    /**
     *
     * @param {Prover} prover     Checks if the request from the verifier reaches a prover.
     * @param {string} new_color  Color to change commitment when prover is reached.
     */
    check_prover_collision(prover, new_color) {
        super.check_ring2ring_collision(prover, new_color);
    }

    /**
     *
     * @param {Verifier} verifier  Checks if the request reaches another verifier.
     * @param {string}   new_color Color to change commitment when another verifier is reached.
     */
    check_verifier_collision(verifier, new_color) {
        super.check_ring2ring_collision(verifier, new_color);
    }

    displayRequest() {
        this.sketch.noFill();
        this.sketch.stroke(this.color);
        this.sketch.ellipse(this.center_x, this.center_y, this.updateRequestDiameter(), this.updateRequestDiameter());
    }

    updateRequestDiameter() {
        this.diameter = this.diameter + this.growth_speed;
        return this.diameter;
    }

}