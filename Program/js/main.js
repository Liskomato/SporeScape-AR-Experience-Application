import {loadCollada} from "../../libs/loader.js";
const THREE = window.MINDAR.IMAGE.THREE;

async function startAR() {
    
  // Initialize MindAR and Three.js
  const mindARThreeJs = new window.MINDAR.IMAGE.MindARThree({
    container: document.body,
    imageTargetSrc: "../../assets/targets/targets.mind",
    maxTrack: 8
  });

  const { renderer, scene, camera } = mindARThreeJs;
  const light = new THREE.HemisphereLight(0xffffff, 0xcccccc, 1);
  scene.add(light);

  // Loading collada models of Spore creatures, exported natively from the game.

  const modelCyborcus = await loadCollada("../../assets/models/Cyborcus.dae");
  const modelHato = await loadCollada("../../assets/models/Hato.dae");
  const modelHivedegger = await loadCollada("../../assets/models/Hivedegger.dae");
  const modelSaradostrich = await loadCollada("../../assets/models/Saradostrich.dae");
  const modelSoumadis = await loadCollada("../../assets/models/Soumadis VI.dae");
  const modelZamolate = await loadCollada("../../assets/models/Zamolate.dae");
  const modelArgutix = await loadCollada("../../assets/models/Argutix.dae");
  const modelBleu = await loadCollada("../../assets/models/Bleu.dae");

  //Setting scale
  modelCyborcus.scene.scale.set(0.1,0.1,0.1);
  modelHato.scene.scale.set(0.1,0.1,0.1);
  modelHivedegger.scene.scale.set(0.1,0.1,0.1);
  modelSaradostrich.scene.scale.set(0.1,0.1,0.1);
  modelSoumadis.scene.scale.set(0.1,0.1,0.1);
  modelZamolate.scene.scale.set(0.1,0.1,0.1);
  modelArgutix.scene.scale.set(0.1,0.1,0.1);
  modelBleu.scene.scale.set(0.1,0.1,0.1);

  // Anchoring every creature to their PNG files. (Which can also be imported back into Spore)

  const anchorCyborcus = mindARThreeJs.addAnchor(0);
  anchorCyborcus.group.add(modelCyborcus.scene);

  const anchorHato = mindARThreeJs.addAnchor(1);
  anchorHato.group.add(modelHato.scene);

  const anchorHivedegger = mindARThreeJs.addAnchor(2);
  anchorHivedegger.group.add(modelHivedegger.scene);

  const anchorSaradostrich = mindARThreeJs.addAnchor(3);
  anchorSaradostrich.group.add(modelSaradostrich.scene);

  const anchorSoumadis = mindARThreeJs.addAnchor(4);
  anchorSoumadis.group.add(modelSoumadis.scene);

  const anchorZamolate = mindARThreeJs.addAnchor(5);
  anchorZamolate.group.add(modelZamolate.scene);

  const anchorArgutix = mindARThreeJs.addAnchor(6);
  anchorArgutix.group.add(modelArgutix.scene);

  const anchorBleu = mindARThreeJs.addAnchor(7);
  anchorBleu.group.add(modelBleu.scene);

  // Starting application

  await mindARThreeJs.start();
  renderer.setAnimationLoop(render);
  function render() {
    renderer.render(scene, camera);
  }
}
// Begin program
startAR();