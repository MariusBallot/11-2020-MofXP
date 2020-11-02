import * as THREE from "three"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

class MofLogo {
    constructor() {
        this.bind()

        this.gltfLoader = new GLTFLoader()
        this.texLoader = new THREE.TextureLoader()
    }

    init(scene) {
        this.scene = scene
        this.gltfLoader.load("mofLogo.glb", glb => {
            let logo = glb.scene
            let tex = this.texLoader.load("mofBake.jpg")
            tex.encoding = THREE.sRGBEncoding;
            tex.flipY = false;
            let mat = new THREE.MeshBasicMaterial({
                map: tex,
            })


            console.log(logo)
            logo.traverse(child => {
                if (child instanceof THREE.Mesh)
                    child.material = mat
            })


            let plane = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), mat)
            // this.scene.add(plane)

            this.scene.add(logo)
        })
    }

    update() {

    }

    stop() {

    }

    bind() {
        this.init = this.init.bind(this)

    }
}

const _instance = new MofLogo()
export default _instance