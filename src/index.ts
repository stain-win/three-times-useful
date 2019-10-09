import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';

const params = {
				exposure: 1,
				bloomStrength: 1.5,
				bloomThreshold: 0,
				bloomRadius: 0
			};
const clock = new THREE.Clock();
const root = document.getElementById("root");
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.toneMapping = THREE.ReinhardToneMapping;
root.appendChild( renderer.domElement );

const scene = new THREE.Scene();
scene.add( new THREE.AmbientLight( 0x404040 ) );

const camera = new THREE.PerspectiveCamera( 65, window.innerWidth / window.innerHeight, 1, 400 );
camera.position.set( - 15, 2.5, - 3.5 );
scene.add( camera );

const controls = new OrbitControls( camera, renderer.domElement );
controls.maxPolarAngle = Math.PI * 0.5;
controls.minDistance = 1;
controls.maxDistance = 30;

const light = new THREE.DirectionalLight( 0xffffff );
light.position.set( 1, 1, 1 );
scene.add( light );

const pointLight = new THREE.PointLight( 0xffffff, 1 );
camera.add( pointLight );

const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );

const geometry = new THREE.Geometry();
geometry.vertices.push(new THREE.Vector3( -10, 0, 0) );
geometry.vertices.push(new THREE.Vector3( 0, 10, 0) );
geometry.vertices.push(new THREE.Vector3( 10, 0, 0) );

const line = new THREE.Line( geometry, material );
scene.add( line );

const renderScene = new RenderPass( scene, camera );
const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
bloomPass.threshold = params.bloomThreshold;
bloomPass.strength = params.bloomStrength;
bloomPass.radius = params.bloomRadius;

const composer = new EffectComposer( renderer );
composer.addPass( renderScene );
composer.addPass( bloomPass );

composer.render();
animate();

function animate() {
				requestAnimationFrame( animate );
				composer.render();
			}
