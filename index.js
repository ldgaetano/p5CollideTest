const sketch1 = ( s1 ) => {

    let characters = [];
    let provers = [];
    let verifiers = [];
    let commitments = [];

    // characters
    let char_diam = 30;

    // verifiers
    let v1, v2;
    let v1_x = 100;
    let v1_y = 100;
    let v2_x = 550;
    let v2_y = 550;
    let v1_requests = [];
    let v2_requests = [];


    // provers
    let p1, p2;
    let p1_x = 150;
    let p1_y = 150;
    let p2_x = 500;
    let p2_y = 500;

    // information
    let info_diam = 0;
    let info_speed = 3;
    let i1, i2, i3, i4;

    // temp button
    let button;

    s1.setup = function() {
        s1.createCanvas(600, 600);
        s1.frameRate(30);
        s1.textSize(30);

        v1 = new Verifier("V1", 0, v1_x, v1_y, char_diam, "blue", "P1", "V2", s1);
        v2 = new Verifier("V2", 1, v2_x, v2_y, char_diam, "green", "P2", "V1", s1);
        p1 = new Prover("P1", 0, p1_x, p1_y, char_diam, "yellow", "V1", "P2", s1);
        p2 = new Prover("P2", 1, p2_x, p2_y, char_diam, "black", "V2", "P1", s1);

        i1 = new Information("I1", 0, 1, v1.getCenterX(), v1.getCenterY(), info_diam, info_speed, "blue", s1);
        i2 = new Information("I2", 1, 2, v1.getCenterX(), v1.getCenterY(), info_diam, info_speed, "blue", s1);
        i3 = new Information("I3", 0, 1, v2.getCenterX(), v2.getCenterY(), info_diam, info_speed, "blue", s1);
        i4 = new Information("I4", 1, 2, v2.getCenterX(), v2.getCenterY(), info_diam, info_speed, "blue", s1);

        v1_requests = [i1, i2];
        v2_requests = [i3, i4];
        v1.addInformation(v1_requests);
        v2.addInformation(v2_requests);

        verifiers = [v1, v2];
        provers = [p1, p2];
        characters = verifiers.concat(provers);

        button = s1.createButton('GENERATE INFO AND EMIT');
        button.mouseClicked(addInfoFromButton);
    };

    s1.draw = function() {
        s1.background(220);
        s1.text(s1.frameCount, 500, 50);
        displayVerifiers();
        displayProvers();
    };

    /**
     * Generate and emit Information from Character instance when clicking on button.
     */
    function addInfoFromButton() {
        v1.addSingleInformationFromUser(generateInformation());
    }

    /**
     * Generate some dummy Information instances.
     * @returns {Information}
     */
    function generateInformation() {
        return new Information("Generated Info", s1.random(), s1.random(), v1.getCenterX(), v1.getCenterY(), i1.getInitDiameter(), i1.getInformationGrowthRate(), "red", s1);
    }

    /**
     * Display all of the verifiers required for the simulation.
     */
    function displayVerifiers() {
        if (verifiers.length > 0) {
            for(let i in verifiers) {
                let verifier = verifiers[i];
                verifier.displayCharacter(); // Display prover on the screen every frame.
                for(let j in provers) {
                    let prover = provers[j];
                    // Check if verifier and prover are linked together.
                    if (verifier.getName() === prover.getVerifierLink()) {
                        verifier.scanForCommits(prover.getDisplayedInformations());
                    }
                }

                // Check for requests from paired verifiers.
                for(let k in verifiers) {
                    let compare_verifier = verifiers[k];
                    // Check if verifier pairs are linked together.
                    if (verifier.getName() === compare_verifier.getVerifierLink()) {
                        verifier.scanForPairedRequests(compare_verifier.getDisplayedInformations());
                    }
                }
                verifier.emitInformation();
            }
        }
    }


    /**
     * Display all provers required for the simulation.
     */
    function displayProvers() {
        if(provers.length > 0) {
            for(let i in provers) {
                let prover = provers[i];
                prover.displayCharacter(); // Display prover on the screen every frame.
                for(let j in verifiers) {
                    let verifier = verifiers[j];
                    // Check if prover and verifier are linked together.
                    if (prover.getName() === verifier.getProverLink()) {
                        prover.scanForRequests(verifier.getDisplayedInformations()); // Scan for requests from linked verifier.
                    }
                }
                prover.emitInformation(); // Emit any corresponding commits.
            }
        }
    }

    s1.mousePressed = function() {
        if (characters.length > 0) {
            for(let i in characters) {
                characters[i].characterIsPressed();
            }
        }
    }

    s1.mouseReleased = function() {
        for(let i in characters) {
            characters[i].characterIsReleased();
        }
    }

};

let p5_test= new p5(sketch1, "p5-test-canvas");