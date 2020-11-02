import * as THREE from "three"

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import RAF from '../utils/raf'
import config from '../utils/config'
import MyGui from '../utils/MyGui'

import MofLogo from './MofLogo'
import CoffeeBeans from './CoffeeBeans'

class ThreeScene {
    constructor() {
        this.bind()

        this.camera
        this.scene
        this.renderer
        this.controls
    }

    init() {
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.renderer.debug.checkShaderErrors = true
        document.body.appendChild(this.renderer.domElement)

        this.scene = new THREE.Scene()

        this.camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000)
        this.camera.position.set(0, 0, 20)
        this.controls = new OrbitControls(this.camera, this.renderer.domElement)
        this.controls.enabled = config.controls
        this.controls.maxDistance = 1500
        this.controls.minDistance = 0

        if (config.myGui)
            MyGui.start()



        MofLogo.init(this.scene)
        CoffeeBeans.init(this.scene)

        window.addEventListener("resize", this.resizeCanvas)
        RAF.subscribe('threeSceneUpdate', this.update)
    }

    update() {
        this.renderer.render(this.scene, this.camera);
    }


    resizeCanvas() {
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.camera.aspect = window.innerWidth / window.innerHeight
        this.camera.updateProjectionMatrix()
    }

    bind() {
        this.resizeCanvas = this.resizeCanvas.bind(this)
        this.update = this.update.bind(this)
        this.init = this.init.bind(this)
    }
}

const _instance = new ThreeScene()
export default _instance