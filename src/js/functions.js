import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { dataIframes } from './objects.js';


export const scene = new THREE.Scene();
export const textureLoader = new THREE.TextureLoader();
export const renderer = new THREE.WebGLRenderer();
const width = document.getElementById('div_iframe').clientWidth;
const height = document.getElementById('div_iframe').clientHeight;
const camera = new THREE.PerspectiveCamera(45, width / height, 1, 3000);
const controls = new OrbitControls(camera, renderer.domElement);

// Hacemos referencia al div del iframe
const $id_title_iframe = document.getElementById('title_iframe');

// Manipulación de elementos individuales de los modelos 
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Iinicializar escenas
// Configuración inicial de la escena, cámara y renderizador
function init() {

    // Niebla
    camera.fog = new THREE.Fog(0xe6e6e6, 5);

    // Configuracion de renderer 
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.outputEncoding = THREE.sRGBEncoding;

    // Luz hemiferica
    const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444);
    hemisphereLight.position.set(0, 300, 0);
    scene.add(hemisphereLight);

    // Luz dirreccional
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(-50, 50.29856636823064, 150);
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

    // Textturas del cileo
    textureLoader.load('./assets/model/vignette.jpg', function (texture) {
        scene.background = texture;
    });

    // Control de la camara
    controls.update();
}


// Button active
function buttonActive(id) {
    document.querySelectorAll('#btn button').forEach(btn => btn.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

// Función para establecer los iframes
export const iframesOnClick = (event) => {
    const $div_detalis = document.getElementById('div_details');
    const $frame_container = document.getElementById('div_iframe');
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

// Función para la carda de arhcivos fbx
// export const modelos3DLoader = (nameModel, py, event) => {
//     camera.position.set(-50, 50.29856636823064, 150); // Ajusta la posición de la cámara para estar más cerca del modelo
//     $id_title_iframe.textContent = `${event.target.innerText}`;
//     return new Promise((resolve, reject) => {
//         // Eliminar el modelo cargado previamente si existe
//         if (loadedModel) {
//             scene.children.splice(2, 1);
//         }
//         // Llamamos la funcion del boton activo
//         buttonActive(event.target.id);

//         // Cargar entorno HDR
//         new RGBELoader()
//             .setPath('./assets/model/')
//             .load('MR_INT-005_WhiteNeons_NAD.hdr', function (texture) {
//                 texture.mapping = THREE.EquirectangularReflectionMapping;
//                 scene.environment = texture;

//                 // Cargar modelo FBX
//                 const loader = new FBXLoader();
//                 loader.load(`./assets/model/${nameModel}.fbx`, function (object) {
//                     object.position.set(0, py, 0);
//                     object.rotation.set(-Math.PI / 2, 0, Math.PI / 8);
//                     object.castShadow = true;
//                     object.traverse((child) => {
//                         if (child.isMesh) {
//                             child.castShadow = true;
//                             child.receiveShadow = true;
//                         }
//                     });
//                     scene.add(object);
//                     loadedModel = object;
//                     resolve();
//                 }, undefined, (error) => {
//                     reject(error);
//                 });
//             }, undefined, (error) => {
//                 reject(error);
//             });
//     });
// }


// Función para la carga de archivos FBX
export const modelos3DLoader = (nameModel, py, event) => {
    camera.position.set(-50, 50.29856636823064, 150); // Ajusta la posición de la cámara para estar más cerca del modelo
    $id_title_iframe.textContent = `${event.target.innerText}`;

    return new Promise((resolve, reject) => {
        // Eliminar el modelo cargado previamente si existe
        if (loadedModel) {
            scene.remove(loadedModel);
        }
        // Llamamos la función del botón activo
        buttonActive(event.target.id);

        // Mostrar el indicador de carga
        const loadingManager = new THREE.LoadingManager();
        loadingManager.onStart = function (url, itemsLoaded, itemsTotal) {
            // console.log(`Comenzando carga de archivos : ${url}. cargando  ${itemsLoaded} de ${itemsTotal} archivos.`);
        };

        loadingManager.onLoad = function () {
            // console.log('carga completa!');
            document.getElementById('loadingIndicator').style.display = 'none'; // Ocultar indicador de carga
            resolve();
        };
        loadingManager.onProgress = function (url, itemsLoaded, itemsTotal) {
            const progress = (itemsLoaded / itemsTotal) * 100;
            // console.log(`Cargando archivos: ${url}. Cargando ${itemsLoaded} de ${itemsTotal} archivos. ${progress}%`);
            document.getElementById('loadingIndicator').textContent = `${Math.round(progress)}%`;
        };
        loadingManager.onError = function (url) {
            // console.log(`ruta del error ${url}`);
            document.getElementById('loadingIndicator').textContent = `Error al cargar ${url}`;
            reject(new Error(`Error al cargar ${url}`));
        };

        // Cargar entorno HDR
        new RGBELoader(loadingManager)
            .setPath('./assets/model/')
            .load('MR_INT-005_WhiteNeons_NAD.hdr', function (texture) {
                texture.mapping = THREE.EquirectangularReflectionMapping;
                scene.environment = texture;
                // scene.background = texture;

                // Cargar modelo FBX
                const loader = new FBXLoader(loadingManager);
                loader.load(`./assets/model/${nameModel}.fbx`, function (object) {
                    console.log(object);
                    object.children.forEach((el) => {
                        if (el.isMesh && el.material && el.material.map) {
                            el.material.color.set(3, 3, 3); // Cambia el color a blanco
                        }
                    });
                    
                    object.position.set(0, py, 0);
                    object.rotation.set(-Math.PI / 2, 0, Math.PI / 8);
                    object.castShadow = true;
                    console.log(object);

                    object.children.map(el => {
                        if (el.name == 'ID_233') {
                            console.log(el);
                            // if (el.userData.id == 233) {
                            // }
                        }
                    })

                    object.traverse((child) => {
                        if (child.isMesh) {
                            child.castShadow = true;
                            child.receiveShadow = true;
                        }
                    });
                    scene.add(object);
                    loadedModel = object;
                }, undefined, (error) => {
                    reject(error);
                });
            }, undefined, (error) => {
                reject(error);
            });
    });
};


// Función para la animación
export function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

// Función de la carga del spinner 
export function sppiner() {
    const $div_loader_container = document.createElement('div');
    const $div_text = document.createElement('div');
    const $div_loader = document.createElement('div');
    const $div_number_loader = document.createElement('div');
    $div_number_loader.id = 'loadingIndicator';
    $div_number_loader.textContent = '0%';
    $div_loader_container.id = 'loader-container';
    $div_loader.id = 'loader';
    $div_text.id = 'loading-text';
    $div_text.textContent = 'Cargando Modelo...';
    $div_loader_container.appendChild($div_text);
    $div_loader_container.appendChild($div_loader);
    $div_loader_container.appendChild($div_number_loader);
    const $frame_container = document.getElementById('div_iframe');
    $frame_container.innerHTML = '';
    document.getElementById('div_iframe').appendChild($div_loader_container);
}

// Función para el rederizado de las diferentes pantalla 
function onContainerResize() {
    const newWidth = document.getElementById('div_iframe').clientWidth;
    const newHeight = document.getElementById('div_iframe').clientHeight;
    renderer.setSize(newWidth, newHeight);
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
}

window.addEventListener('resize', onContainerResize);
console.log('inicio');
init();