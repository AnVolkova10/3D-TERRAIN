import './style.css'
import * as THREE from 'three'
import * as dat from 'dat.gui'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TextureLoader } from 'three';
import gsap from 'gsap'

// ///////////////////// LOADERS ///////////////////////////////
const loader = new THREE.TextureLoader()
const texture = loader.load('/textures/wireframe2.jpg')
const height = loader.load('/textures/height.png')
const alpha = loader.load('/textures/alpha.jpg')
const o = loader.load('/textures/o.png')


const gltfloader = new GLTFLoader();

const gui = new dat.GUI()

const canvas = document.querySelector('canvas.webgl')

const scene = new THREE.Scene()

// ////////////////////// GSAP /////////////////////////////////
let tl = gsap.timeline()

// ///////////////////// OBJECTS ///////////////////////////////

// CAT
let mixerWalk;
let mixerIdle;
let cat;
gltfloader.load( 'objects/cat/scene.gltf', function ( gltf ) {
    scene.add( gltf.scene );
    cat = gltf.scene;
    const clips = gltf.animations;

    // Animation - Walk
    mixerWalk = new THREE.AnimationMixer(cat);
    const clipWalk = THREE.AnimationClip.findByName(clips, 'A_walk')
    const actionWalk = mixerWalk.clipAction(clipWalk)
    actionWalk.play()
    // Animation - Idle
    mixerIdle = new THREE.AnimationMixer(cat);
    const clipIdle = THREE.AnimationClip.findByName(clips, 'A_idle')
    const actionIdle = mixerIdle.clipAction(clipIdle)
    actionIdle.play()

    cat.scale.set(.1,.1,.1)
    cat.position.x = -0.26
    cat.position.y = 0.534
    cat.position.z = -1.1202
    cat.rotation.x = 0.4
    cat.rotation.y =-0.127
    
    const catGUI = gui.addFolder('Cat');
    catGUI.add(cat, 'visible')
    catGUI.add(cat.position, 'x').min(-3).max(3).step(0.00001)
    catGUI.add(cat.position, 'y').min(-3).max(3).step(0.00001)
    catGUI.add(cat.position, 'z').min(-3).max(3).step(0.00001)
    catGUI.add(cat.rotation, 'x').min(-3).max(3).step(0.00001)
    catGUI.add(cat.rotation, 'y').min(-3).max(3).step(0.00001)
    

}, undefined, function ( error ) {
 	console.error( error );
} );

// DARK CAT
let cat2;
let mixerScratch2;
let mixerIdle2;
let mixerJump2;
 gltfloader.load( 'objects/dark_cat/scene.gltf', function ( gltf ) {
 	scene.add( gltf.scene );
    cat2 = gltf.scene;
    const clips = gltf.animations;
    // Animation - Scratch
    mixerScratch2 = new THREE.AnimationMixer(cat2);
    const clipScratch = THREE.AnimationClip.findByName(clips, 'Cat_Idle|Scratch')
    const actionScratch = mixerScratch2.clipAction(clipScratch)
    actionScratch.play()
    // Animation - Idle
    mixerIdle2 = new THREE.AnimationMixer(cat2);
    const clipIdle= THREE.AnimationClip.findByName(clips, 'Cat_Idle|Idle')
    const actionIdle = mixerIdle2.clipAction(clipIdle)
    actionIdle.play()
    // Animation - Jump
    mixerJump2 = new THREE.AnimationMixer(cat2);
    const clipJump= THREE.AnimationClip.findByName(clips, 'Cat_Idle|Jump')
    const actionJump = mixerJump2.clipAction(clipJump)
    actionJump.play()

    cat2.visible = false
    cat2.scale.set(.1,.1,.1)
    cat2.position.x = 0.7987
    cat2.position.y = 0.2693
    cat2.position.z = 0.6663
    cat2.rotation.x = 0.6002
    cat2.rotation.y =-1.9895
    
    const cat2GUI = gui.addFolder('Dark Cat');
    cat2GUI.add(cat2, 'visible')
    cat2GUI.add(cat2.position, 'x').min(-3).max(3).step(0.00001)
    cat2GUI.add(cat2.position, 'y').min(-3).max(3).step(0.00001)
    cat2GUI.add(cat2.position, 'z').min(-3).max(3).step(0.00001)
    cat2GUI.add(cat2.rotation, 'x').min(-3).max(3).step(0.00001)
    cat2GUI.add(cat2.rotation, 'y').min(-3).max(3).step(0.00001)
    

}, undefined, function ( error ) {
 	console.error( error );
} );

