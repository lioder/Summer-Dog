let scene,
  camera,
  renderer,
  WIDTH = window.innerWidth,
  HEIGHT = window.innerHeight,
  mouse = { x: WIDTH / 2, y: HEIGHT / 2 },
  iceCream,
  dog,
  isAttractive = false;

const ASPECT_RATIO = WIDTH / HEIGHT,
  FOV = 60,
  NEAR = 1,
  FAR = 2000,
  DEVICE_PIXEL_RATIO = window.devicePixelRatio;

const FACE_Y = 100;
function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(FOV, ASPECT_RATIO, NEAR, FAR);
  camera.position.z = 800;
  camera.position.y = 100;
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  // 开启坐标轴辅助
  // let axesHelper = new THREE.AxisHelper(200);
  // scene.add(axesHelper);

  renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
  });
  renderer.setPixelRatio(DEVICE_PIXEL_RATIO);
  renderer.setSize(WIDTH, HEIGHT);
  renderer.shadowMapEnabled = true; // 需要阴影映射

  container = document.getElementById("world");
  container.appendChild(renderer.domElement);

  window.addEventListener("resize", handleWindowResize);
  window.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("mousedown", handleMouseDown);
  window.addEventListener("mouseup", handleMouseUp);
}

function handleMouseDown() {
  isAttractive = true;
}

function handleMouseUp() {
  isAttractive = false;
}

function createLights() {
  const light = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.5);

  const shadowLight = new THREE.DirectionalLight(0xffffff, 0.8);
  shadowLight.position.set(200, 200, 200);
  shadowLight.castShadow = true;
  shadowLight.shadowDarkness = 0.2;

  const backLight = new THREE.DirectionalLight(0xffffff, 0.4);
  backLight.position.set(-100, 200, 50);
  backLight.shadowDarkness = 0.1;
  backLight.castShadow = true;

  scene.add(backLight);
  scene.add(light);
  scene.add(shadowLight);
}

function createFloor() {
  floor = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(1000, 1000),
    new THREE.MeshBasicMaterial({ color: 0xebe5e7 })
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -100;
  floor.position.z = -100;
  floor.receiveShadow = true;
  scene.add(floor);
}

