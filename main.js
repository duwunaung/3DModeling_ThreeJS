import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader"
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader"

let scene, camera;

scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera( 20, window.innerWidth / window.innerHeight, 1, 2000 );
camera.position.z = 250;

var light = new THREE.AmbientLight(0xffffff);
scene.add(light);

light = new THREE.HemisphereLight(0xffffff, 0x444444, 1.0);
light.position.set(0, 1, 0);
scene.add(light);

var directionalLight = new THREE.DirectionalLight( 0xffeedd );
directionalLight.position.set( 0, 1, 0 ).normalize();
scene.add( directionalLight );

var mesh = null;

var mtlLoader = new MTLLoader();
mtlLoader.load( 'models/abc.mtl', function( materials ) {
  materials.preload();
  var objLoader = new OBJLoader();
  objLoader.setMaterials( materials );
  objLoader.load( 'models/abc.obj', function ( object ) {    
      mesh = object;
      scene.add( mesh );
  });
});

const canvas = document.querySelector(".webgl")
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearColor(0xccccff);

renderer.setPixelRatio(2);
renderer.render(scene, camera)

const controls = new OrbitControls(camera, canvas)

controls.addEventListener('change', renderer);

animate();

function animate() {
    renderer.render( scene, camera );
    requestAnimationFrame( animate );
}