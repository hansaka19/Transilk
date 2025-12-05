import { useEffect } from 'react'

const SplineHeroViewer = () => {
  useEffect(() => {
    // Ensure the Spline viewer script is loaded once.
    if (document.getElementById('spline-viewer-script')) return;

    const script = document.createElement('script');
    script.type = 'module';
    script.id = 'spline-viewer-script';
    script.src = 'https://unpkg.com/@splinetool/viewer@1.12.5/build/spline-viewer.js';
    document.body.appendChild(script);
  }, []);

  return (
    // Background layer: hidden on mobile, fills the hero on md+.
    <div className="pointer-events-none absolute inset-0 hidden md:block">
      <spline-viewer
        className="w-full h-full"
        url="https://prod.spline.design/akbUCgyPdD3lf22C/scene.splinecode"
      ></spline-viewer>
      <div className="bg-white w-[200px] h-[50px] z-50 right-0 bottom-5 absolute"></div>
    </div>
  )
}

export default SplineHeroViewer
