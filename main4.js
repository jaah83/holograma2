import * as THREE from 'three';
import { PeppersGhostEffect } from 'three/addons/effects/PeppersGhostEffect.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
 
let container, camera, scene, renderer, effect, model;
 
//contenedor
container = document.createElement('div');
document.body.appendChild(container);
 
//renderizador
renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setAnimationLoop(animate);
container.appendChild(renderer.domElement);
 
//efectos
effect = new PeppersGhostEffect(renderer);
effect.setSize(window.innerWidth, window.innerHeight);
effect.cameraDistance = 80;
window.addEventListener('resize', onWindowResize);
//cámara
camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 100000);
 
//escena
scene = new THREE.Scene();
 
const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 2);
hemiLight.color.setHSL(10, 10, 10);
hemiLight.position.set(0, 0, 0);
scene.add(hemiLight);
 
//Cubo
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshLambertMaterial({ color: 0x7fffd4 });
const cube = new THREE.Mesh(geometry, material);
//scene.add(cube);
 
//3D
const gltfLoader = new GLTFLoader();
gltfLoader.load('espada.glb', function (gltf) {
    model = gltf.scene;
    scene.add(model);
    model.scale.set(5, 5, 5);
    model.position.set(0, 0, 0);
},
(xhr) => console.log((xhr.loaded / xhr.total) * 100 + '% loaded'),
(error) => console.error('Error cargando GLTF:', error)
);
 
//Pantalla
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    effect.setSize(window.innerWidth, window.innerHeight);
}
 
// Animación
function animate() {
    cube.rotation.y += 0.05;
    if (model) model.rotation.y += 0.02;
    effect.render(scene, camera);
}