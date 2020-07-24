class Prover extends Ring {

    /**
     *
     * @param {string}       name
     * @param {Commit[]} commitments
     * @param {number}       center_x
     * @param {number}       center_y
     * @param {number}       diameter
     * @param {string}       color
     * @param {Sketch}       sketch
     */
    constructor(name, commitments, center_x, center_y, diameter, color, sketch) {
        super(name, commitments, center_x, center_y, diameter, color, sketch);
        this.commitments = commitments;
    }

    displayProver() {
        this.sketch.noStroke();
        this.sketch.fill(this.color);
        this.sketch.ellipse(this.center_x, this.center_y, this.diameter, this.diameter);
    }

    displayCommitments() {
        this.commitments.forEach(com => {
            com.displayCommitment();
        });
    }


}