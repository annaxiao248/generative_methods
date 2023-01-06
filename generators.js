const GENERATORS = {
   
  flowers: {
    description:
      "make your own flower!",
    sliders: ["size", "aspectRatio", "angle", "hue", "brightness", "petals"],
    landmarks: {
      pumpkin: [1.00,1.00,1.00,0.48,0.04,0.30],
      sunshine: [1.00,-0.50,0.00,0.78,0.40,0.44],
      scarlet: [0.12,1.00,0.60,0.00,0.00,0.10],
      peach: [0.94,0.34,0.00,0.64,0.66,0.14],
      daisy: [0.30,0.24,0.99,1.00,0.22,0.14],
    },

    setup(p) {},
    
    drawBackground(p, t) {
      p.background("#cae9ff");
  
    },
   
    draw(p, t, dna) {
      
      let x = 0;
      let y = 0;
      
      let size = dna[0] * 10 + 5;
      let aspectRatio = dna[1] + 0.6;
      let angle = dna[2] - 0.5;

      // How about a little bounce
      let bounce = Math.abs(Math.sin(t * 3));
      aspectRatio += 0.2 + -0.5 * bounce;
      let stickiness = 0.2;
      let jumpHeight = 40;
      y -= Math.max(
         0,
         jumpHeight * (Math.abs(Math.sin(t * 3 + 0.2)) - stickiness)
       );
      angle = p.lerp(0, angle, bounce);

      let w = size * aspectRatio;
      let h = size * (1 / aspectRatio);

      let hue = dna[3] * 30 +15;
      let brightness = dna[4] * 60 + 40;
      let petals = dna[5] * 20 +6;
      
      p.rotate(angle*0.3);
      p.textSize(100);
      p.text("🌿", -50, 0);
      

      p.push();

      p.translate(x, y-80);
      p.rotate(angle);

      p.fill(hue, 100, brightness);
      p.stroke(hue, 100, brightness + 30);
      p.noStroke();
      
      //flowers
      for (let i = 0; i < petals; i ++) {
        p.ellipse(0, 25, w, h*2);
        p.rotate(p.PI/(petals/2));
      }

      p.pop();
    },
  },
  
  duckParty: {
    description:
      "time for a duck party",
    sliders: ["duckSize", "partyHat", "angle", "hue", "brightness", "hatHue"],
    landmarks: {
      bigBlue: [1.75,0.00,0.74,6.5,0.3,0.94],
      mamaDuck: [1.00,0.00,0.38,0.66,1.00,0.80],
      babyDuck: [-0.1,0.00,1.00,1.00,0.65, 0],
      partyDuck: [0.60,0.64,0.20,0.14,0.74,0.88],
      rubberDuck: [0.60,0.00,0.72,1.00,0.16,0.78],
    },

    setup(p) {},
    drawBackground(p, t) {
      p.background("#62b6cb");

      p.noStroke();

      for (var j = 0; j < 5; j++) {
        p.fill(200 + j , 190, 90, 0.5);
        p.beginShape();
        let y = 225;
        p.vertex(0, 0);
        p.vertex(0, 0);
        p.vertex(0, y);
        // Ripply vertices
        let waveCount = 10;
        for (var i = 0; i < waveCount; i++) {
          let x = (i + 0.5) * (p.width / waveCount);
          let y2 = y + 100 * p.noise(i, t + j * 10);
          p.curveVertex(x, y2);
        }
        p.vertex(p.width, y);
        p.vertex(p.width, 0);
        p.vertex(p.width, 0);
        p.endShape();
      }
    },

    draw(p, t, dna) {
      
      let x = 0;
      let y = 0;

      let size = dna[0] * 10 + 5;
      let aspectRatio = dna[1] + 0.6;
      let angle = dna[2] - 0.5;

      // How about a little bounce at least?
      let bounce = Math.abs(Math.sin(t * 3));
      aspectRatio += 0.2 + -0.5 * bounce;
      let stickiness = 0.2;
      let jumpHeight = 40;
      y -= Math.max(
         0,
         jumpHeight * (Math.abs(Math.sin(t * 3 + 0.2)) - stickiness)
       );
      angle = p.lerp(0, angle, bounce);

      let w = size * aspectRatio;
      let h = size * (1 / aspectRatio);

      let hue = dna[3] * 30 + 20;
      let hatHue = dna[5] * 150+70;
      
      let brightness = dna[4] * 45 +45;
      let duckSize = dna[0] * 20 + 15;
      let partyHat = dna[1] * 75;
      let coneWidth = duckSize + 0.1

      p.push();

      p.translate(x, y - 100);
      p.rotate(angle);

      p.fill(hue, 100, brightness);
      //p.stroke(hue, 100, brightness + 30);
      p.noStroke()
      
      //draw bill
      p.push();
      p.fill("#fb8500");
      p.translate(-duckSize, -duckSize * 0.2);
      p.rotate(-5);
      p.ellipse(0, 0, duckSize/2, duckSize/5);
      p.rotate(5);
      p.ellipse(0, 10, duckSize/2, duckSize/5);
      p.pop();
      
      //draw hat
      p.push();
      p.fill(hatHue, 100, brightness/2);
      p.triangle(-duckSize/2, 0, 0, -partyHat, duckSize/2, 0)
      p.pop();
      
      //draw head and body
      p.push();
      p.fill(hue, 100, brightness);
      p.circle(0, 0, duckSize);
      p.translate(duckSize, duckSize*2 + 5);
      p.ellipse(0, 0, duckSize*2, duckSize*1.5);
      p.pop();

      // Draw an eye
      p.push();
      p.translate(-duckSize * 0.2, -duckSize * 0.2);
      p.fill(0);
      p.circle(0, 0, duckSize/4);
      p.fill(80);
      p.circle(1, 1.8, duckSize/10);
      p.fill(100);
      p.circle(0.5, -1.5, duckSize/8);
      p.pop();
      
    
      p.pop();
    },
  },
  
  
  
 
};
