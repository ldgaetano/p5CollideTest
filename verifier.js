class Verifier extends Ring {

    /**
     *
     * @param {string}    name
     * @param {Request[]} requests
     * @param {float}     center_x
     * @param {float}     center_y
     * @param {float}     diameter
     * @param {int}       color
     * @param {boolean}   ring_hit_status Default is false.
     * @param {Sketch}    sketch
     */
    constructor(name, requests, center_x, center_y, diameter, color, ring_hit_status=false, sketch) {
        super(name, requests, center_x, center_y, diameter, color, ring_hit_status, sketch);
    }
}