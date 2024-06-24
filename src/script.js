import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import TextSprite from "@seregpie/three.text-sprite";

/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const textureGrassNormal = textureLoader.load("/textures/grass/normal.jpg");
const textureGrassColor = textureLoader.load("/textures/grass/color.jpg");
const textureGrassRoughness = textureLoader.load(
  "/textures/grass/roughness.jpg"
);
const textureGrassAmb = textureLoader.load(
  "/textures/grass/ambientOcclusion.jpg"
);

const texturebricksNormal = textureLoader.load("/textures/bricks/normal.jpg");
const texturebricksColor = textureLoader.load("/textures/bricks/color.jpg");
const texturebricksRoughness = textureLoader.load(
  "/textures/bricks/roughness.jpg"
);
const texturebricksAmb = textureLoader.load(
  "/textures/bricks/ambientOcclusion.jpg"
);

const textureDoorNormal = textureLoader.load("/textures/door/normal.jpg");
const textureDoorColor = textureLoader.load("/textures/door/color.jpg");
const textureDoorHeight = textureLoader.load("/textures/door/height.jpg");
const textureDoorMetalness = textureLoader.load("/textures/door/metalness.jpg");
const textureDoorAlpha = textureLoader.load("/textures/door/alpha.jpg");
const textureDoorRoughness = textureLoader.load("/textures/door/roughness.jpg");
const textureDoorAmb = textureLoader.load(
  "/textures/door/ambientOcclusion.jpg"
);

console.log(textureGrassNormal);

// immediately use the texture for material creation

/**
 * House
 */
// Temporary sphere
const house = new THREE.Mesh(
  new THREE.BoxGeometry(4, 3, 3),
  new THREE.MeshStandardMaterial({
    map: texturebricksColor,
    normalMap: texturebricksNormal,
    aoMap: texturebricksAmb,
    roughnessMap: texturebricksRoughness,
  })
);

house.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(house.geometry.attributes.uv.array, 2)
);

// const doorLight = new THREE.PointLight("#ff7d46", 1, 7);
// doorLight.position.set(0, 1, 3);
// house.add(doorLight);
house.castShadow = true;
house.position.y = 1.5;

// Door light
const doorLight = new THREE.PointLight("#ff7d46", 1, 7);
// doorLight.castShadow = true;
gui.add(doorLight, "intensity").min(0).max(1).step(0.001);
doorLight.position.set(0, 1.25, 2.7);
house.add(doorLight);

const roof = new THREE.Mesh(
  new THREE.ConeGeometry(3.5, 1, 4),
  new THREE.MeshStandardMaterial({ color: "#b35f45" })
);
const grassBIG1 = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 16, 16),
  new THREE.MeshStandardMaterial({ color: "#89c854" })
);
const grass1 = new THREE.Mesh(
  new THREE.SphereGeometry(0.25, 16, 16),
  new THREE.MeshStandardMaterial({ color: "#89c854" })
);
const grassBIG2 = new THREE.Mesh(
  new THREE.SphereGeometry(0.45, 16, 16),
  new THREE.MeshStandardMaterial({ color: "#89c854" })
);
const grass2 = new THREE.Mesh(
  new THREE.SphereGeometry(0.2, 16, 16),
  new THREE.MeshStandardMaterial({ color: "#89c854" })
);
grass1.position.set(1.5, -1.4, 2);
grass2.position.set(-1.3, -1.4, 2.55);
grassBIG1.position.set(0.9, -1.2, 2);
grassBIG2.position.set(-1.1, -1.2, 2);

roof.position.y = 2.01;
roof.rotation.y = Math.PI * 0.25;
house.add(roof, grass1, grass2, grassBIG1, grassBIG2);
scene.add(house);

//grass

const groupGrave = new THREE.Group();
groupGrave.position.y = 0.25;

scene.add(groupGrave);

// const loader = new FontLoader();

// loader.load("fonts/helvetiker_regular.typeface.json", function (font) {
//   const geometry = new TextGeometry("L", {
//     font: font,
//     size: 0.08,
//     depth: 0.01,

//     extrudePath: true,
//     curveSegments: 12,
//   });

//   const mesh = new THREE.Mesh(
//     geometry,
//     new THREE.MeshPhongMaterial({ color: "pink" })
//   );

//   scene.add(mesh);
// });

for (let i = 0; i < 50; i++) {
  const grassGrave = new THREE.Mesh(
    new THREE.BoxGeometry(0.6, 0.8, 0.2),
    new THREE.MeshStandardMaterial({ color: "#b2b6b1" })
  );

  let sprite = new TextSprite({
    text: "L",
    fontFamily: "Arial, Helvetica, sans-serif",
    fontSize: 0.2,
    color: "lightblue",
  });

  grassGrave.receiveShadow = true;

  // grassGrave.rotation.y = Math.PI * 0.5;
  grassGrave.rotation.z = (Math.random() - 0.5) * 0.4;
  grassGrave.rotation.y = (Math.random() - 0.5) * 0.4;
  grassGrave.position.z =
    Math.cos(Math.random() * Math.PI * 2) * (4 + Math.random() * 6);
  grassGrave.position.x =
    Math.sin(Math.random() * Math.PI * 2) * (4 + Math.random() * 6);

  grassGrave.add(sprite);
  groupGrave.add(grassGrave);
}

