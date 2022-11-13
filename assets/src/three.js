import * as THREE from 'three';
import { Object3D } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const cena = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / innerHeight, 0.1, 10000)

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector(".bg")
})
renderer.setSize(window.innerWidth, window.innerHeight)

camera.position.set(0, 0, 200)
const geometry = new THREE.SphereGeometry(100)
const sunTexture = new THREE.TextureLoader().load('../img/suntexture.jpg')
const material = new THREE.MeshStandardMaterial({ map: sunTexture })
const sun = new THREE.Mesh(geometry, material)

cena.add(sun)


function addLight() {
    const light = new THREE.AmbientLight(0xffffff, 1)
    light.position.set(-5, -8, 10)
    const lightHelper = new THREE.PointLightHelper(light)
    cena.add(light, lightHelper)
}
addLight()


function addStar() {
    const geometry = new THREE.SphereGeometry(0.5)
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff })
    const star = new THREE.Mesh(geometry, material)
    const [x, y, z] = Array(3).fill().map(pos => pos = THREE.MathUtils.randFloatSpread(1000))
    star.position.set(x, y, z)
    cena.add(star)
}
Array(1000).fill().forEach(star => addStar())


const obj = new Object3D();
function addOrbit(position = { x: 0, y: 0, z: 0 }, size, imgsrc) {
    const geometry = new THREE.SphereGeometry(size)
    const texture = new THREE.TextureLoader().load(imgsrc)
    const material = new THREE.MeshStandardMaterial({ map:  texture})
    const planet = new THREE.Mesh(geometry, material)
    planet.position.set(position.x, position.y, position.z)

    obj.add(planet)
    return planet
}

const mercury = addOrbit({ x: 200, y: 0, z: 0 }, 10, '../img/mercurytexture.jpg')


cena.add(obj)

const controls = new OrbitControls(camera, renderer.domElement)
function animate() {
    requestAnimationFrame(animate)
    sun.rotation.y += 0.001
    obj.rotation.y += 0.009
    mercury.rotation.y += 0.01
    controls.update()
    renderer.render(cena, camera)
}
animate()