// TOTEM
let totem;
gltfloader.load( 'objects/totem/scene.gltf', function ( gltf ) {
   scene.add( gltf.scene );
   totem = gltf.scene;
   
   totem.scale.set(.2,.2,.2)
   totem.position.x = 0.2031
   totem.position.y = -0.0634
   totem.position.z = 0.4678
   totem.rotation.x = 0.4
   totem.rotation.y = 3
   
   const totemGUI = gui.addFolder('Totem');
   totemGUI.add(totem, 'visible')
   totemGUI.add(totem.position, 'x').min(-3).max(3).step(0.00001)
   totemGUI.add(totem.position, 'y').min(-3).max(3).step(0.00001)
   totemGUI.add(totem.position, 'z').min(-3).max(3).step(0.00001)
   totemGUI.add(totem.rotation, 'x').min(-3).max(3).step(0.00001)
   totemGUI.add(totem.rotation, 'y').min(-3).max(3).step(0.00001)
   
}, undefined, function ( error ) {
    console.error( error );
} );

// SPHERE
let sphere;
gltfloader.load( 'objects/sphere/scene.gltf', function ( gltf ) {
   scene.add( gltf.scene );
   sphere = gltf.scene;
   
   
   sphere.scale.set(.2,.2,.2)
   sphere.position.x = 0.9972
   sphere.position.y = -0.01276
   sphere.position.z = 3
   sphere.rotation.x = 0.137
   sphere.rotation.y = 3

   // pruebas de timeline
   tl.to(sphere.position, {x: -2, duration: 3})
   tl.to(sphere.position, {x: 0.9, duration: 3})
   
   const sphereGUI = gui.addFolder('Sphere');
   sphereGUI.add(sphere, 'visible')
   sphereGUI.add(sphere.position, 'x').min(-3).max(3).step(0.00001)
   sphereGUI.add(sphere.position, 'y').min(-3).max(3).step(0.00001)
   sphereGUI.add(sphere.position, 'z').min(-3).max(3).step(0.00001)
   sphereGUI.add(sphere.rotation, 'x').min(-3).max(3).step(0.00001)
   sphereGUI.add(sphere.rotation, 'y').min(-3).max(3).step(0.00001)
   
}, undefined, function ( error ) {
    console.error( error );
} );

// CITY
let city;
gltfloader.load( 'objects/city/scene.gltf', function ( gltf ) {
   scene.add(gltf.scene);
   city = gltf.scene;
   
   city.scale.set(.0001,.0001,.0001)
   city.position.x = 3
   city.position.y = -1.78
   city.position.z = 3
   city.rotation.x = 0.137
   city.rotation.y = 3
   
   const cityGUI = gui.addFolder('City');
   cityGUI.add(city, 'visible')
   cityGUI.add(city.position, 'x').min(-3).max(3).step(0.00001)
   cityGUI.add(city.position, 'y').min(-3).max(3).step(0.00001)
   cityGUI.add(city.position, 'z').min(-3).max(3).step(0.00001)
   cityGUI.add(city.rotation, 'x').min(-3).max(3).step(0.00001)
   cityGUI.add(city.rotation, 'y').min(-3).max(3).step(0.00001)
   

}, undefined, function ( error ) {
    console.error( error );
} );

// PLANE
const geometry = new THREE.PlaneBufferGeometry(3, 5, 64, 64)

const material = new THREE.MeshStandardMaterial({
    color: 'gray',
    map: texture,
    displacementMap: height,
    displacementScale: .5,
    alphaMap: alpha,
    transparent: true,
    depthTest: true
})

const plane = new THREE.Mesh(geometry, material)
scene.add(plane)

plane.position.x = -0.5909
plane.rotation.x = 181

const planeGUI = gui.addFolder('Plane');
planeGUI.add(plane, 'visible')
planeGUI.add(plane.rotation, 'x').min(-3).max(3).step(0.00001)
planeGUI.add(plane.rotation, 'y').min(-3).max(3).step(0.00001)
planeGUI.add(plane.position, 'x').min(-3).max(3).step(0.00001)
planeGUI.add(plane.position, 'y').min(-3).max(3).step(0.00001)


