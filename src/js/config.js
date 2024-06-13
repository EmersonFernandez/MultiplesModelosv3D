// configuraciones de las imagenes

// img logo header
const $img_header_logo_father = document.getElementById('logo');
const $img_header_logo = document.createElement('img');
$img_header_logo.src = './assets/img/logo_header.png';
$img_header_logo.alt = 'logo';
$img_header_logo.style.width = '200px';
$img_header_logo.style.height = 'auto';
// $img_header_logo.style.objectFit = '';
$img_header_logo_father.appendChild($img_header_logo);

//img logo frame principal
const $img_frame_main = document.getElementById('div_iframe');
$img_frame_main.classList.add('img_flex');
const $img_frame = document.createElement('img');
$img_frame.src = './assets/img/img_main.png'
$img_frame.alt = 'principal'
$img_frame.style.width = '360px';
$img_frame.style.height = 'auto';
$img_frame_main.appendChild($img_frame);

// configuraciones del backgroud de header y del footer

function backgroudImagen(id, imgRuta) {
    const $background_header = document.getElementById(`${id}`);
    $background_header.style.backgroundImage = `url(${imgRuta})`;
    $background_header.style.backgroundSize = 'cover';
    $background_header.style.backgroundPosition = 'center';
    $background_header.style.backgroundRepeat = 'no-repeat';
    $background_header.style.backgroundAttachment = 'fixed';
}

backgroudImagen('navbar', './assets/img/Fondo_v1.png');
backgroudImagen('footer', './assets/img/Fondo_v1.png');


// configuraciones de los videos
function videosDetails(videoUrl, id) {
    const $video = document.getElementById(`${id}`);
    $video.classList.add('video');
    $video.src = `${videoUrl}`;
}
videosDetails('./assets/videos/01_videos/video_01.mp4','video_1');
videosDetails('./assets/videos/01_videos/video_02.mp4','video_2');
videosDetails('./assets/videos/01_videos/video_03.mp4','video_3');
