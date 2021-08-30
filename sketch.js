var PLAY = 1;
var END = 0;
var gameState = PLAY;

var cat, cat_running, cat_collided;
var puddle, treat, crate, cactus;
var bgImg, ground;
var obstaclesGroup;

var score = 0;

var gameOver, restart;

function preload() {
    cat_running = loadAnimation("images/cat.gif");
    cat_collided = loadAnimation("cat7.jpg");
    bgImg = loadImage("images/background2.png");
    
    puddle = loadImage("images/puddle.jpeg");
    crate = loadImage("images/crate1.jpeg");
    cactus = loadImage("images/cactus.jpeg");
    treat = loadImage("images/treat.jpeg");

    gameOverImg = loadImage("images/gameover.png");
    restartImg = loadImage("images/restart.png");
}

function setup() {
    var canvas = createCanvas(600, 200);
    
    cat = new Cat(50, 180, 20, 50);

    cat.addAnimation("running", cat_running);

    ground = createSprite(200, 180, 400, 20);
    ground.shapeColor = "green";
    ground.x = ground.width /2;
    ground.velocityX = -(6 + 3*score/100);

    gameOver = createSprite(300, 100);
    gameOver.addImage(gameOverImg);

    restart = createSprite(300, 140);
    restart.addImage(restartImg);


    restart.scale = 0.5;

    gameOver.visible = false;
    restart.visible = false;

    obstaclesGroup = new Group();

    score = 0;
}

function draw() {
    background(bgImg);
    text("Score: "+ score, 500,  50);
    
    cat.display();
    obstacle.display
    if(gameState === PLAY) {
        score = score + Math.round(getFramedRate()/60);
        ground.velocityX = -(6 + 3*score/100);

        if(keyDown("space") && cat.y >= 159) {
            cat.velocityY = -12;
        }

        cat.velocityY = cat.velocityY + 0.8;

        if(ground.x <0) {
            ground.x = ground.width/2;
        }

        spawnObstacles();

        if(obstaclesGroup.isTouching(cat)) {
            gameState = END;
        }
    }
    else if (gameState === END) {
        gameOver.visible = true;
        restart.visible = true;

        ground.velocityX = 0;
        cat.velocityY = 0;
        obstaclesGroup.setVelocityXEach(0);

        cat.changeAnimation("collided",trex_collided);

        obstaclesGroup.setLifetimeEach(-1);

        if(mousePressedOver(restart)) {
            reset();
        }
    }
    drawSprites();
}

function spawnObstacles() {
    if(frameCount % 60 === 0) {
        var obstacle = new Obstacle(600,165,10,40);
        obstacle.velocityX = -(6 + 3*score/100);

        var rand = Math.round(random(1,3));
        switch(rand) {
            case 1: obstacle.addImage(puddle);
                    break;
            case 2: obstacle.addImage(crate);
                    break;
            case 3: obstacle.addImage(cactus);
                    break;
            default: break;
        }

        obstacle.scale = 0.5;
        obstacle.lifetime = 300;

        obstaclesGroup.add(obstacle);
    }
}

function reset() {
    gameState = PLAY;
    gameOver.visible = false;
    restart.visible = false;

    obstaclesGroup.destroyEach();
    
    cat.changeAnimation("running",cat_running);
    score = 0;
}
