import * as THREE from "three"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import RAF from "../utils/raf"

class CoffeeBeans {
    constructor() {
        this.bind()
        this.gltfLoader = new GLTFLoader()
        this.orBean = THREE.Mesh
        this.instBeans

        this.texLoader = new THREE.TextureLoader()

        this.dummy = new THREE.Object3D
        this.dummy.scale.set(20, 20, 20)
        this.dummySeeds = []

        this.params = {
            count: 1000,
            rad: 3,
            scatter: 2,
            speed: 1
        }
    }

    init(scene) {
        this.scene = scene

        for (let i = 0; i < this.params.count; i++) {
            this.dummySeeds[i] = Math.random()
        }

        let mat = new THREE.MeshMatcapMaterial({
            matcap: this.texLoader.load("coffeeMatCap.jpg")
        })

        this.gltfLoader.load("coffeeBean.glb", glb => {

            this.orBean = glb.scene.children[0]
            let s = 20
            this.orBean.scale.set(s, s, s)

            this.instBeans = new THREE.InstancedMesh(this.orBean.geometry, mat, this.params.count);
            this.instBeans.instanceMatrix.setUsage(THREE.DynamicDrawUsage); // will be updated every frame
            this.scene.add(this.instBeans)


            RAF.subscribe("coffeeBeanUpdate", this.update)
        })
    }

    update() {

        let i = 0
        while (i < this.params.count) {
            let a = Math.PI * 2 / this.params.count * i + Date.now() * (0.0003 * this.dummySeeds[i]) * this.params.speed + 0.001
            this.dummy.position.x = Math.cos(a) * this.params.rad + (this.dummySeeds[i] - 0.5) * this.params.scatter
            this.dummy.position.y = Math.cos(a) * this.params.rad + (this.dummySeeds[(i + 2) % this.dummySeeds.length] - 0.5) * this.params.scatter
            this.dummy.position.z = Math.sin(a) * this.params.rad + (this.dummySeeds[(i + 1) % this.dummySeeds.length] - 0.5) * this.params.scatter

            this.dummy.rotation.x = i + Date.now() * 0.003 * this.dummySeeds[i] + 0.0001
            this.dummy.rotation.y = i + Date.now() * 0.003 * this.dummySeeds[i] + 0.0001

            this.dummy.updateMatrix()
            this.instBeans.setMatrixAt(i, this.dummy.matrix)

            i++
        }
        this.instBeans.instanceMatrix.needsUpdate = true;


    }

    stop() {

    }

    bind() {
        this.init = this.init.bind(this)
        this.update = this.update.bind(this)
    }

}

const _instance = new CoffeeBeans()
export default _instance