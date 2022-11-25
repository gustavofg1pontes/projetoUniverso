import * as THREE from 'three';
import { Object3D } from 'three';


const cena = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / innerHeight, 0.1, 10000)

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector(".bg")
})
renderer.setSize(window.innerWidth, window.innerHeight)

camera.position.set(0, 0, 200)



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
        if (text[astroCamera] == texto) texto.style.display = "block"
        else texto.style.display = "none"
    })
}



function addOrbit(position = { x: 0, y: 0, z: 0 }, size, imgsrc, ring = false) {
    const obj = new Object3D();
    const geometry = new THREE.SphereGeometry(size)
    const texture = new THREE.TextureLoader().load(imgsrc)
    const material = new THREE.MeshStandardMaterial({ map: texture })
    const planet = new THREE.Mesh(geometry, material)
    planet.position.set(position.x, position.y, position.z)

    obj.add(planet)
    const objPlanet = { planet, obj }
    if (ring) rings(objPlanet, size + 10)
    return objPlanet
}
function rings(planetobj, ringsize) {
    const geometry = new THREE.TorusGeometry(ringsize, 2, 16, 100)
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff })
    const ring = new THREE.Mesh(geometry, material)
    ring.rotation.set(-150, 0, 0)

    planetobj.planet.add(ring)
}

const sun = addOrbit({ x: 0, y: 0, z: 0 }, 100, '../img/suntexture.jpg')
const mercury = addOrbit({ x: 500, y: 0, z: 0 }, 4, '../img/mercurytexture.jpg')
const venus = addOrbit({ x: 700, y: 0, z: 0 }, 8, '../img/venustexture.jpg')
const earth = addOrbit({ x: 900, y: 0, z: 0 }, 13, '../img/earthtexture.png')
const mars = addOrbit({ x: 1100, y: 0, z: 0 }, 11, '../img/marstexture.jpg')
const jupiter = addOrbit({ x: 1400, y: 0, z: 0 }, 35, '../img/jupitertexture.jpg')
const saturn = addOrbit({ x: 1700, y: 0, z: 0 }, 28, '../img/saturntexture.jpg', true)
const uranus = addOrbit({ x: 1900, y: 0, z: 0 }, 26, '../img/uranustexture.png')
const neptune = addOrbit({ x: 2100, y: 0, z: 0 }, 26, '../img/neptunetexture.jpg')
const pluto = addOrbit({ x: 2300, y: 0, z: 0 }, 2, '../img/plutotexture.jpg')
let astros = [sun, mercury, venus, earth, mars, jupiter, saturn, uranus, neptune, pluto]
let astroCamera = 0



astros.forEach(astro => cena.add(astro.obj))

function animate() {
    requestAnimationFrame(animate)
    if (camera.position.z < astros[astroCamera].planet.position.x + 50) camera.position.z += 5
    else if (camera.position.z > astros[astroCamera].planet.position.x + 200) camera.position.z -= 5
    text()

    sun.planet.rotation.y += 0.001
    mercury.obj.rotation.y -= 0.012
    venus.obj.rotation.y -= 0.009
    earth.obj.rotation.y -= 0.008
    mars.obj.rotation.y -= 0.004
    jupiter.obj.rotation.y -= 0.0009
    saturn.obj.rotation.y -= 0.00045
    uranus.obj.rotation.y -= 0.0002
    neptune.obj.rotation.y -= 0.00008
    pluto.obj.rotation.y -= 0.00007

    mercury.planet.rotation.y += 0.01
    venus.planet.rotation.y += 0.01
    earth.planet.rotation.y += 0.01
    mars.planet.rotation.y += 0.01
    jupiter.planet.rotation.y += 0.01
    saturn.planet.rotation.y += 0.001
    uranus.planet.rotation.y += 0.01
    neptune.planet.rotation.y += 0.01
    pluto.planet.rotation.y += 0.01

    renderer.render(cena, camera)
}
animate()