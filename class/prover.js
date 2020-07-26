class Prover extends Character {

    /**
     * Constructor for Character instance.
     * @param {string} name
     * @param {number} id
     * @param {number} center_x
     * @param {number} center_y
     * @param {number} diameter
     * @param {string} color
     * @param {string} verifier_link
     * @param {string} prover_link
     * @param {Object} sketch
     */
    constructor(name, id, center_x, center_y, diameter, color, verifier_link, prover_link, sketch) {
        super(name, id, center_x, center_y, diameter, true, color, [verifier_link, prover_link], sketch);
    }

    /**
     * Method to scan for Verifier requests and emit Prover commitments.
     * @param {Information[]} requests
     */
    scanForRequests(requests) {
        if (requests.length > 0) {
            for(let i in requests) {
                let request = requests[i];
                // Check if request has reached prove.
                if (this.checkRing2RingCollision(request)) {
                    // Generate a corresponding commit
                    let commit = this.generateCommitFromRequest(request);
                    // Add commit to queue to be displayed.
                    this.addSingleInformation(commit);
                }
            }
        }
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


    /**
     * Get Verifier link associated to current Prover instance.
     * @returns {string}
     */
    getVerifierLink() {
        return this.getCharacterLinks()[0];
    }

    /**
     * Get Prover link associated to current Prover instance.
     * @returns {string}
     */
    getProverLink() {
        return this.getCharacterLinks()[1];
    }

}