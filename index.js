const sketch1 = ( s1 ) => {

    // characters
    let characters = [];
    let provers = [];
    let verifiers = [];
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

    // requests
    let info_diam = 0;
    let info_speed = 3;
    let gen_request_color = "red";
    let user_request_name = "User Request";
    let request_i1, request_i2, request_i3, request_i4;
    let i1, i2, i3, i4;
    i1 = [0, 1, 1, 1];
    i2 = [1, 8, 1, 2];
    i3 = [2, 3, 2, 2];
    i4 = [4, 5, 2, 1];

    // temp button
    let button;
    let reset;

    s1.setup = function() {
        s1.createCanvas(600, 600);
        s1.frameRate(30);
        s1.textSize(30);

        v1 = new Verifier("V1", 0, v1_x, v1_y, char_diam, "blue", "P1", "V2", s1);
        v2 = new Verifier("V2", 1, v2_x, v2_y, char_diam, "green", "P2", "V1", s1);
        p1 = new Prover("P1", 0, p1_x, p1_y, char_diam, "yellow", "V1", "P2", s1);
        p2 = new Prover("P2", 1, p2_x, p2_y, char_diam, "black", "V2", "P1", s1);

        request_i1 = new RequestInfo("I1", 0, i1, v1.getCenterX(), v1.getCenterY(), info_diam, info_speed, v1.getColor(), s1);
        request_i2 = new RequestInfo("I2", 1, i2, v1.getCenterX(), v1.getCenterY(), info_diam, info_speed, v1.getColor(), s1);
        request_i3 = new RequestInfo("I3", 0, i3, v2.getCenterX(), v2.getCenterY(), info_diam, info_speed, v2.getColor(), s1);
        request_i4 = new RequestInfo("I4", 1, i4, v2.getCenterX(), v2.getCenterY(), info_diam, info_speed, v2.getColor(), s1);

        v1_requests = [request_i1, request_i2];
        v2_requests = [request_i3, request_i4];
        v1.addInformation(v1_requests);
        v2.addInformation(v2_requests);

        verifiers = [v1, v2];
        provers = [p1, p2];
        characters = verifiers.concat(provers);

        button = s1.createButton("GENERATE INFO AND EMIT");
        button.mouseClicked(addInfoFromButton);

        reset = s1.createButton("RESET");
        reset.mouseClicked(resetSimulation);
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
     * Generate some dummy RequestInfo instances.
     * @returns {RequestInfo}
     */
    function generateInformation() {
        return new RequestInfo(user_request_name, s1.random(), [s1.random(), s1.random(), s1.random(), s1.random()], v1.getCenterX(), v1.getCenterY(), info_diam, info_speed, gen_request_color, s1);
    }

    /**
     * Reset the simulation.
     */
    function resetSimulation() {
        s1.noLoop();
        for(let i in characters) {
            let char = characters[i];
            // Reset the position.
            char.setCenterX(char.getInitCenterX());
            char.setCenterY(char.getInitCenterY());
            // Reset the information.
            char.resetQueuedInformation();
            char.resetDisplayedInformation();
        }
        s1.loop();
    }

    /**
     * Display all of the verifiers required for the simulation.
     */
    function displayVerifiers() {
        if (verifiers.length > 0) {
            for(let i in verifiers) {
                let verifier = verifiers[i];
                verifier.displayCharacter(); // Display prover on the screen every frame.

                // Check for commits from paired provers.
                for(let j in provers) {
                    let prover = provers[j];
                    // Check if verifier and prover are linked together.
                    if (verifier.isProverLinked(prover)) {
                        verifier.scanForCommits(prover.getDisplayedInformations());
                    }
                }

                // Check for requests from paired verifiers.
                for(let k in verifiers) {
                    let compare_verifier = verifiers[k];
                    // Check if verifier pairs are linked together.
                    if (verifier.isVerifierLinked(compare_verifier)) {
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

                // Check for requests from paired verifiers.
                for(let j in verifiers) {
                    let verifier = verifiers[j];
                    // Check if prover and verifier are linked together.
                    if (prover.isVerifierLinked(verifier)) {
                        prover.scanForRequests(verifier.getDisplayedInformations()); // Scan for requests from linked verifier.
                    }
                }
                prover.emitInformation(); // Emit any corresponding commits.
            }
        }
    }

    /**
     * Function to called when mouse click is pressed.
     */
    s1.mousePressed = function() {
        if (characters.length > 0) {
            for(let i in characters) {
                characters[i].characterIsPressed();
            }
        }
    }

    /**
     * Function called when mouse click is released.
     */
    s1.mouseReleased = function() {
        for(let i in characters) {
            characters[i].characterIsReleased();
        }
    }

};

let p5_test = new p5(sketch1, "p5-test-canvas");