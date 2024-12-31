import React, { useEffect, useRef, useState } from "react";
import "./TablePreview.css";
import cart_icon from "../../assets/images/addcart.png";
import empty_icon from "../../assets/images/emptyicon.png";

const TablePreview = () => {
  const contentRef = useRef(null);
  const scrollTrackRef = useRef(null);
  const scrollThumbRef = useRef(null);
  const observer = useRef(null);

  const [thumbWidth, setThumbWidth] = useState(20);
  const [isDragging, setIsDragging] = useState(false);
  const [scrollStartPosition, setScrollStartPosition] = useState(0);
  const [initialContentScrollLeft, setInitialContentScrollLeft] = useState(0);

  function handleResize() {
    if (scrollTrackRef.current && contentRef.current) {
      const { clientWidth: trackSize } = scrollTrackRef.current;
      const { clientWidth: contentVisible, scrollWidth: contentTotalWidth } =
        contentRef.current;
      setThumbWidth(
        Math.max((contentVisible / contentTotalWidth) * trackSize, 20)
      );
    }
  }

  function handleThumbPosition() {
    if (
      !contentRef.current ||
      !scrollTrackRef.current ||
      !scrollThumbRef.current
    ) {
      return;
    }

    const { scrollLeft: contentLeft, scrollWidth: contentWidth } =
      contentRef.current;
    const { clientWidth: trackWidth } = scrollTrackRef.current;

    let newLeft = (contentLeft / contentWidth) * trackWidth;
    newLeft = Math.min(newLeft, trackWidth - thumbWidth);

    const thumb = scrollThumbRef.current;
    requestAnimationFrame(() => {
      thumb.style.left = `${newLeft}px`;
    });
  }

  useEffect(() => {
    if (contentRef.current) {
      const content = contentRef.current;
      observer.current = new ResizeObserver(() => {
        handleResize();
      });
      observer.current.observe(content);
      content.addEventListener("scroll", handleThumbPosition);
      return () => {
        observer.current?.unobserve(content);
        content.removeEventListener("scroll", handleThumbPosition);
      };
    }
  }, []);

  function handleThumbMousedown(e) {
    e.preventDefault();
    e.stopPropagation();
    setScrollStartPosition(e.clientX);
    if (contentRef.current)
      setInitialContentScrollLeft(contentRef.current.scrollLeft);
    setIsDragging(true);
  }

  function handleThumbMouseup(e) {
    e.preventDefault();
    e.stopPropagation();
    if (isDragging) {
      setIsDragging(false);
    }
  }

  function handleThumbMousemove(e) {
    if (contentRef.current) {
      e.preventDefault();
      e.stopPropagation();
      if (isDragging) {
        const {
          scrollWidth: contentScrollWidth,
          clientWidth: contentClientWidth,
        } = contentRef.current;

        const deltaX =
          (e.clientX - scrollStartPosition) * (contentClientWidth / thumbWidth);

        const newScrollLeft = Math.min(
          initialContentScrollLeft + deltaX,
          contentScrollWidth - contentClientWidth
        );

        contentRef.current.scrollLeft = newScrollLeft;
      }
    }
  }

  useEffect(() => {
    document.addEventListener("mousemove", handleThumbMousemove);
    document.addEventListener("mouseup", handleThumbMouseup);
    return () => {
      document.removeEventListener("mousemove", handleThumbMousemove);
      document.removeEventListener("mouseup", handleThumbMouseup);
    };
  }, [handleThumbMousemove, handleThumbMouseup]);

  function handleTrackClick(e) {
    e.preventDefault();
    e.stopPropagation();
    const { current: track } = scrollTrackRef;
    const { current: content } = contentRef;
    if (track && content) {
      const { clientX } = e;
      const target = e.target;
      const rect = target.getBoundingClientRect();
      const trackLeft = rect.left;
      const thumbOffset = -(thumbWidth / 2);
      const clickRatio =
        (clientX - trackLeft + thumbOffset) / track.clientWidth;
      const scrollAmount = Math.floor(clickRatio * content.scrollWidth);
      content.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  }
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return `${text.substr(0, maxLength)}...`;
  };
  return (
    <div
      className="tablepreview py-4 overflow-y-auto mb-5 scrollbar-design"
      style={{ maxHeight: "120vh" }}
    >
      <div className="preview-heading">
        <div className="periodicity">
          Periodicity: <span>Yearly</span>
        </div>
        <div class="preview-add-to-cart">
          <div class="preview-add-to-cart-text">Add to cart</div>
          <img class="preview-add-to-cart-icon" src={cart_icon} alt="..." />
        </div>
      </div>
      <div
        className="track-and-thumb"
        role="scrollbar"
        aria-controls="custom-scrollbars-content"
      >
        <div
          className="track"
          ref={scrollTrackRef}
          onClick={handleTrackClick}
          style={{ cursor: isDragging ? "grabbing" : undefined }}
        ></div>
        <div
          className="thumb"
          ref={scrollThumbRef}
          onMouseDown={handleThumbMousedown}
          style={{
            width: `${thumbWidth}px`,
            cursor: isDragging ? "grabbing" : "grab",
          }}
        ></div>
      </div>
      <div className="preview-table-container-bg">
        <div
          className="preview-table-content overflow-x-auto scrollbar-x"
          id="custom-scrollbars-content"
          ref={contentRef}
        >
          <div className="preview-table-inner">
            <div class="preview-table-headings preview-table-row">
              <div class="preview-table-heading-item preview-table-col-2">
                Country name
              </div>
              <div class="preview-table-heading-item preview-table-col-2">
                Country code
              </div>
              <div class="preview-table-heading-item preview-table-col-4">
                Data source
              </div>
              <div class="preview-table-heading-item preview-table-col-3">
                Unit of measurement
              </div>
              <div class="preview-table-heading-item preview-table-col-2">
                Periodicity
              </div>
              <div class="preview-table-heading-item preview-table-col-3">
                Data short description
              </div>
              <div class="preview-table-heading-item preview-table-col-1">
                1990
              </div>
              <div class="preview-table-heading-item preview-table-col-1">
                1991
              </div>
              <div class="preview-table-heading-item preview-table-col-1">
                1992
              </div>
              <div class="preview-table-heading-item preview-table-col-1">
                1993
              </div>
              <div class="preview-table-heading-item preview-table-col-1">
                1994
              </div>
              <div class="preview-table-heading-item preview-table-col-1">
                1995
              </div>
              <div class="preview-table-heading-item preview-table-col-1">
                1996
              </div>
              <div class="preview-table-heading-item preview-table-col-1">
                1997
              </div>
            </div>
            <div className="preview-table-body-container">
              {[...Array(10)].map((data, index) => (
                <div class="preview-table-body preview-table-row">
                  <div class="preview-table-body-items preview-table-col-2">
                    Nigeria
                  </div>
                  <div class="preview-table-body-items preview-table-col-2">
                    NGR
                  </div>
                  <div class="preview-table-body-items preview-table-col-4">
                    Research institute of malawi
                  </div>
                  <div class="preview-table-body-items preview-table-col-3">
                    Total
                  </div>
                  <div class="preview-table-body-items preview-table-col-2">
                    Annual
                  </div>
                  <div class="preview-table-body-items preview-table-col-3">
                    {truncateText("Export of goods and services", 20)}
                  </div>
                  <div class="preview-table-body-items preview-table-col-1">
                    1990
                  </div>
                  <div class="preview-table-body-items preview-table-col-1">
                    <img
                      src={empty_icon}
                      alt=".."
                      className="preview-empty-year"
                    />
                  </div>
                  <div class="preview-table-body-items preview-table-col-1">
                    <img
                      src={empty_icon}
                      alt=".."
                      className="preview-empty-year"
                    />
                  </div>
                  <div class="preview-table-body-items preview-table-col-1">
                    <img
                      src={empty_icon}
                      alt=".."
                      className="preview-empty-year"
                    />
                  </div>
                  <div class="preview-table-body-items preview-table-col-1">
                    <img
                      src={empty_icon}
                      alt=".."
                      className="preview-empty-year"
                    />
                  </div>
                  <div class="preview-table-body-items preview-table-col-1">
                    <img
                      src={empty_icon}
                      alt=".."
                      className="preview-empty-year"
                    />
                  </div>
                  <div class="preview-table-body-items preview-table-col-1">
                    <img
                      src={empty_icon}
                      alt=".."
                      className="preview-empty-year"
                    />
                  </div>
                  <div class="preview-table-body-items preview-table-col-1">
                    <img
                      src={empty_icon}
                      alt=".."
                      className="preview-empty-year"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TablePreview;

// const observer = useRef(null);
// const contentRef = useRef(null);
// const scrollThumbRef = useRef(null);
// const scrollTrackRef = useRef(null);



// const [thumbWidth, setThumbWidth] = useState(20);
// const [isDragging, setIsDragging] = useState(false);
// const [scrollStartPosition, setScrollStartPosition] = useState(0);
// const [initialContentScrollLeft, setInitialContentScrollLeft] = useState(0);


// function handleResize() {
//   if (scrollTrackRef.current && contentRef.current) {
//     const { clientWidth: trackSize } = scrollTrackRef.current;
//     const { clientWidth: contentVisible, scrollWidth: contentTotalWidth } =
//       contentRef.current;
//     setThumbWidth(
//       Math.max((contentVisible / contentTotalWidth) * trackSize, 20)
//     );
//   }
// }

// function handleThumbPosition() {
//   if (
//     !contentRef.current ||
//     !scrollTrackRef.current ||
//     !scrollThumbRef.current
//   ) {
//     return;
//   }

//   const { scrollLeft: contentLeft, scrollWidth: contentWidth } =
//     contentRef.current;
//   const { clientWidth: trackWidth } = scrollTrackRef.current;

//   let newLeft = (contentLeft / contentWidth) * trackWidth;
//   newLeft = Math.min(newLeft, trackWidth - thumbWidth);

//   const thumb = scrollThumbRef.current;
//   requestAnimationFrame(() => {
//     thumb.style.left = `${newLeft}px`;
//   });
// }

// useEffect(() => {
//   if (contentRef.current) {
//     const content = contentRef.current;
//     observer.current = new ResizeObserver(() => {
//       handleResize();
//     });
//     observer.current.observe(content);
//     content.addEventListener("scroll", handleThumbPosition);
//     return () => {
//       observer.current?.unobserve(content);
//       content.removeEventListener("scroll", handleThumbPosition);
//     };
//   }
// }, []);

// function handleThumbMousedown(e) {
//   e.preventDefault();
//   e.stopPropagation();
//   setScrollStartPosition(e.clientX);
//   if (contentRef.current)
//     setInitialContentScrollLeft(contentRef.current.scrollLeft);
//   setIsDragging(true);
// }

// function handleThumbMouseup(e) {
//   e.preventDefault();
//   e.stopPropagation();
//   if (isDragging) {
//     setIsDragging(false);
//   }
// }

// function handleThumbMousemove(e) {
//   if (contentRef.current) {
//     e.preventDefault();
//     e.stopPropagation();
//     if (isDragging) {
//       const {
//         scrollWidth: contentScrollWidth,
//         clientWidth: contentClientWidth,
//       } = contentRef.current;

//       const deltaX =
//         (e.clientX - scrollStartPosition) * (contentClientWidth / thumbWidth);

//       const newScrollLeft = Math.min(
//         initialContentScrollLeft + deltaX,
//         contentScrollWidth - contentClientWidth
//       );

//       contentRef.current.scrollLeft = newScrollLeft;
//     }
//   }
// }

// useEffect(() => {
//   document.addEventListener("mousemove", handleThumbMousemove);
//   document.addEventListener("mouseup", handleThumbMouseup);
//   return () => {
//     document.removeEventListener("mousemove", handleThumbMousemove);
//     document.removeEventListener("mouseup", handleThumbMouseup);
//   };
// }, [handleThumbMousemove, handleThumbMouseup]);

// function handleTrackClick(e) {
//   e.preventDefault();
//   e.stopPropagation();
//   const { current: track } = scrollTrackRef;
//   const { current: content } = contentRef;
//   if (track && content) {
//     const { clientX } = e;
//     const target = e.target;
//     const rect = target.getBoundingClientRect();
//     const trackLeft = rect.left;
//     const thumbOffset = -(thumbWidth / 2);
//     const clickRatio =
//       (clientX - trackLeft + thumbOffset) / track.clientWidth;
//     const scrollAmount = Math.floor(clickRatio * content.scrollWidth);
//     content.scrollTo({
//       left: scrollAmount,
//       behavior: "smooth",
//     });
//   }
// }