class Dog {
  threegroup = new THREE.Group();
  body;
  eatTime = 0;
  constructor() {
    let brownMat = new THREE.MeshLambertMaterial({
      color: 0xb25d2d,
      shading: THREE.FlatShading
    });

    let blackMat = new THREE.MeshLambertMaterial({
      color: 0x302925,
      shading: THREE.FlatShading
    });

    let redMat = new THREE.MeshLambertMaterial({
      color: 0xad3525,
      shading: THREE.FlatShading
    });

    let whiteMat = new THREE.MeshLambertMaterial({
      color: 0xffffff,
      shading: THREE.FlatShading
    });

    let purpleMat = new THREE.MeshLambertMaterial({
      color: 0x451954,
      shading: THREE.FlatShading
    });

    let greyMat = new THREE.MeshLambertMaterial({
      color: 0x653f4c,
      shading: THREE.FlatShading
    });

    let bodyGeom = new THREE.CylinderGeometry(30, 80, 200, 4); // 上半径，下半径，高度，底面的边数
    let faceGeom = new THREE.BoxGeometry(100, 100, 100);
    let spotGeom = new THREE.BoxGeometry(4, 4, 4);
    let earGeom = new THREE.BoxGeometry(70, 7, 20);
    let noseGeom = new THREE.BoxGeometry(30, 30, 20);
    let eyeGeom = new THREE.BoxGeometry(5, 30, 30);
    let irisGeom = new THREE.BoxGeometry(4, 10, 10);
    let mouthGeom = new THREE.BoxGeometry(30, 20, 10);
    let tongueGeom = new THREE.BoxGeometry(20, 5, 70);
    let lipsGeom = new THREE.BoxGeometry(40, 15, 20);
    let kneeGeom = new THREE.BoxGeometry(25, 80, 80);
    kneeGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 50, 0));

    let footGeom = new THREE.BoxGeometry(40, 20, 20);

    // body
    this.body = new THREE.Mesh(bodyGeom, brownMat);
    this.body.position.z = -60;
    this.body.position.y = 0;

    // face
    this.face = new THREE.Mesh(faceGeom, brownMat);
    this.face.position.z = 20;
    this.face.position.y = FACE_Y;

    // spots
    this.spot1 = new THREE.Mesh(spotGeom, blackMat);
    this.spot1.position.x = 50;
    this.spot1.position.z = 50;
    this.spot1.position.y = FACE_Y - 30;

    this.spot2 = this.spot1.clone();
    this.spot2.position.z = 60;
    this.spot2.position.y = FACE_Y - 30;

    this.spot3 = this.spot1.clone();
    this.spot3.position.z = 40;
    this.spot3.position.y = FACE_Y - 40;

    this.spot4 = this.spot1.clone();
    this.spot4.position.z = 50;
    this.spot4.position.y = FACE_Y - 40;

    this.spot5 = this.spot1.clone();
    this.spot5.position.x = -50;
    this.spot6 = this.spot2.clone();
    this.spot6.position.x = -50;
    this.spot7 = this.spot3.clone();
    this.spot7.position.x = -50;
    this.spot8 = this.spot4.clone();
    this.spot8.position.x = -50;

    // eyes
    this.leftEye = new THREE.Mesh(eyeGeom, whiteMat);
    this.leftEye.position.x = 50;
    this.leftEye.position.z = 30;
    this.leftEye.position.y = FACE_Y + 25;

    this.rightEye = new THREE.Mesh(eyeGeom, whiteMat);
    this.rightEye.position.x = -50;
    this.rightEye.position.z = 30;
    this.rightEye.position.y = this.leftEye.position.y;

    // iris
    this.leftIris = new THREE.Mesh(irisGeom, purpleMat);
    this.leftIris.position.x = 53;
    this.leftIris.position.z = 50;
    this.leftIris.position.y = FACE_Y + 25;

    this.rightIris = new THREE.Mesh(irisGeom, purpleMat);
    this.rightIris.position.x = -53;
    this.rightIris.position.z = 50;
    this.rightIris.position.y = this.leftIris.position.y;

    // mouth
    this.mouth = new THREE.Mesh(mouthGeom, blackMat);
    this.mouth.position.z = 70;
    this.mouth.position.y = FACE_Y - 30;
    this.mouth.scale.set(0.5, 0.5, 1);

    this.tongue = new THREE.Mesh(tongueGeom, redMat);
    this.tongue.position.z = 61;
    this.tongue.position.y = this.mouth.position.y;
    this.tongue.scale.set(0.5, 0.5, 1);
    this.tongue.rotation.x = Math.PI / 8;

    // lips
    this.lips = new THREE.Mesh(lipsGeom, brownMat);
    this.lips.position.z = 60;
    this.lips.position.y = FACE_Y - 40;

    // ear
    this.rightEar = new THREE.Mesh(earGeom, brownMat);
    this.rightEar.position.x = -50;
    this.rightEar.position.y = FACE_Y + 60;
    this.rightEar.position.z = -20;

    this.leftEar = new THREE.Mesh(earGeom, brownMat);
    this.leftEar.position.x = 50;
    this.leftEar.position.y = this.rightEar.position.y;
    this.leftEar.position.z = -20;

    // nose
    this.nose = new THREE.Mesh(noseGeom, greyMat);
    this.nose.position.z = 70;
    this.nose.position.y = FACE_Y + 40;

    // head
    this.head = new THREE.Group();
    this.head.add(this.face);
    this.head.add(this.spot1);
    this.head.add(this.spot2);
    this.head.add(this.spot3);
    this.head.add(this.spot4);
    this.head.add(this.spot5);
    this.head.add(this.spot6);
    this.head.add(this.spot7);
    this.head.add(this.spot8);
    this.head.add(this.leftEye);
    this.head.add(this.rightEye);
    this.head.add(this.leftIris);
    this.head.add(this.rightIris);
    this.head.add(this.mouth);
    this.head.add(this.tongue);
    this.head.add(this.lips);
    this.head.add(this.nose);
    this.head.add(this.leftEar);
    this.head.add(this.rightEar);

    // knee
    this.leftKnee = new THREE.Mesh(kneeGeom, brownMat);
    this.leftKnee.position.x = 65;
    this.leftKnee.position.z = -20;
    this.leftKnee.position.y = -110;
    this.leftKnee.rotation.z = -0.3;

    this.rightKnee = new THREE.Mesh(kneeGeom, brownMat);
    this.rightKnee.position.x = -65;
    this.rightKnee.position.z = -20;
    this.rightKnee.position.y = -110;
    this.rightKnee.rotation.z = 0.3;

    // feet
    this.backLeftFoot = new THREE.Mesh(footGeom, brownMat);
    this.backLeftFoot.position.z = 30;
    this.backLeftFoot.position.x = 75;
    this.backLeftFoot.position.y = -90;

    this.backRightFoot = new THREE.Mesh(footGeom, brownMat);
    this.backRightFoot.position.z = 30;
    this.backRightFoot.position.x = -75;
    this.backRightFoot.position.y = -90;

    this.frontRightFoot = new THREE.Mesh(footGeom, brownMat);
    this.frontRightFoot.position.z = 40;
    this.frontRightFoot.position.x = -22;
    this.frontRightFoot.position.y = -90;

    this.frontLeftFoot = new THREE.Mesh(footGeom, brownMat);
    this.frontLeftFoot.position.z = 40;
    this.frontLeftFoot.position.x = 22;
    this.frontLeftFoot.position.y = -90;

    this.threegroup.add(this.body);
    this.threegroup.add(this.head);
    this.threegroup.add(this.leftKnee);
    this.threegroup.add(this.rightKnee);
    this.threegroup.add(this.backLeftFoot);
    this.threegroup.add(this.backRightFoot);
    this.threegroup.add(this.frontRightFoot);
    this.threegroup.add(this.frontLeftFoot);

    this.threegroup.traverse(object => {
      if (object instanceof THREE.Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
      }
    });
  }

  eat = (xTarget, yTarget) => {
    this.tHeagRotY = -convertToRange(
      xTarget,
      [-200, 200],
      [Math.PI / 4, -Math.PI / 4]
    );
    this.tHeadRotX = convertToRange(
      yTarget,
      [-200, 200],
      [Math.PI / 4, -Math.PI / 4]
    );
    this.tHeadPosX = -convertToRange(xTarget, [-200, 200], [20, -20]);
    this.tHeadPosY = convertToRange(yTarget, [-140, 260], [40, 60]);
    this.tHeadPosZ = 30;

    this.tEyeScale = 0.1;
    this.tIrisYScale = 0.1;
    this.tIrisZScale = 3;

    this.tMouthPosZ = 75;

    this.tRightKneeRotZ = convertToRange(
      xTarget,
      [-200, 200],
      [0.3 + Math.PI / 8, 0.3 - Math.PI / 8]
    );
    this.tLeftKneeRotZ = convertToRange(
      xTarget,
      [-200, 200],
      [-0.3 + Math.PI / 8, -0.3 - Math.PI / 8]
    );

    this.update();

    let dt = 20000 / (xTarget * xTarget + yTarget * yTarget);
    dt = Math.max(Math.min(dt, 1), 0.5);
    this.eatTime += dt;

    this.leftEar.rotation.x = ((Math.cos(this.eatTime) * Math.PI) / 16) * dt;
    this.rightEar.rotation.x = ((-Math.cos(this.eatTime) * Math.PI) / 16) * dt;
    this.tongue.rotation.x = ((-Math.cos(this.eatTime) * Math.PI) / 16) * dt;
  };

  update = () => {
    const speed = 10;

    this.head.rotation.y += (this.tHeagRotY - this.head.rotation.y) / speed;
    this.head.rotation.x += (this.tHeadRotX - this.head.rotation.x) / speed;
    this.head.position.x += (this.tHeadPosX - this.head.position.x) / speed;
    this.head.position.y += (this.tHeadPosY - this.head.position.y) / speed;
    this.head.position.z += (this.tHeadPosZ - this.head.position.z) / speed;

    this.leftEye.scale.y +=
      (this.tEyeScale - this.leftEye.scale.y) / (speed * 2);
    this.rightEye.scale.y = this.leftEye.scale.y;

    this.leftIris.scale.y +=
      (this.tIrisYScale - this.leftIris.scale.y) / (speed * 2);
    this.rightIris.scale.y = this.leftIris.scale.y;

    this.leftIris.scale.z +=
      (this.tIrisZScale - this.leftIris.scale.z) / (speed * 2);
    this.rightIris.scale.z = this.leftIris.scale.z;

    this.leftIris.position.z +=
      (this.tLeftIrisPosZ - this.leftIris.position.z) / speed;
    this.rightIris.position.z +=
      (this.tRightIrisPosZ - this.rightIris.position.z) / speed;

    this.rightKnee.rotation.z +=
      (this.tRightKneeRotZ - this.rightKnee.rotation.z) / speed;
    this.leftKnee.rotation.z +=
      (this.tLeftKneeRotZ - this.leftKnee.rotation.z) / speed;

    this.lips.position.x += (this.tLipsPosX - this.lips.position.x) / speed;
    this.lips.position.y += (this.tLipsPosY - this.lips.position.y) / speed;
    this.tongue.rotation.x += (Math.PI / 16 - this.tongue.rotation.x) / speed;
    this.leftEar.rotation.x += (0 - this.leftEar.rotation.x) / speed;
    this.rightEar.rotation.x += (0 - this.rightEar.rotation.x) / speed;
  };

  look = (xTarget, yTarget) => {
    this.tHeagRotY = convertToRange(
      xTarget,
      [-200, 200],
      [-Math.PI / 4, Math.PI / 4]
    );
    this.tHeadRotX = -convertToRange(
      yTarget,
      [-200, 200],
      [-Math.PI / 4, Math.PI / 4]
    );
    this.tHeadPosX = convertToRange(xTarget, [-200, 200], [0, 0]);
    this.tHeadPosY = convertToRange(yTarget, [-200, 200], [30, 40]);
    this.tHeadPosZ = -10;

    this.tEyeScale = 1;
    this.tIrisYScale = 1;
    this.tIrisZScale = 1;
    this.tIrisPosY = convertToRange(yTarget, [-200, 200], [75, 75]);
    this.tLeftIrisPosZ = convertToRange(xTarget, [-200, 200], [20, 20]);
    this.tRightIrisPosZ = convertToRange(xTarget, [-200, 200], [20, 20]);

    this.tLipsPosX = 0;
    this.tLipsPosY = FACE_Y - 55;

    this.tRightKneeRotZ = convertToRange(
      xTarget,
      [-200, 200],
      [0.3 - Math.PI / 8, 0.3 + Math.PI / 8]
    );
    this.tLeftKneeRotZ = convertToRange(
      xTarget,
      [-200, 200],
      [-0.3 - Math.PI / 8, -0.3 + Math.PI / 8]
    );

    this.update();
  };
}
class IceCream {
  threegroup = new THREE.Group();
  cream;
  bar;
  constructor() {
    let creamGeom = new THREE.BoxGeometry(45, 20, 5);
    let barGeom = new THREE.BoxGeometry(15, 5, 2);
    let yellowMat = new THREE.MeshLambertMaterial({
      color: 0xfdd276,
      shading: THREE.FlatShading
    });

    let orangeMat = new THREE.MeshLambertMaterial({
      color: 0xff5535,
      shading: THREE.FlatShading
    });

    const bar = new THREE.Mesh(barGeom, yellowMat);
    const cream = new THREE.Mesh(creamGeom, orangeMat);
    bar.position.x = -30;
    bar.position.z = 0;
    cream.position.z = 0;
    cream.scale.x = 1; // 用于消耗动画

    this.cream = cream;
    this.bar = bar;

    this.threegroup.add(bar);
    this.threegroup.add(cream);
  }

