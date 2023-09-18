// Back side Ball
var container;
var camera, scene, renderer;
var framesCount = 0;

var localGroup;
var particles = [],
    particlesSlice = [],
    particle, geometry, material;

const deg = Math.PI / 180;

init();
sceneAnimation();

function init() {

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 5);

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container = document.getElementById('canvas-container');
    container.appendChild( renderer.domElement );

    sceneParticles(0.005, 64);
    groupSlices(64);
    sceneGroup(localGroup, particlesSlice);
    window.addEventListener('resize', onWindowResize, false);
}
function sceneAnimation() {
    requestAnimationFrame(sceneAnimation);

    framesCount++;

    for (let i = 0; i < particlesSlice.length; ++i) {
        particlesSlice[i].rotation.x += (0.0010 + 0.0002 * i); 
        particlesSlice[i].rotation.y += (0.0015 + 0.0001 * i); 
        particlesSlice[i].rotation.z += (0.0020 + 0.0002 * i); 
    }
    for (let i = 0; i < particles.length; ++i) {
        particles[i].scale.set(
            Math.sin(framesCount * 0.00001 * i),
            Math.sin(framesCount * 0.00001 * i),
            Math.sin(framesCount * 0.00001 * i)
        );
        particles[i].material.color.setHSL((Math.sin((framesCount * 0.0075) + (i * 0.001)) * 0.5) + 0.5, 0.75, 0.75);
    }

    localGroup.rotation.y = Math.cos(framesCount * 0.01);
    localGroup.rotation.z = Math.sin(framesCount * 0.01);

    renderer.render(scene, camera);
}

function sceneParticles(size, length) {
    geometry = new THREE.SphereBufferGeometry(size, 16, 16);
    material = new THREE.MeshBasicMaterial( { color: "hsl(21, 100%, 64%)" } );

    let i = 0, ix, iy;
    for (let ix = 0; ix < length; ++ix) {
        for (let iy = 0; iy < length; ++iy) {
            particle = particles[i++] = new THREE.Mesh(geometry, material);
            particle.position.x = Math.sin((iy * (2 / length)) * Math.PI);
            particle.position.y = Math.cos((iy * (2 / length)) * Math.PI);
            scene.add(particle);
        }
    }
}

function groupSlices(length) {
    let i = 0, ix, iy;
    for (let ix = 0; ix < length; ++ix) {

        particlesSlice[ix] = new THREE.Group();
        for (let iy = 0; iy < length; ++iy) {
            i++;
            particlesSlice[ix].add(particles[i-1]);
        }
        scene.add(particlesSlice[ix]);
        particlesSlice[ix].rotation.x = deg * (ix / length * 180);
        particlesSlice[ix].rotation.y = deg * (ix / length * 180) * 3;
        particlesSlice[ix].rotation.z = deg * (ix / length * 180) * 6;
    }
}

function sceneGroup(group, objs) {
    group = localGroup = new THREE.Group();

    objs.forEach(function(obj) {
        group.add(obj);
    });
    scene.add(group);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}