// GENOSHA LOGO
const geometry2 = new THREE.PlaneBufferGeometry(1.089, 0.234)

const material2 = new THREE.MeshBasicMaterial({
    map: loader.load('/images/genosha-logo.png'),
    transparent: true
})

const genoshaLogo = new THREE.Mesh(geometry2, material2)

genoshaLogo.rotation.y = -2.973
genoshaLogo.position.x = 0.798
genoshaLogo.position.y = -0.193
genoshaLogo.position.z = 2.386

scene.add(genoshaLogo)

const genoshaLogoGUI = gui.addFolder('Genosha Logo');
genoshaLogoGUI.add(genoshaLogo, 'visible')
genoshaLogoGUI.add(genoshaLogo.position, 'x').min(-3).max(3).step(0.00001)
genoshaLogoGUI.add(genoshaLogo.position, 'y').min(-3).max(3).step(0.00001)
genoshaLogoGUI.add(genoshaLogo.position, 'z').min(-3).max(3).step(0.00001)
genoshaLogoGUI.add(genoshaLogo.rotation, 'x').min(-3).max(3).step(0.00001)
genoshaLogoGUI.add(genoshaLogo.rotation, 'y').min(-3).max(3).step(0.00001)

// PARTICLE
const geometry3 = new THREE.TorusGeometry(.7,.2, 16, 100)

const material3 = new THREE.PointsMaterial({    
    transparent: true,
    size: 0.005
})

const particles = new THREE.Points(geometry3, material3)

particles.position.x = 0.2031
particles.position.y = 0.2693
particles.position.z = 0.4992
particles.rotation.x = -2.6
particles.visible = false
scene.add(particles)



const particlesGUI = gui.addFolder('Particles');
particlesGUI.add(particles, 'visible')
particlesGUI.add(particles.position, 'x').min(-3).max(3).step(0.00001)
particlesGUI.add(particles.position, 'y').min(-3).max(3).step(0.00001)
particlesGUI.add(particles.position, 'z').min(-3).max(10).step(0.00001)
particlesGUI.add(particles.rotation, 'x').min(-3).max(3).step(0.00001)
particlesGUI.add(particles.rotation, 'y').min(-3).max(3).step(0.00001)
particlesGUI.add(particles.rotation, 'z').min(-3).max(3).step(0.00001)

// GENOSHA PARTICLES
const particlesGeometry = new THREE.BufferGeometry;
const particlesCount = 5000;

const posArray = new Float32Array(particlesCount * 3)
for (let i = 0; i < particlesCount*3; i++) {
    posArray[i] = (Math.random() - .5)*5
    
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))

const particlesMaterial = new THREE.PointsMaterial({    
    size: 0.010,
    map: o,
    transparent: true
})

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
particlesMesh.visible = false
scene.add(particlesMesh)


const particles2GUI = gui.addFolder('Particles 2');
particles2GUI.add(particlesMesh, 'visible')
particles2GUI.add(particlesMesh.position, 'x').min(-3).max(3).step(0.00001)
particles2GUI.add(particlesMesh.position, 'y').min(-3).max(3).step(0.00001)
particles2GUI.add(particlesMesh.position, 'z').min(-3).max(10).step(0.00001)
particles2GUI.add(particlesMesh.rotation, 'x').min(-3).max(3).step(0.00001)
particles2GUI.add(particlesMesh.rotation, 'y').min(-3).max(3).step(0.00001)
particles2GUI.add(particlesMesh.rotation, 'z').min(-3).max(3).step(0.00001)



// SKYBOX
const skyboxLoader = new THREE.CubeTextureLoader();
const skybox = skyboxLoader.load([
    '/textures/right.png',
        '/textures/left.png',
        '/textures/top.png',
        '/textures/bottom.png',
        '/textures/front.png',
        '/textures/back.png',
    ]);
    scene.background = skybox;
    
// ///////////////////// LIGHTS ///////////////////////////////
// Light 1 - Point
let color1 = 0xf587bb;
const pointLight = new THREE.PointLight(color1, 3)
pointLight.position.x = .2
pointLight.position.y = 10
pointLight.position.z = 4.4
pointLight.castShadow = true;
scene.add(pointLight)

