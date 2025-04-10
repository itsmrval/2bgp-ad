import React from 'react';
import Lottie from 'react-lottie';
import engrenage from '../../assets/lottie/engranage.json';

const InProgress = ({ 
  width = 400, 
  height = 400, 
  loop = true, 
  autoplay = true,
  speed = 1,
  className = '',
  text = 'Veuillez patienter, le chargement est en cours...',
  textColor = '#333',
  textSize = '18px',
  showText = true,
  backgroundColor = 'rgba(232, 232, 232, 0.75)',
  borderRadius = '8px',
  padding = '20px',
  animationColor = '#FF0000' // Couleur rouge par défaut
}) => {
  // Modifie la couleur de l'animation si spécifié
  const animationData = { ...engrenage };
  if (animationColor) {
    // Recherche des layers contenant des couleurs et les remplace
    if (animationData.layers) {
      animationData.layers.forEach(layer => {
        if (layer.shapes) {
          layer.shapes.forEach(shape => {
            if (shape.it) {
              shape.it.forEach(item => {
                // Modifie les propriétés de couleur si elles existent
                if (item.c && item.c.k) {
                  if (Array.isArray(item.c.k)) {
                    item.c.k = [
                      parseInt(animationColor.slice(1, 3), 16) / 255,
                      parseInt(animationColor.slice(3, 5), 16) / 255,
                      parseInt(animationColor.slice(5, 7), 16) / 255,
                      1
                    ];
                  }
                }
              });
            }
          });
        }
      });
    }
  }

  const defaultOptions = {
    loop: loop,
    autoplay: autoplay,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const styles = {
    outerContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: 0,
      left: 0
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: backgroundColor,
      borderRadius: borderRadius,
      padding: padding,
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      width: 'fit-content',
      margin: '0 auto'
    },
    animationWrapper: {
      width: width,
      height: height
    },
    text: {
      fontFamily: 'inherit', // Utilise la police héritée du parent
      color: textColor,
      fontSize: textSize,
      marginTop: '15px',
      textAlign: 'center',
      fontWeight: '500'
    }
  };

// Dans la partie où vous configurez l'animation Lottie, ajoutez ces options
return (
    <div style={styles.outerContainer}>
      <div className={`in-progress-container ${className}`} style={styles.container}>
        <div style={styles.animationWrapper}>
          <Lottie
            options={{
              loop: true,
              autoplay: true, 
              animationData: animationData,
              rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
              }
            }}
            isClickToPauseDisabled={true}  // Désactive la pause sur clic
            height={height}
            width={width}
          />
        </div>
        {text && <div style={styles.text}>{text}</div>}
      </div>
    </div>
  );
};

export default InProgress;