  update = (xTarget, yTarget) => {
    const speed = 10;
    this.threegroup.lookAt(new THREE.Vector3(0, 75, 75)); // 朝向嘴的位置

    let tPosX = convertToRange(xTarget, [-200, 200], [-250, 250]);
    let tPosY = convertToRange(yTarget, [-200, 200], [-100, 250]);

    this.threegroup.position.x += (tPosX - this.threegroup.position.x) / speed;
    this.threegroup.position.y += (tPosY - this.threegroup.position.y) / speed;
  };

  consume = () => {
    const speed = 200;
    if (
      Math.abs(this.threegroup.position.x - -9) < 20 &&
      Math.abs(this.threegroup.position.y - 122) < 20
    ) {
      this.cream.scale.x += (0 - this.cream.scale.x) / speed;
      if (this.cream.scale.x < 0.15) {
        this.cream.material.visible = false;
        this.bar.material.visible = false;
      } else {
        this.bar.position.x += 14 / speed;
      }
    }
  };
}

function createDog() {
  dog = new Dog();
  scene.add(dog.threegroup);
}

function createIceCream() {
  iceCream = new IceCream();
  iceCream.threegroup.position.z = 130;
  scene.add(iceCream.threegroup);
}

function loop() {
  renderer.render(scene, camera);

  // 原点迁移
  let xTarget = mouse.x - WIDTH / 2;
  let yTarget = HEIGHT / 2 - mouse.y;

  iceCream.update(xTarget, yTarget); // 更新 ice-cream 位置

  if (isAttractive) {
    dog.eat(xTarget, yTarget);
    iceCream.consume();
  } else {
    dog.look(xTarget, yTarget);
  }

  requestAnimationFrame(loop);
}

function handleWindowResize() {
  WIDTH = window.innerWidth;
  HEIGHT = window.innerHeight;
  renderer.setSize(WIDTH, HEIGHT);
  camera.aspect = WIDTH / HEIGHT;
  camera.updateProjectionMatrix();
}

function handleMouseMove(event) {
  mouse = { x: event.clientX, y: event.clientY };
}

init();
createLights();
createFloor();
createDog();
createIceCream();
loop();

function convertToRange(value, srcRange, dstRange) {
  value = Math.max(Math.min(value, srcRange[1]), srcRange[0]);

  var srcMax = srcRange[1] - srcRange[0],
    dstMax = dstRange[1] - dstRange[0],
    adjValue = value - srcRange[0];

  return (adjValue * dstMax) / srcMax + dstRange[0];
}
