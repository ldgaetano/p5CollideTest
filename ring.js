class Ring {

    /**
     *
     * @param {*}            id
     * @param {(int|Array)}  ring_val
     * @param {float}        center_x
     * @param {float}        center_y
     * @param {float}        diameter
     * @param {int}          color
     * @param {boolean}      [ring_hit_status=false]
     * @param {Sketch}       sketch
     */
    constructor(id, ring_val, center_x, center_y, diameter, color, ring_hit_status=false, sketch) {
        this.id = id;
        this.emit_val = emit_val;
        this.center_x = center_x;
        this.center_y = center_y;
        this.diameter = diameter;
        this.color = color;
        this.ring_hit_status = ring_hit_status;
        this.sketch = sketch;
    }

    /**
     *
     * @param {Ring} target_ring Ring that is going to be collided with.
     */
    check_ring2ring_collision(target_ring) {
        this.ring_hit_status = this.sketch.collideCircleCircle(this.center_x, this.center_y, this.diameter, target_ring.center_x, target_ring.center_y, target_ring.diameter);

        if (this.ring_hit_status) {
            this.color = this.sketch.color(0);
        }
    }

}