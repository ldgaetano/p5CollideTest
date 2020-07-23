const sketch1 = ( s1 ) => {

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

    let requests = [];
    let commitments = [];

    s1.setup = function() {
        s1.createCanvas(600, 600);
        s1.frameRate(30);

        // generate a request
        for (let i = 0; i < 2; i++) {
            let req = new RequestCommitment(i, req_val, v1_x, v1_y, 0, req_speed, "blue", s1);
            let com = new Commitment(i, com_val, p1_x, p1_y, p1_diam, com_speed, "yellow", s1);
            requests.push(req);
            commitments.push(com);
        }
        v1 = new Verifier("V1", requests, v1_x, v1_y, v1_diam, "blue", s1);
        p1 = new Prover("P1", commitments, p1_x, p1_y, p1_diam, "yellow", s1);
        console.log(v1);
        console.log(p1);
    };

    s1.draw = function() {
        s1.background(220);

        v1.displayVerifier();
        v1.displayRequests();

        p1.displayProver();
        p1.displayCommitments();
    };

};

let p5_test= new p5(sketch1, "p5-test-canvas");