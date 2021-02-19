<<<<<<< HEAD
import { useEffect, useState } from "react";
import ResizeObserver from "resize-observer-polyfill";

const useResizeObserver = ref => {
  const [dimensions, setDimensions] = useState(null);
  useEffect(() => {
    const observeTarget = ref.current;
    const resizeObserver = new ResizeObserver(entries => {
      entries.forEach(entry => {
        setDimensions(entry.contentRect);
      });
    });
    resizeObserver.observe(observeTarget);
    return () => {
      resizeObserver.unobserve(observeTarget);
    };
  }, [ref]);
  return dimensions;
};

export default useResizeObserver;
=======
// import { useEffect, useState } from "react";
// import ResizeObserver from "resize-observer-polyfill";

// const useResizeObserver = ref => {
//   const [dimensions, setDimensions] = useState(null);
//   useEffect(() => {
//     const observeTarget = ref.current;
//     const resizeObserver = new ResizeObserver(entries => {
//       entries.forEach(entry => {
//         setDimensions(entry.contentRect);
//       });
//     });
//     resizeObserver.observe(observeTarget);
//     return () => {
//       resizeObserver.unobserve(observeTarget);
//     };
//   }, [ref]);
//   return dimensions;
// };

// export default useResizeObserver;
>>>>>>> 571b61d8cd98f3d839aba63c405c1f5050982310