const lightGUI = gui.addFolder('Point Light');
lightGUI.add(pointLight, 'visible')
lightGUI.add(pointLight.position, 'y').min(-3).max(3).step(0.01)
lightGUI.add(pointLight.position, 'x').min(-6).max(10).step(0.01)
lightGUI.add(pointLight.position, 'z').min(-3).max(3).step(0.01)
lightGUI.add(pointLight, 'intensity').min(0).max(10).step(0.01)

const lightColor = {
    color: color1
}

lightGUI.addColor(lightColor, 'color')
    .onChange(()=> {
        pointLight.color.set(lightColor.color)
    })

// Light 2 - Ambient
const light2 = new THREE.AmbientLight(0x101010);
light2.castShadow = true;
scene.add(light2);
const light2GUI = gui.addFolder('Ambient Light');
light2GUI.add(light2, 'visible')

// ///////////////////// DOM ///////////////////////////////


// ///////////////////// SIZES ///////////////////////////////
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// ///////////////////// CAMERA ///////////////////////////////
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = -0.0615
camera.position.y = 1.7913
camera.position.z = -1.5285

scene.add(camera)

const cameraGUI = gui.addFolder('Camera');
cameraGUI.add(camera.position, 'x').min(-3).max(3).step(0.00001)
cameraGUI.add(camera.position, 'y').min(-3).max(3).step(0.00001)
cameraGUI.add(camera.position, 'z').min(-10).max(10).step(0.00001)



// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.minDistance = 1
controls.maxDistance = 15
controls.enablePan = false
controls.maxPolarAngle = Math.PI / 2 - 0.05

const keysPressed = {  }

document.addEventListener('keydown', (event) => {
    if (event.shiftKey && characterControls) {
        characterControls.switchRunToggle()
    } else {
        keysPressed[event.key.toLowerCase()] = true
    }
}, false);
document.addEventListener('keyup', (event) => {
    keysPressed[event.key.toLowerCase()] = false
}, false);

// ///////////////////// RENDERER ///////////////////////////////
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled = false

// //////////////////// RAYCASTER /////////////////////////////

const raycaster = new THREE.Raycaster()

let objs = []
scene.traverse((object)=> {
    if (object.isMesh)
        objs.push(object)
        object.castShadow = true
})
//Raycasting Only genoshaLogo
objs = [objs[1]]


// ///////////////////// ANIMATE ///////////////////////////////

// const scrollMap = (event) => {
//     camera.position.z = window.scrollY / 20
    
// }
// window.addEventListener('scroll', scrollMap);

document.addEventListener('mousemove', onDocumentMouseMove);

let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

function onDocumentMouseMove (e) {
    mouseX = (e.clientX - windowHalfX);
    mouseY = (e.clientY - windowHalfY);
}

const mouse = new THREE.Vector2()
window.addEventListener('mousemove', (event) => {
    mouse.x = event.clientX /sizes.width * 2-1
    mouse.y = -(event.clientY /sizes.height) * 2+1
})

const clock = new THREE.Clock()

const tick = () =>
{

    console.log(window.scrollY);
    targetX = mouseX * .001
    targetY = mouseY * .001
    const elapsedTime = clock.getElapsedTime()

    // Raycaster
    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObjects(objs)
    
    //mouse in
    for(const intersect of intersects){
        intersect.object.scale.set(1.1,1.1)
        totem.rotation.y += .005 * elapsedTime
    }

    //mouse out
    for (const object of objs) {
        if (!intersects.find(intersect=> intersect.object === object)) {
            object.scale.set(1,1)
         
        }
    }
    
    // Update Orbital Controls
    controls.update()

    // Update objects
     if (window.scrollY > 0 && window.scrollY <= 93){
        city.position.x = 3 - (window.scrollY* 0.046)
     
    } else if (window.scrollY >= 93 && window.scrollY <= 224){
        city.position.y = -1.78 + (window.scrollY* 0.0045)
        city.position.z = 3 - (window.scrollY* 0.003)
        
    } else if (window.scrollY >= 224 && window.scrollY <= 460){
        city.rotation.x = 0.137 + (window.scrollY* 0.0009)
        
    } 

    if (mixerIdle && window.scrollY == 0) {
        mixerIdle.update(0.01)
    } else if (mixerWalk && window.scrollY < 360) {
        mixerWalk.update(0.01)
        cat.position.z = -1.1202 + (window.scrollY* 0.009)
        cat.position.y = 0.534 - (window.scrollY* 0.0035)
        
    }
    
    
    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()