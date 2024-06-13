// Importaciones
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import './config.js';


import {
    iframesOnClick,
    modelos3DLoader,
    animate,
    renderer,
    sppiner
} from './functions.js';

// variables
const $div_iframe = document.getElementById('div_iframe');
const $div_detalis = document.getElementById('div_details');


// Configuración de los eventos de clic para los botones de iframes
document.getElementById('btn-data-espacial').addEventListener('click', iframesOnClick);
document.getElementById('btn-analistica-espacial').addEventListener('click', iframesOnClick);
document.getElementById('btn-metrica-espacial').addEventListener('click', iframesOnClick);
// btn carga de modelo predial
document.getElementById('btn-gemelo-predial').addEventListener('click', (e) => {
    sppiner();
    const $div_sppiner = document.getElementById('loader-container');
    $div_sppiner.style.display = 'flex';
    modelos3DLoader('GemeloPredial', -1660, e).then(() => {
        $div_sppiner.style.display = 'none';
        $div_iframe.innerHTML = '';
        $div_detalis.innerHTML = '';
        $div_iframe.appendChild(renderer.domElement);
        animate();
    }).catch((error) => {
        console.error('Error loading scene:', error);
        alert('Error loading scene. Check the console for details.');
    });
});

document.getElementById('btn-gemelo-catastral').addEventListener('click', (e) => {
    sppiner();
    const $div_sppiner = document.getElementById('loader-container');
    $div_sppiner.style.display = 'flex';
    modelos3DLoader('GemeloCatastral', -1660, e).then(() => {
        $div_iframe.innerHTML = '';
        $div_detalis.innerHTML = '';
        $div_iframe.appendChild(renderer.domElement);
        animate();
    }).catch((error) => {
        console.error('Error loading scene:', error);
        alert('Error loading scene. Check the console for details.');
    })
});

document.getElementById('btn-gemelo-normativo').addEventListener('click', (e) => {
    sppiner();
    const $div_sppiner = document.getElementById('loader-container');
    $div_sppiner.style.display = 'flex';
    modelos3DLoader('GemeloNormativo', -1660, e).then(() => {
        $div_iframe.innerHTML = '';
        $div_detalis.innerHTML = '';
        $div_iframe.appendChild(renderer.domElement);
        animate();
    }).catch((error) => {
        console.error('Error loading scene:', error);
        alert('Error loading scene. Check the console for details.');
    })
});

document.getElementById('btn-gemelo-urbanistico').addEventListener('click', (e) => {
    sppiner();
    const $div_sppiner = document.getElementById('loader-container');
    $div_sppiner.style.display = 'flex';
    modelos3DLoader('GemeloUrbanistico', -1660, e).then(() => {
        $div_iframe.innerHTML = '';
        $div_detalis.innerHTML = '';
        $div_iframe.appendChild(renderer.domElement);
        animate();
    }).catch((error) => {
        console.error('Error loading scene:', error);
        alert('Error loading scene. Check the console for details.');
    })
});
document.getElementById('btn-gemelo-inmobiliario').addEventListener('click', (e) => {
    sppiner();
    const $div_sppiner = document.getElementById('loader-container');
    $div_sppiner.style.display = 'flex';
    modelos3DLoader('GemeloInmobiliario', -1660, e).then(() => {
        $div_iframe.innerHTML = '';
        $div_detalis.innerHTML = '';
        $div_iframe.appendChild(renderer.domElement);
        animate();
    }).catch((error) => {
        console.error('Error loading scene:', error);
        alert('Error loading scene. Check the console for details.');
    })
});

document.getElementById('btn-gemelo-arquitectonico').addEventListener('click', (e) => {
    sppiner();
    const $div_sppiner = document.getElementById('loader-container');
    $div_sppiner.style.display = 'flex';
    modelos3DLoader('GemeloArquitectonico', -1660, e).then(() => {
        $div_iframe.innerHTML = '';
        $div_detalis.innerHTML = '';
        $div_iframe.appendChild(renderer.domElement);
        animate();
    }).catch((error) => {
        console.error('Error loading scene:', error);
        alert('Error loading scene. Check the console for details.');
    })
});
