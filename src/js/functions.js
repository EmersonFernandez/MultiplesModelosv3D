import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { dataIframes } from './objects.js';

// Configuración inicial de la escena, cámara y renderizador
const width = document.getElementById('div_iframe').clientWidth;
const height = document.getElementById('div_iframe').clientHeight;
export const scene = new THREE.Scene();
export const textureLoader = new THREE.TextureLoader();
const camera = new THREE.PerspectiveCamera(45, width / height, 1, 3000);
// camera.position.set(-50, 50.29856636823064, 150); // Ajusta la posición de la cámara para estar más cerca del modelo
camera.fog = new THREE.Fog(0xe6e6e6, 5);



export const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;
renderer.outputEncoding = THREE.sRGBEncoding;

const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444);
hemisphereLight.position.set(0, 20, 0);
scene.add(hemisphereLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(10, 20, 15);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;
directionalLight.shadow.camera.near = 0.5;
directionalLight.shadow.camera.far = 50;
directionalLight.shadow.camera.left = -90;
directionalLight.shadow.camera.right = 50;
directionalLight.shadow.camera.top = 50;
directionalLight.shadow.camera.bottom = -50;
scene.add(directionalLight);

// const planeGeometry = new THREE.PlaneGeometry(1000, 1000);
// const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xe6e6e6 });
// const plane = new THREE.Mesh(planeGeometry, planeMaterial);
// plane.rotation.x = -Math.PI / 2;
// plane.position.y = -1;
// plane.receiveShadow = true;
// scene.add(plane);

textureLoader.load('./assets/model/vignette.jpg', function (texture) {
    scene.background = texture;
});

export const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

export const raycaster = new THREE.Raycaster();
export const mouse = new THREE.Vector2();

function buttonActive(id) {
    document.querySelectorAll('#btn button').forEach(btn => btn.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

export const iframesOnClick = (event) => {
    const $div_detalis = document.getElementById('div_details');
    const $frame_container = document.getElementById('div_iframe');
    const $id_title_iframe = document.getElementById('title_iframe');
    const dataKeyIframes = dataIframes[event.target.id];
    const $iframe = document.createElement('iframe');
    $div_detalis.innerHTML = '';
    $id_title_iframe.textContent = `${event.target.innerText}`;
    $iframe.classList.add('iframe');
    $iframe.src = dataKeyIframes.src;
    $frame_container.innerHTML = '';
    $frame_container.appendChild($iframe);
    buttonActive(event.target.id);
}

export let loadedModel = null; // Mantener referencia al modelo cargado actualmente

export const modelos3DLoader = (nameModel, py, event) => {
    camera.position.set(-50, 50.29856636823064, 150); // Ajusta la posición de la cámara para estar más cerca del modelo
    const $id_title_iframe = document.getElementById('title_iframe');
    $id_title_iframe.textContent = `${event.target.innerText}`;
    return new Promise((resolve, reject) => {
        // Eliminar el modelo cargado previamente si existe
        if (loadedModel) {
            scene.children.splice(2, 1);
            console.log('Eliminado el modelo');
        }

        console.log(scene);
        buttonActive(event.target.id);

        // Cargar entorno HDR
        new RGBELoader()
            .setPath('./assets/model/')
            .load('MR_INT-005_WhiteNeons_NAD.hdr', function (texture) {
                texture.mapping = THREE.EquirectangularReflectionMapping;
                scene.environment = texture;

                // Cargar modelo FBX
                const loader = new FBXLoader();
                loader.load(`./assets/model/${nameModel}.fbx`, function (object) {
                    object.position.set(0, py , 0);
                    object.rotation.set(-Math.PI / 2, 0, Math.PI / 8);
                    object.castShadow = true;
                    object.traverse((child) => {
                        if (child.isMesh) {
                            child.castShadow = true;
                            child.receiveShadow = true;
                        }
                    });
                    scene.add(object);
                    loadedModel = object;
                    resolve();
                }, undefined, (error) => {
                    reject(error);
                });
            }, undefined, (error) => {
                reject(error);
            });
    });
}

export function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

{/* <div id="loader-container">
<div id="loading-text">Cargando Modelo...</div>
<div id="loader"></div>
</div> */}
export function sppiner() {
    const $div_loader_container = document.createElement('div');
    const $div_text = document.createElement('div');
    const $div_loader = document.createElement('div');
    $div_loader_container.id = 'loader-container';
    $div_loader.id = 'loader';
    $div_text.id = 'loading-text';
    $div_text.textContent = 'Cargando Modelo...';
    $div_loader_container.appendChild($div_text);
    $div_loader_container.appendChild($div_loader);
    const $frame_container = document.getElementById('div_iframe');
    $frame_container.innerHTML = '';
    document.getElementById('div_iframe').appendChild($div_loader_container);
}

function onContainerResize() {
    const newWidth = document.getElementById('div_iframe').clientWidth;
    const newHeight = document.getElementById('div_iframe').clientHeight;
    renderer.setSize(newWidth, newHeight);
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
}

window.addEventListener('resize', onContainerResize);
