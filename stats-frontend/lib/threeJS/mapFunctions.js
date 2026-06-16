import * as THREE from 'three'
import { mapArrays } from '@/public/mapArrays.js'

const makeCube = (color) => {
    const geometry = new THREE.BoxGeometry(1, 1, 1);

    const material = new THREE.MeshBasicMaterial({color: color});

    const cube = new THREE.Mesh(geometry,material);
    return cube;
}
    
const populateScene = (scene, map) => {
    for (let y = 0; y < 33; y++) {
        for (let x = 0; x < 21; x++) {
            const tile = map[y][x];
            if (tile === 1) {
                const wall = makeCube(0xFFFFFF);
                wall.position.set(x, 0, y)
                scene.add(wall)
            }
            if (tile === 2) {
                const wall = makeCube(0x00FF00);
                wall.position.set(x, 0, y)
                scene.add(wall)
            }
            if (tile === 3) {
                const wall = makeCube(0x0000FF);
                wall.position.set(x, 0, y)
                scene.add(wall)
            }
            if (tile === 5) {
                const wall = makeCube(0xFF0000);
                wall.position.set(x, 0, y)
                scene.add(wall)
            }
        }
    }
}

export const renderMap = (mapRef) => {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000);
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    mapRef.appendChild(renderer.domElement);
    populateScene(scene, mapArrays['Open Space']);
    camera.position.set(15, 20, 15);
    camera.lookAt(15, 0, 10);

    function animate() {
        requestAnimationFrame(animate)
        renderer.render(scene, camera)
    }

    animate()
}
