class Verifier extends Ring {
    /**
     *
     * @param {string}          name
     * @param {RequestCommit[]} requests
     * @param {number}          center_x
     * @param {number}          center_y
     * @param {number}          diameter
     * @param {string}          color
     * @param {Sketch}          sketch
     */
    constructor(name, requests, center_x, center_y, diameter, color, sketch) {
        super(name, requests, center_x, center_y, diameter, color, sketch);
        this.requests = requests;
    }

    displayVerifier() {
        this.sketch.noStroke();
        this.sketch.fill(this.color);
        this.sketch.ellipse(this.center_x, this.center_y, this.diameter, this.diameter);
    }

    displayRequests() {
        this.requests.forEach(req => {
            if(this.sketch.frameCount % 30 === 0){
                req.displayRequest();
            }
        });
    }

}