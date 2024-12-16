import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const Scene = () => {
    // Cria uma referência para anexar o canvas do Three.js ao DOM
    const mountRef = useRef(null);

    useEffect(() => {
        const currentMount = mountRef.current;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            50,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        
        // Posição base
        const baseX = 0;
        const baseY = 0;
        const baseZ = 0;
        
        // Ajuste da câmera
        camera.position.set(0, 35, 0);
        camera.lookAt(baseX + 5, baseY, baseZ);
      
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        currentMount.appendChild(renderer.domElement);
      
        // Lighting
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 10, 5);
        scene.add(directionalLight);
        const ambientLight = new THREE.AmbientLight(0x404040, 1);
        scene.add(ambientLight);
      
        // Floor
        const floorGeometry = new THREE.PlaneGeometry(50, 50);
        const floorMaterial = new THREE.MeshStandardMaterial({ color: 0xcccccc });
        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.rotation.x = -Math.PI / 2;
        scene.add(floor);
      
        // Walls
        const wallGeometry = new THREE.PlaneGeometry(50, 20);
        const wallMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
        const wall = new THREE.Mesh(wallGeometry, wallMaterial);
        wall.position.set(0, 5, -10);
        scene.add(wall);
      
        // Racks
        const createRack = (x, y, z, rackType) => {
            const rackGroup = new THREE.Group();

            // Dimensões gerais
            const rackHeight = 5.865;
            const rackWidth = 3.5;
            const rackDepth = 1; // Profundidade padrão
            const verticalMaterial = new THREE.MeshStandardMaterial({ color: 0x555555 });

            // Criar suportes verticais
            const verticalGeometry = new THREE.BoxGeometry(0.1, rackHeight, 0.1);
            const leftSupport = new THREE.Mesh(verticalGeometry, verticalMaterial);
            const rightSupport = new THREE.Mesh(verticalGeometry, verticalMaterial);
            leftSupport.position.set(x - rackWidth / 2, y + rackHeight / 2, z);
            rightSupport.position.set(x + rackWidth, y + rackHeight / 2, z);
            rackGroup.add(leftSupport, rightSupport);
        
            // Configuração de prateleiras com base no tipo rack 
            const shelfMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 });
            const shelfThickness = 0.1;

            let shelfPositions;
            let hasDoor = false;
            let doorHeight = 0;
            let doorWidth = 0;

            if (rackType === "type1") {
                // Tipo 1: Primeira e Segunda estruturas
                shelfPositions = [1.35, 1.35 + 0.465, 1.35 + 0.465 + 1.35];
            } else if (rackType === "type2") {
                // Tipo 2: Terceira, Quinta, Sexta e Sétima estruturas
                shelfPositions = [1.815, 1.815 + 1.35];
            } else if (rackType === "type3") {
                // Tipo 3: Quarta estrutura (com porta)
                shelfPositions = [2.265, 2.265 + 0.9];
                hasDoor = true;
                doorHeight = 2;
                doorWidth = 1;
            }
            
            // Adicionar prateleiras
            shelfPositions.forEach((shelfYPosition) => {
                const shelfGeometry = new THREE.BoxGeometry(rackWidth, shelfThickness, rackDepth);
                const shelf = new THREE.Mesh(shelfGeometry, shelfMaterial);
                shelf.position.set(x, y + shelfYPosition, z);
                rackGroup.add(shelf);
            });

            // Adicionar porta se necessário
            if (hasDoor) {
                const doorGeometry = new THREE.BoxGeometry(doorWidth, doorHeight, 0.05);
                const doorMaterial = new THREE.MeshStandardMaterial({ color: 0x00FF00 });
                const door = new THREE.Mesh(doorGeometry, doorMaterial);
                door.position.set(x, y + doorHeight / 2, z + rackDepth / 2 + 0.05); // Levemente à frente
                rackGroup.add(door);
            }
        
            return rackGroup;
        };
        
        // Direção 1: Primeira linha de racks 
        const rackSpacing = 4; // Espaçamento entre racks
        for (let i = 0; i < 5; i++) {
            let rackType = i === 3 ? "type3" : i < 2 ? "type1" : "type2";
            const rack = createRack(baseX + i * rackSpacing, baseY, baseZ, rackType);
            scene.add(rack);
        }

        // Direção 2: Segunda linha de racks
        for (let i = 0; i < 2; i++) {
            const rack = createRack(baseX + i * rackSpacing, baseY, baseZ, "type2");
            rack.rotation.y = -Math.PI / 2; // Girar para formar o "L"
            scene.add(rack);
        }
      
        // Animation loop
        const animate = () => {
          requestAnimationFrame(animate);
          renderer.render(scene, camera);
        };
        animate();
      
        return () => {
          currentMount.removeChild(renderer.domElement);
        };
    }, []);
      

    // Renderiza o elemento onde o Three.js será anexado
    return <div ref={mountRef} />;
};

export default Scene;
