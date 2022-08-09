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
let cat;
 gltfloader.load( '/cat/scene.gltf', function ( gltf ) {
 	scene.add( gltf.scene );
    cat = gltf.scene;
    // Animation - Walk
    mixer = new THREE.AnimationMixer(cat);
    const clips = gltf.animations;
    const clip = THREE.AnimationClip.findByName(clips, 'A_walk')
    const action = mixer.clipAction(clip)
    action.play()

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


const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects

    // plane.rotation.z = .5 * elapsedTime
    // sphere.rotation.y = .5 * elapsedTime

    // Update Orbital Controls
    // controls.update()
    if(mixer) {
        mixer.update(0.01)
        
        
    }
    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()