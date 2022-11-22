import * as THREE from 'three';
import { Object3D } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const cena = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / innerHeight, 0.1, 10000)
let velOrbit = 0.003

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
    cena.add(light)
}
addLight()


function addStar() {
    const geometry = new THREE.SphereGeometry(0.5)
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff })
    const star = new THREE.Mesh(geometry, material)
    const [x, y, z] = Array(3).fill().map(pos => pos = THREE.MathUtils.randFloatSpread(2000))
    star.position.set(x, y, z)
    cena.add(star)
}
Array(2000).fill().forEach(star => addStar())

const obj = new Object3D();
function addOrbit(position = { x: 0, y: 0, z: 0 }, size, imgsrc) {
    const geometry = new THREE.SphereGeometry(size)
    const texture = new THREE.TextureLoader().load(imgsrc)
    const material = new THREE.MeshStandardMaterial({ map: texture })
    const planet = new THREE.Mesh(geometry, material)
    planet.position.set(position.x, position.y, position.z)

    obj.add(planet)
    return planet
}

const mercury = addOrbit({ x: 500, y: 0, z: 0 }, 4, '../img/mercurytexture.jpg')
const venus = addOrbit({ x: 700, y: 0, z: 0 }, 8, '../img/venustexture.jpg')
const earth = addOrbit({ x: 900, y: 0, z: 0 }, 13, '../img/earthtexture.png')
const mars = addOrbit({ x: 1100, y: 0, z: 0 }, 11, '../img/earthtexture.png')
const jupiter = addOrbit({ x: 1400, y: 0, z: 0 }, 35, '../img/earthtexture.png')
const saturn = addOrbit({ x: 1700, y: 0, z: 0 }, 28, '../img/earthtexture.png')
const uranus = addOrbit({ x: 1900, y: 0, z: 0 }, 26, '../img/earthtexture.png')
const neptune = addOrbit({ x: 2100, y: 0, z: 0 }, 26, '../img/earthtexture.png')
const pluto = addOrbit({ x: 2300, y: 0, z: 0 }, 2, '../img/earthtexture.png')
let astros = [sun, mercury, venus, earth, mars, jupiter, saturn, uranus, neptune, pluto]
let astroCamera = 0

cena.add(obj)

function moveCamera(passa) {
    if (passa) { if (astroCamera < astros.length - 1) astroCamera++ }
    else { if (astroCamera > 0) astroCamera-- }
}
document.querySelector(".next").addEventListener("click", () => {
    moveCamera(true)
})

document.querySelector(".back").addEventListener("click", () => {
    moveCamera(false)
})


function text() {
    const text = document.querySelectorAll(".astro")
    text.forEach(texto => {
        if(text[astroCamera] == texto) texto.style.display = "block"
        else texto.style.display = "none"
    })
}

function animate() {
    requestAnimationFrame(animate)
    if (camera.position.z < astros[astroCamera].position.x + 50) camera.position.z += 5
    else if (camera.position.z > astros[astroCamera].position.x + 200) camera.position.z -= 5
    text()
    sun.rotation.y += 0.001
    console.log(astroCamera)
    mercury.rotation.y += 0.01
    venus.rotation.y += 0.01
    earth.rotation.y += 0.01
    obj.rotation.y += velOrbit

    renderer.render(cena, camera)
}
animate()