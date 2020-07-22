class Request extends Ring {

    /**
     * @param {float} growth_speed Speed at witch the ring increases in diameter.
     */
    constructor(id, request_val, center_x, center_y, diameter, growth_speed, color, ring_hit_status=false, sketch) {
        super(id, request_val, center_x, center_y, diameter, color, ring_hit_status, sketch);
        this.growth_speed = growth_speed;
    }

    /**
     * @param {Prover} prover Checks if the request from verifier reaches the prover.
     */
    check_prover_collision(prover) {
        super.check_ring2ring_collision(prover);
    }

}
