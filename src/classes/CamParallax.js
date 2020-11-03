import RAF from '../utils/raf'
import * as THREE from 'three'

export default class CamParalax {
    constructor(camera) {
        this.bind()
        this.camera = camera
        this.mousePos = new THREE.Vector2()

        window.addEventListener('mousemove', this.mouseMove)
        RAF.subscribe("camUpdate", this.update)
    }

    mouseMove(e) {
        this.mousePos.set(e.clientX - window.innerWidth / 2, e.clientY - window.innerHeight / 2)
        this.mousePos.multiplyScalar(0.001)
        console.log(this.mousePos)
    }

    update() {
        this.camera.position.x += (this.mousePos.x - this.camera.position.x) * 0.1
        this.camera.position.y += (this.mousePos.y - this.camera.position.y) * 0.1

    }

    bind() {
        this.mouseMove = this.mouseMove.bind(this)
        this.update = this.update.bind(this)
    }
}