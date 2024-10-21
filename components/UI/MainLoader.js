import React from "react";
import { FaSpinner } from "react-icons/fa";

const MainLoader = () => {
  return (
    <div style={styles.newPreloaderContainer}>
      <div style={styles.newLoaderBackground}></div>
      <div id="new-preloader-active" style={styles.newPreloaderActive}>
        <div style={styles.newPreloader}>
          <div style={styles.newPreloaderInner}>
            <div style={styles.newPreloaderCircle}></div>
            <div style={styles.newPreloaderImg}>
              <div style={styles.newImgWrapper}>
                <FaSpinner style={styles.spinnerIcon} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  newPreloaderContainer: {
    position: "fixed", 
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
  },
  newLoaderBackground: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
  },
  newPreloaderActive: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  newPreloader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  newPreloaderInner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  newPreloaderCircle: {
    width: "100px",
    height: "100px",
    border: "5px solid #f0f0f0",
    borderTop: "5px solid #6a0dad",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  newPreloaderImg: {
    position: "absolute",
  },
  newImgWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
  },
  spinnerIcon: {
    fontSize: "50px",
    color: "#6a0dad",
    animation: "spin 1.5s linear infinite", 
  },
};

const spinAnimation = `
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;

const styleSheet = document.styleSheets[0];
styleSheet.insertRule(spinAnimation, styleSheet.cssRules.length);

export default MainLoader;