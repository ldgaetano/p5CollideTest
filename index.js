const sketch1 = ( s1 ) => {

    let characters = [];
    let provers = [];
    let verifiers = [];
    let requests = [];
    let commitments = [];

    // verifiers
    let v1;
    let v1_diam = 20;
    let v1_x = 100;
    let v1_y = 100;
    let req_speed = 3;
    let req_val = 2;


    // provers
    let p1;
    let p1_diam = 20;
    let p1_x = 500;
    let p1_y = 500;
    let com_speed = 3;
    let com_val = 1;

    // information
    let i1, i2, i3, i4;

    // temp button
    let button;

    s1.setup = function() {
        s1.createCanvas(600, 600);
        s1.frameRate(30);
        s1.textSize(30);
        v1 = new Character("V1", 0, 100, 100, 30, false, "blue", s1);
        p1 = new Prover("P1", 0, 500, 500, 30, "green", v1.getName(), s1);
        i1 = new Information("I1", 0, 1, v1.getCenterX(), v1.getCenterY(), 0, 3, "blue", s1);
        i2 = new Information("I2", 0, 2, v1.getCenterX(), v1.getCenterY(), 0, 3, "blue", s1);
        i3 = new Information("I3", 0, 1, v1.getCenterX(), v1.getCenterY(), 0, 3, "blue", s1);
        i4 = new Information("I4", 0, 2, v1.getCenterX(), v1.getCenterY(), 0, 3, "blue", s1);
        requests = [i1];
        v1.addInformation(requests);
        button = s1.createButton('GENERATE INFO AND EMIT');
        button.position(500, 50);
        button.mouseClicked(addInfoFromButton);
        verifiers = [v1];
        provers = [p1];
        characters = verifiers.concat(provers);
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
        return new Information("Generated Info", s1.random(), s1.random(), v1.getCenterX(), v1.getCenterY(), i1.getInitDiameter(), i1.getInformationGrowthRate(), i1.getColor(), s1);
    }

    /**
     * Display all of the verifiers required for the simulation.
     */
    function displayVerifiers() {
        if (verifiers.length > 0) {
            for(let i in verifiers) {
                let verifier = verifiers[i];
                verifier.displayCharacter();
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
                prover.displayCharacter();
                //prover.scanForRequestsAndEmitCommitments(v1.getDisplayedInformations());
                for(let j in verifiers) {
                    let verifier = verifiers[j];
                    if (prover.link == verifier.getName()) {
                        prover.scanForRequests(verifier.getDisplayedInformations());
                    }
                }
                prover.emitInformation();
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