const door = new THREE.Mesh(
  new THREE.PlaneGeometry(2.5, 2.5),
  new THREE.MeshStandardMaterial({
    map: textureDoorColor,
    normalMap: textureDoorNormal,
    aoMap: textureDoorAmb,
    roughnessMap: textureDoorRoughness,
    metalnessMap: textureDoorMetalness,
    alphaMap: textureDoorAlpha,
    transparent: true,
    displacementMap: textureDoorHeight,
    displacementScale: 0.1,
  })
);
door.position.z = 1.5 + 0.01;
door.position.y = 1.25;
door.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2)
);

// Floor
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshStandardMaterial({
    map: textureGrassColor,
    roughnessMap: textureGrassRoughness,
    normalMap: textureGrassNormal,
    aoMap: textureGrassAmb,
  })
);
textureGrassColor.repeat.set(8, 8);
textureGrassAmb.repeat.set(8, 8);
textureGrassNormal.repeat.set(8, 8);
textureGrassRoughness.repeat.set(8, 8);
textureGrassColor.wrapS = THREE.RepeatWrapping;
textureGrassAmb.wrapS = THREE.RepeatWrapping;
textureGrassNormal.wrapS = THREE.RepeatWrapping;
textureGrassRoughness.wrapS = THREE.RepeatWrapping;

textureGrassColor.wrapT = THREE.RepeatWrapping;
textureGrassAmb.wrapT = THREE.RepeatWrapping;
textureGrassNormal.wrapT = THREE.RepeatWrapping;
textureGrassRoughness.wrapT = THREE.RepeatWrapping;
floor.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2)
);
floor.rotation.x = -Math.PI * 0.5;
floor.position.y = 0;
scene.add(floor, door);
floor.receiveShadow = true;

/**
 * Lights
 */
// Ambient light

const ambientLight = new THREE.AmbientLight("#b9d5ff", 0.12);
gui.add(ambientLight, "intensity").min(0).max(1).step(0.001);
scene.add(ambientLight);

// Directional light
const moonLight = new THREE.DirectionalLight("#b9d5ff", 0.12);
moonLight.position.set(4, 5, -2);
gui.add(moonLight, "intensity").min(0).max(1).step(0.001);
gui.add(moonLight.position, "x").min(-5).max(5).step(0.001);
gui.add(moonLight.position, "y").min(-5).max(5).step(0.001);
gui.add(moonLight.position, "z").min(-5).max(5).step(0.001);
scene.add(moonLight);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 4;
camera.position.y = 2;
camera.position.z = 5;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const fog = new THREE.Fog("#262837", 8, 1);
scene.fog = fog;

gui.add(fog, "near");
gui.add(fog, "far");

const listener = new THREE.AudioListener();
camera.add(listener);

// create a global audio source
const sound = new THREE.Audio(listener);

// load a sound and set it as the Audio object's buffer
const audioLoader = new THREE.AudioLoader();
audioLoader.load("horror.mp4", function (buffer) {
  sound.setBuffer(buffer);
  sound.setLoop(true);
  sound.setVolume(0.5);
  sound.play();
});

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor("#262837");
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

/**
 * Animate
 */

const ghost1 = new THREE.PointLight("#ff00ff", 2, 3);
ghost1.castShadow = true;
ghost1.shadow.mapSize.width = 256;
ghost1.shadow.mapSize.height = 256;
ghost1.shadow.camera.far = 7;
scene.add(ghost1);

const ghost2 = new THREE.PointLight("#00ffff", 2, 3);
ghost2.castShadow = true;
ghost2.shadow.mapSize.width = 256;
ghost2.shadow.mapSize.height = 256;
ghost2.shadow.camera.far = 7;
scene.add(ghost2);

const ghost3 = new THREE.PointLight("#ffff00", 2, 3);
ghost3.castShadow = true;
ghost3.shadow.mapSize.width = 256;
ghost3.shadow.mapSize.height = 256;
ghost3.shadow.camera.far = 7;
scene.add(ghost3);
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Ghosts
  const ghost1Angle = elapsedTime * 0.5;
  ghost1.position.x = Math.cos(ghost1Angle) * 4;
  ghost1.position.z = Math.sin(ghost1Angle) * 4;
  ghost1.position.y = Math.sin(elapsedTime * 3);

  const ghost2Angle = -elapsedTime * 0.32;
  ghost2.position.x = Math.cos(ghost2Angle) * 5;
  ghost2.position.z = Math.sin(ghost2Angle) * 5;
  ghost2.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5);

  const ghost3Angle = -elapsedTime * 0.18;
  ghost3.position.x =
    Math.cos(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.32));
  ghost3.position.z = Math.sin(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.5));
  ghost3.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5);

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
