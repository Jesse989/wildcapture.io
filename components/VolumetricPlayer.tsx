import React, { useEffect, useRef, useState } from 'react';
import DracosisPlayer from "@xr3ngine/volumetric/src/CanvasPlayer"
  import {
    PerspectiveCamera,
    Scene,
    Vector3,
    WebGLRenderer,
    sRGBEncoding,
    // Mesh, SphereBufferGeometry, BoxBufferGeometry,
    // MeshNormalMaterial
  } from "three"
  import { OrbitControls } from "three-stdlib"

  const cameraOrbitingHeight = 1.7;
  const cameraDistance = 6.5;
  const cameraVerticalOffset = 0.4;
  const cameraFov = 35;

  export default (props) => {

    const containerRef = useRef();
    const rendererRef = useRef(null);
    const playerRef = useRef(null);
    let animationFrameId;
    const [dracosisSequence, setDracosisSequence] = useState(null);
    const [playIsStarted, setPlayIsStarted] = useState(false);
    const [isBuffering, setIsBuffering] = useState(false);
    const [bufferingProgress, setBufferingProgress] = useState(0);
    const videoReady = !!dracosisSequence;

    useEffect(() => {
      const container = containerRef.current;
      if (typeof container === "undefined") {
        return;
      }
      let w = (container as any).clientWidth ,
        h = (container as any).clientHeight;
      const scene = new Scene(),
        camera = new PerspectiveCamera(cameraFov, w / h, 0.001, 100),
        controls = new OrbitControls(camera, container),
        renderConfig = { antialias: true, alpha: true };
      if (!rendererRef.current) {
        rendererRef.current = new WebGLRenderer(renderConfig);
      }
      let renderer = rendererRef.current;
      controls.target = new Vector3(0, cameraOrbitingHeight, 0);
      controls.panSpeed = 0.4;
      camera.position.set(0, cameraOrbitingHeight, cameraDistance);
      camera.lookAt(controls.target);
      renderer.outputEncoding = sRGBEncoding;
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(w, h);
      (container as any).appendChild(renderer.domElement);
      const onResize = function () {
        w = (container as any).clientWidth;
        h = (container as any).clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
        setCameraOffset();
      }
      window.addEventListener('resize', onResize);

      /**
       * shift camera from it's center
       */
      function setCameraOffset() {
        const fullWidth = w;
        const fullHeight = h + h * Math.abs(cameraVerticalOffset);
        const width = w;
        const height = h;
        const x = 0;
        const y = h * cameraVerticalOffset;
        /*
        fullWidth — full width of multiview setup
        fullHeight — full height of multiview setup
        x — horizontal offset of subcamera
        y — vertical offset of subcamera
        width — width of subcamera
            height — height of subcamera
         */
        camera.setViewOffset(fullWidth, fullHeight, x, y, width, height);
      }
      setCameraOffset();

      function render() {
        animationFrameId = requestAnimationFrame(render);
        playerRef.current.handleRender(renderer, scene, camera);
        controls.update();
      }

      console.log('create new player');
      // dummy to test
      // const box = new Mesh(
      //   new BoxBufferGeometry(0.5, 1.45, 0.5),
      //   new MeshNormalMaterial()
      // );
      // box.position.y = 1.45 / 2;
      // scene.add(box);
      //
      // const head = new Mesh(
      //   new SphereBufferGeometry(0.25),
      //   new MeshNormalMaterial()
      // );
      // head.position.y = 1.7;
      // scene.add(head);

      const player = new DracosisPlayer({
        scene,
        renderer,
        meshFilePath: props.meshFilePath,
        videoFilePath: props.videoFilePath,
        autoplay: false,
        onMeshBuffering: (progress) => {
          console.warn('BUFFERING!!', progress);
          setBufferingProgress(Math.round(progress * 100));
          setIsBuffering(true);
        },
        onFrameShow: () => {
          setIsBuffering(false);
        }
      });

      if (!playerRef.current) {
        playerRef.current = player;
      }

      setDracosisSequence(player);

      /*
  'video-started'
  'video-error'
  'mesh-frames-started'
  'mesh-frames-progress'
  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'element' implicitly has an 'any' type.
  'mesh-frames-finished'
  'mesh-frames-buffering'
  'video-frame-handler'
  'frame-show'
  'error'
       */
      // player.addEventListener('mesh-frames-buffering', (progress) => {
      //   console.warn('BUFFERING!!', progress);
      //   setBufferingProgress(Math.round(progress * 100));
      //   setIsBuffering(true);
      // });
      // player.addEventListener('frame-show', () => {
      //   setIsBuffering(false);
      // });

      console.log('+++  dracosisSequence')

      render();
      // DracosisSequence.play();

      return () => {

        // clear volumetric player
        console.log('+++ CLEANUP player');
        player?.dispose();

        // if (player && (player as any)?._video) {
        //
        //   // player._video.stop();
        //   (player as any)._video.pause();
        //   (player as any)._video.parentElement.removeChild((player as any)._video)
        //
        //   if((player as any)!== null) { (player as any)._video = null }
        //   (player as any)._videoTexture.dispose()
        //   (player as any)._videoTexture = null
        //   window.removeEventListener("resize", onResize)
        //   cancelAnimationFrame(animationFrameId)
        //   controls.dispose();
        //   (player as any).worker.terminate()
        //   if ((player as any).bufferingTimer) {
        //     clearInterval((player as any).bufferingTimer)
        //   }
        //   if ((player as any).meshBuffer) {
        //     (player as any).meshBuffer.array?.forEach(element => {
        //       if (element) {
        //         element.bufferGeometry.dispose()
        //       }
        //     })
        //     (player as any).meshBuffer.clear()
        //   }
        // }
        setDracosisSequence(null);
        setPlayIsStarted(false);
        setIsBuffering(false);
      }
    }, []);

    function startPlayer() {
      if (videoReady) {
        dracosisSequence.play();
        setPlayIsStarted(true);
      }
    }

    // const videoIsPlaying = dracosisSequence?._video && (!dracosisSequence._video.paused && !dracosisSequence._video.seeking && dracosisSequence._video.currentTime > 0);
    const playButton = playIsStarted ? null : <button onTouchEnd={() => startPlayer()} onClick={() => startPlayer()} className={"button"}>{videoReady ? "Play" : "Loading..."}</button>;
    const bufferingIndication = isBuffering ? <div className={"buffering-indication"}>Buffering: {bufferingProgress}%</div> : null;

    return <div className="volumetric__player" style={props.style} ref={containerRef}>
      {playButton}
      {bufferingIndication}
    </div>;
  }

