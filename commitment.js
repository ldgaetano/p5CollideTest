class Commitment extends Ring {

    /**
     *
     * @param {int}     id
     * @param {int}     commit_val
     * @param {float}   center_x
     * @param {float}   center_y
     * @param {float}   diameter
     * @param {float}   growth_speed
     * @param {int}     color
     * @param {boolean} [ring_hit_status=false]
     * @param {Sketch}  sketch
     */
    constructor(id, commit_val, center_x, center_y, diameter, growth_speed, color, ring_hit_status=false, sketch) {
        super(id, commit_val, center_x, center_y, diameter, color, ring_hit_status, sketch);
        this.growth_speed = growth_speed;
    }

    /**
     *
     * @param {Prover} prover Checks if the commit from the prover reaches another one of the other provers.
     */
    check_prover_collision(prover) {
        super.check_ring2ring_collision(prover);
    }

    /**
     *
     * @param {Verifier} verifier Checks if the commit from the prover reaches a verifier.
     */
    check_verifier_collision(verifier) {
        super.check_ring2ring_collision(verifier);
    }
}