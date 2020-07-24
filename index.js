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

    // information
    let i1;

    // temp button
    let button;

    s1.setup = function() {
        s1.createCanvas(600, 600);
        s1.frameRate(30);
        v1 = new Character("V1", 0, 100, 100, 30, "blue", s1);
        i1 = new Information("I1", 0, 1, v1.getCenterX(), v1.getCenterY(), 0, 3, "blue", s1);
        console.log(i1);
        v1.addInformation(i1);
        button = s1.createButton('GENERATE INFO AND EMIT');
        button.position(300, 100);
        button.mousePressed(addInfoFromUser);
    };

    s1.draw = function() {
        s1.background(220);
        v1.displayCharacter();
        v1.emitInformation();
    };

    function addInfoFromUser() {
        v1.addInformationFromUser(generateInformation());
    }

    function generateInformation(new_info_id) {
        let gen_info = new Information("Generated  Info", s1.random(), s1.random(), v1.getCenterX(), v1.getCenterY(), i1.getInitDiameter(), i1.getInformationGrowthRate(), i1.getColor(), s1);
        console.log(gen_info);
        return gen_info;
    }

};

let p5_test= new p5(sketch1, "p5-test-canvas");