class Prover extends Character {

    link;

    /**
     * Constructor for Character instance.
     * @param {string} name
     * @param {number} id
     * @param {number} center_x
     * @param {number} center_y
     * @param {number} diameter
     * @param {string} color
     * @param {string} link
     * @param {Object} sketch
     */
    constructor(name, id, center_x, center_y, diameter, color, link, sketch) {
        super(name, id, center_x, center_y, diameter, true, color, sketch);
        this.link = link;
    }

    /**
     * Method to scan for Verifier requests and emit Prover commitments.
     * @param {Information[]} requests
     */
    scanForRequests(requests) {
        for(let i in requests) {
           let request = requests[i];
           if (this.checkProver2RequestCollision(request)) {
                let commit = this.generateCommitFromRequest(request);
                this.addSingleInformation(commit);
           }
        }
    }

    /**
     * Method to check if current Prover instance is being reached by an Information instance
     * @param  {Information} request
     * @return {boolean}
     */
    checkProver2RequestCollision(request) {
        // Check if collision has occurred.
        return this.getSketch().collideCircleCircle(this.getCenterX(), this.getCenterY(), this.getDiameter(), request.getCenterX(), request.getCenterY(), request.getDiameter());

    }

    /**
     * Generate Commit instance from Request information.
     * @param   {Information} request
     * @returns {Information}
     */
    generateCommitFromRequest(request) {
        return new Information("Commit from Request", request.getID(), this.generateCommitValue(request), this.getCenterX(), this.getCenterY(), 0, 3, this.getColor(), this.getSketch());
    }


    /**
     * Generate corresponding Prover commit value from Verifier request.
     * @param {Information} request
     */
    generateCommitValue(request) {
        //TODO: Write proper implementation of this function.
        return request.getInformationVal();
    }

}