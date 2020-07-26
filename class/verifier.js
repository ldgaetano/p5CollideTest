class Verifier extends Character {

    /**
     * Constructor for Character instance.
     * @param {string} name
     * @param {number} id
     * @param {number} center_x
     * @param {number} center_y
     * @param {number} diameter
     * @param {string} color
     * @param {string} prover_link
     * @param {string} verifier_link
     * @param {Object} sketch
     */
    constructor(name, id, center_x, center_y, diameter, color, prover_link, verifier_link, sketch) {
        super(name, id, center_x, center_y, diameter, false, color, [prover_link, verifier_link], sketch);
    }

    /**
     * Method to scan for Verifier requests and emit Prover commitments.
     * @param {Information[]} commits
     */
    scanForCommits(commits) {
        if (commits.length > 0) {
            for(let i in commits) {
                let commit = commits[i];
                // Check if commit has reached corresponding verifier.
                if (this.checkRing2RingCollision(commit)) {
                    // Remove displayed request from the screen.
                    this.removeDisplayedInformation(this.getDisplayedInformation(commit.getID()));
                    // Remove displayed commit from the screen.
                    commits.splice(commits.indexOf(commit), 1);
                }
            }
        }
    }

    /**
     * Scan for requests from Verifier pair.
     * @param {Information[]} requests
     */
    scanForPairedRequests(requests) {
        if (requests.length > 0) {
            for(let i in requests) {
                let request = requests[i];
                // Check if request has reached linked verifier.
                if (this.checkRing2RingCollision(request)) {
                    this.stopSimulation();
                }
            }
        }
    }

    /**
     * Stop the simulation.
     */
    stopSimulation() {
        this.getSketch().noLoop();
    }

    /**
     * Get Verifier link associated to current Prover instance.
     * @returns {string}
     */
    getProverLink() {
        return this.getCharacterLinks()[0];
    }

    /**
     * Get Prover link associated to current Prover instance.
     * @returns {string}
     */
    getVerifierLink() {
        return this.getCharacterLinks()[1];
    }

}