class Request extends Ring {

    /**
     *
     * @param {int}     id
     * @param {int}     request_val
     * @param {float}   center_x
     * @param {float}   center_y
     * @param {float}   diameter
     * @param {float}   growth_speed Speed at witch the ring increases in diameter.
     * @param {int}     color
     * @param {boolean} [ring_hit_status=false]
     * @param {Sketch}  sketch
     */
    constructor(id, request_val, center_x, center_y, diameter, growth_speed, color, ring_hit_status=false, sketch) {
        super(id, request_val, center_x, center_y, diameter, color, ring_hit_status, sketch);
        this.growth_speed = growth_speed;
    }

    /**
     *
     * @param {Prover} prover Checks if the request from the verifier reaches a prover.
     */
    check_prover_collision(prover) {
        super.check_ring2ring_collision(prover);
    }

    /**
     *
     * @param {Verifier} verifier Checks if the request reaches another verifier.
     */
    check_verifier_collision(verifier) {
        super.check_ring2ring_collision(verifier);
    }

}
