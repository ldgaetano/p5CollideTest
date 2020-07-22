class Prover extends Ring {

    /**
     *
     * @param {string}       name
     * @param {Commitment[]} commitments
     * @param {float}        center_x
     * @param {float}        center_y
     * @param {float}        diameter
     * @param {int}          color
     * @param {boolean}      [ring_hit_status=false]
     * @param {Sketch}       sketch
     */
    constructor(name, commitments, center_x, center_y, diameter, color, ring_hit_status=false, sketch) {
        super(name, commitments, center_x, center_y, diameter, color, ring_hit_status, sketch);
    }


}