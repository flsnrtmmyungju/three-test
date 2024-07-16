'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

//#region //*전체 스타일 //#endregion

//#endregion

export default function Donut() {
  const canvasRef = useRef(null);
  let camera, scene, renderer;

  function init() {
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(1.5, 4, 9);

    scene = new THREE.Scene();
    //scene.background = new THREE.Color(0xf6eedc);
    scene.background = new THREE.Color('#1f2a33');

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/jsm/libs/draco/gltf/');

    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);
    loader.setPath('/models/gltf/AVIFTest/');
    loader.load('forest_house.glb', function (gltf) {
      scene.add(gltf.scene);
      render();
    });

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', render);
    controls.target.set(0, 2, 0);
    controls.update();
    canvasRef.current?.appendChild(renderer.domElement);
  }

  function render() {
    renderer.render(scene, camera);
  }
  useEffect(() => {
    init();
    render();
    return () => canvasRef.current?.removeChild(renderer.domElement);
  }, []);

  return <div ref={canvasRef} />;
}
