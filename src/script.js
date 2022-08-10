import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// ///////////////////// LOADERS ///////////////////////////////
const loader = new THREE.TextureLoader()
const texture = loader.load('/textures/wireframe2.jpg')
const height = loader.load('/textures/height.png')
const alpha = loader.load('/textures/alpha.jpg')

const gltfloader = new GLTFLoader();



const gui = new dat.GUI()

const canvas = document.querySelector('canvas.webgl')

const scene = new THREE.Scene()

// ///////////////////// OBJECTS ///////////////////////////////

// CAT
let mixer;
let mixer3;
let cat;
 gltfloader.load( '/cat/scene.gltf', function ( gltf ) {
 	scene.add( gltf.scene );
    cat = gltf.scene;
    // Animation - Walk
    mixer = new THREE.AnimationMixer(cat);
    mixer3 = new THREE.AnimationMixer(cat);
    const clips = gltf.animations;
    const clip = THREE.AnimationClip.findByName(clips, 'A_walk')
    const clip2 = THREE.AnimationClip.findByName(clips, 'A_idle')
    const action = mixer.clipAction(clip)
    const action2 = mixer3.clipAction(clip2)
    action.play()
    action2.play()


    cat.scale.set(.1,.1,.1)
    cat.position.x = 0.137
    cat.position.y = 0.534
    cat.position.z = -1.1202
    cat.rotation.x = 0.4
    cat.rotation.y =-0.127
    
    const catGUI = gui.addFolder('Cat');
    catGUI.add(cat.position, 'x').min(-3).max(3).step(0.00001)
    catGUI.add(cat.position, 'y').min(-3).max(3).step(0.00001)
    catGUI.add(cat.position, 'z').min(-3).max(3).step(0.00001)
    catGUI.add(cat.rotation, 'x').min(-3).max(3).step(0.00001)
    catGUI.add(cat.rotation, 'y').min(-3).max(3).step(0.00001)
    

 }, undefined, function ( error ) {
 	console.error( error );
 } );

// DARK CAT

let mixer2;
let cat2;
 gltfloader.load( '/dark_cat/scene.gltf', function ( gltf ) {
 	scene.add( gltf.scene );
    cat2 = gltf.scene;
    // Animation - Walk
    mixer2 = new THREE.AnimationMixer(cat2);
    const clips = gltf.animations;
    const clip = THREE.AnimationClip.findByName(clips, 'Cat_Idle|Scratch')
    const action = mixer2.clipAction(clip)
    action.play()

    cat2.scale.set(.1,.1,.1)
    cat2.position.x = 0.7987
    cat2.position.y = 0.2693
    cat2.position.z = 0.6663
    cat2.rotation.x = 0.6002
    cat2.rotation.y =-1.9895
    
    const cat2GUI = gui.addFolder('Dark Cat');
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
gltfloader.load( '/totem/scene.gltf', function ( gltf ) {
    scene.add( gltf.scene );
   totem = gltf.scene;
   
   totem.scale.set(.2,.2,.2)
   totem.position.x = 0.2031
   totem.position.y = -0.0634
   totem.position.z = 0.4678
   totem.rotation.x = 0.4
   totem.rotation.y = 3
   
   const totemGUI = gui.addFolder('Totem');
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
gltfloader.load( '/sphere/scene.gltf', function ( gltf ) {
    scene.add( gltf.scene );
   sphere = gltf.scene;
   
   sphere.scale.set(.2,.2,.2)
   sphere.position.x = 0.9972
   sphere.position.y = -0.1276
   sphere.position.z = 3
   sphere.rotation.x = 0.137
   sphere.rotation.y = 3
   
   const sphereGUI = gui.addFolder('Sphere');
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
gltfloader.load( '/city/scene.gltf', function ( gltf ) {
    scene.add( gltf.scene );
   city = gltf.scene;
   
   city.scale.set(.0001,.0001,.0001)
   city.position.x = 3
   city.position.y = -1.78
   city.position.z = 3
   city.rotation.x = 0.137
   city.rotation.y = 3
   
   const cityGUI = gui.addFolder('City');
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
plane.rotation.x = 181

const planeGUI = gui.addFolder('Plane');
planeGUI.add(plane.rotation, 'x').min(-3).max(3).step(0.00001)
planeGUI.add(plane.rotation, 'y').min(-3).max(3).step(0.00001)
planeGUI.add(plane.position, 'x').min(-3).max(3).step(0.00001)
planeGUI.add(plane.position, 'y').min(-3).max(3).step(0.00001)

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
const pointLight = new THREE.PointLight(0xf587bb, 3)
pointLight.position.x = .2
pointLight.position.y = 10
pointLight.position.z = 4.4
scene.add(pointLight)

const lightGUI = gui.addFolder('Light');
lightGUI.add(pointLight.position, 'y').min(-3).max(3).step(0.01)
lightGUI.add(pointLight.position, 'x').min(-6).max(10).step(0.01)
lightGUI.add(pointLight.position, 'z').min(-3).max(3).step(0.01)
lightGUI.add(pointLight, 'intensity').min(0).max(10).step(0.01)

const lightColor = {
    color: 0xf587bb
}

lightGUI.addColor(lightColor, 'color')
    .onChange(()=> {
        pointLight.color.set(lightColor.color)
    })

const light2 = new THREE.AmbientLight(0x101010);
scene.add(light2);
// DOM ////////////////////////////////////////////////////


/**
 * Sizes
 */
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
    camera.position.x = 0
    camera.position.y = 0
    camera.position.z = -2

        
    scene.add(camera)

// Controls
 const controls = new OrbitControls(camera, canvas)
 controls.enableDamping = true

// ///////////////////// RENDERER ///////////////////////////////
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// ///////////////////// ANIMATE ///////////////////////////////
 const scrollMap = (event) => {
    camera.position.z = window.scrollY / 20
    
}
window.addEventListener('scroll', scrollMap);

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

const clock = new THREE.Clock()

const tick = () =>
{

    targetX = mouseX * .001
    targetY = mouseY * .001
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    
    // Update Orbital Controls
    controls.update()
    if(mixer && mixer2) {
        mixer.update(0.01)
        sphere.rotation.y = .5 * elapsedTime
        
        sphere.rotation.y += .45 * (targetX - sphere.rotation.y)
        sphere.rotation.x += .05 * (targetY - sphere.rotation.x)
        sphere.position.z += -.05 * (targetY - sphere.rotation.x)
        cat.position.z += -.09 * (targetY - sphere.rotation.x)
        
        if (cat.position.z >= -0.3){
            mixer2.update(0.01)
            totem.rotation.y += -.05
            mixer3.update(0.01)
        }

        
        
    }
    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()