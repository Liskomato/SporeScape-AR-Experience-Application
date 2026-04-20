import {loadCollada} from "../libs/loader.js";
import { CSS3DObject } from "../libs/three.js-r132/examples/jsm/renderers/CSS3DRenderer.js";
const THREE = window.MINDAR.IMAGE.THREE;

// YouTube video for SporeScape - Galaksi herää (Finnish version of The Galaxy Awakens)
const createYtPlayer = () => {
  return new Promise((resolve, reject) => {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.querySelectorAll("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    const onYouTubeIframeAPIReady = () => {
      const player = new YT.Player("player", {
        videoId: "G-L9AKXKnCM",
        events: {
          onReady: () => {
            resolve(player);
          }
        }
      });
    };
    window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
  });
};

async function startAR() {

  // Initialize YouTube player
  const player = await createYtPlayer();
    
  // Initialize MindAR and Three.js
  const mindARThreeJs = new window.MINDAR.IMAGE.MindARThree({
    container: document.body,
    imageTargetSrc: "../assets/targets/creatures_and_adventure.mind",
    maxTrack: 9
  });

  const { cssRenderer, renderer, cssScene, scene, camera } = mindARThreeJs;
  const light = new THREE.HemisphereLight(0xffffff, 0xcccccc, 1);
  scene.add(light);
  
  // Add CSS object for video player
  const divVideo = new CSS3DObject(document.querySelector("#ar-example"));

  // Loading collada models of Spore creatures, exported natively from the game.

  
  const modelHato = await loadCollada("../assets/models/Hato.dae");
  const modelHivedegger = await loadCollada("../assets/models/Hivedegger.dae");
  const modelSaradostrich = await loadCollada("../assets/models/Saradostrich.dae");
  const modelSoumadis = await loadCollada("../assets/models/Soumadis VI.dae");
  const modelZamolate = await loadCollada("../assets/models/Zamolate.dae");
  const modelArgutix = await loadCollada("../assets/models/Argutix.dae");
  const modelBleu = await loadCollada("../assets/models/Bleu.dae");
  const modelCyborcus = await loadCollada("../assets/models/Cyborcus.dae");

  //Setting scale
   
   modelHato.scene.scale.set(0.5,0.5,0.5);
   modelHivedegger.scene.scale.set(0.5,0.5,0.5);
   modelSaradostrich.scene.scale.set(0.5,0.5,0.5);
   modelSoumadis.scene.scale.set(0.5,0.5,0.5);
   modelZamolate.scene.scale.set(0.5,0.5,0.5);
   modelArgutix.scene.scale.set(0.5,0.5,0.5);
   modelBleu.scene.scale.set(0.5,0.5,0.5);
   modelCyborcus.scene.scale.set(0.5,0.5,0.5);

  // Anchoring every creation to their PNG files. (Which can also be imported back into Spore)

  const anchorHato = mindARThreeJs.addAnchor(0);
  anchorHato.group.add(modelHato.scene);

  const anchorHivedegger = mindARThreeJs.addAnchor(1);
  anchorHivedegger.group.add(modelHivedegger.scene);

  const anchorSaradostrich = mindARThreeJs.addAnchor(2);
  anchorSaradostrich.group.add(modelSaradostrich.scene);

  const anchorSoumadis = mindARThreeJs.addAnchor(3);
  anchorSoumadis.group.add(modelSoumadis.scene);

  const anchorZamolate = mindARThreeJs.addAnchor(4);
  anchorZamolate.group.add(modelZamolate.scene);

  // Add video anchor
  const anchorVideo = mindARThreeJs.addCSSAnchor(5);
  anchorVideo.group.add(divVideo);

  // Resuming with anchoring creations.
  const anchorArgutix = mindARThreeJs.addAnchor(6);
  anchorArgutix.group.add(modelArgutix.scene);

  const anchorBleu = mindARThreeJs.addAnchor(7);
  anchorBleu.group.add(modelBleu.scene);

  const anchorCyborcus = mindARThreeJs.addAnchor(8);
  anchorCyborcus.group.add(modelCyborcus.scene);



  anchorVideo.onTargetFound = () => {
    player.playVideo();
  };

  anchorVideo.onTargetLost = () => {
    player.pauseVideo();
  };

  // Starting application

  await mindARThreeJs.start();
  renderer.setAnimationLoop(render);
  function render() {
    cssRenderer.render(cssScene, camera);
    renderer.render(scene, camera);
  }
}
// Begin program
startAR();