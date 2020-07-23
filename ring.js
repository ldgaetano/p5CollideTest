class Ring {

    /**
     *
     * @param {*}            id
     * @param {(int|Array)}  ring_val
     * @param {number}       center_x
     * @param {number}       center_y
     * @param {number}       diameter
     * @param {string}       color
     * @param {Sketch}       sketch
     */
    constructor(id, ring_val, center_x, center_y, diameter, color, sketch) {
        this.id = id;
        this.ring_val = ring_val;
        this.center_x = center_x;
        this.center_y = center_y;
        this.diameter = diameter;
        this.color = color;
        this.ring_hit_status = false;
        this.sketch = sketch;
    }

    /**
     *
     * @param {Ring}   target_ring Ring that is going to be collided with.
     * @param {string} new_color   Color to change current ring instance once target is reached.
     */
    check_ring2ring_collision(target_ring, new_color) {
        this.ring_hit_status = this.sketch.collideCircleCircle(this.center_x, this.center_y, this.diameter, target_ring.center_x, target_ring.center_y, target_ring.diameter);

        if (this.ring_hit_status) {
            this.color = this.sketch.color(new_color);
        }
    }

}