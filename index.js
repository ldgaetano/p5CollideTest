const sketch1 = ( s1 ) => {
    let ring, ring2;

    s1.setup = function() {
        s1.createCanvas(600, 600);
        s1.frameRate(30);
        ring = new Ring(getRandomVal(), getRandomVal(), 0, 1, "orange", s1);
        ring2 = new Ring(getRandomVal(), getRandomVal(), 0, 1, "red", s1);
    };

    s1.draw = function() {
        s1.background(220);
        s1.fill(0);
        ring.update_ring(100, 100);
        ring.check_ring2ring_collision(ring2);
        ring2.update_ring(500, 500);
    };

    function getRandomVal() {
        return s1.random();
    }


    //let ring = new Ring(getID(), getID(), 0, 5, "orange");
};

let p5_test= new p5(sketch1, "p5-test-canvas");