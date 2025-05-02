import React, { useState, useEffect, memo } from 'react';
import Lottie from 'react-lottie';
import engrenage from '../../assets/lottie/engranage.json';

// Composant mémorisé pour l'animation Lottie qui ne re-rend pas à chaque changement d'état
const LottieAnimation = memo(({ options, width, height, speed }) => {
  return (
    <Lottie
      options={options}
      isClickToPauseDisabled={true}
      height={height}
      width={width}
      speed={speed}
    />
  );
});

// Composant mémorisé pour les astuces qui change seulement quand tipIndex change
const Tip = memo(({ tip, style }) => {
  return (
    <div style={style}>
      <p style={{margin: 0, padding: 0}}>{tip}</p>
    </div>
  );
});

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
  // États pour les fonctionnalités interactives
  const [tipIndex, setTipIndex] = useState(0);
  
  // Tableau de conseils ou faits intéressants
  const tips = [
    "Saviez-vous que la première connexion internet a été établie en 1969?",
    "Conseil: N'oubliez pas de sauvegarder régulièrement vos données!",
    "Le terme 'bug' vient d'un insecte trouvé dans un ordinateur en 1947.",
    "Plus de 90% des données mondiales ont été créées ces deux dernières années.",
    "Faites des pauses régulières pour reposer vos yeux pendant l'utilisation de l'écran.",
    "Pour une meilleure sécurité, utilisez des mots de passe différents pour chaque service.",
    "Le premier email a été envoyé en 1971 par Ray Tomlinson.",
    "Conseil technique: Ctrl+Shift+T rouvre le dernier onglet fermé dans la plupart des navigateurs."
  ];

  // Modifie la couleur de l'animation si spécifié
  const animationData = { ...engrenage };

  // Modifie la couleur de l'animation si une couleur est spécifiée
  if (animationColor) {
    // Recherche des layers contenant des couleurs et les remplace // un code trouvé sur internet
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

  // Change de conseil toutes les 5 secondes
  useEffect(() => {
    const tipTimer = setInterval(() => {
      setTipIndex((prevIndex) => (prevIndex + 1) % tips.length);
    }, 5000);
    
    return () => {
      clearInterval(tipTimer);
    };
  }, [tips.length]);

  const styles = {
    outerContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(240,240,240,0.8) 100%)',
      zIndex: 1000,
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: backgroundColor,
      borderRadius: borderRadius,
      padding: padding,
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
      width: '500px',  // Taille fixe au lieu de fit-content
      maxWidth: '90%',
      margin: '0 auto',
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid rgba(255, 255, 255, 0.4)',
    },
    animationWrapper: {
      width: width,
      height: height,
      position: 'relative',
      zIndex: 1001, // z-index plus bas que les autres éléments
    },
    text: {
      fontFamily: 'inherit',
      color: textColor,
      fontSize: textSize,
      marginTop: '15px',
      textAlign: 'center',
      fontWeight: '500',
      position: 'relative',
      zIndex: 1050,
    },
    tipContainer: {
      marginTop: '20px',
      padding: '15px',
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      borderRadius: '6px',
      maxWidth: '90%',
      minHeight: '80px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      transition: 'opacity 0.5s ease-in-out',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
      border: '1px dashed rgba(0, 0, 0, 0.1)',
      position: 'relative',
      zIndex: 1050,
    },
    decorativeElement: {
      position: 'absolute',
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      animation: 'float 3s infinite ease-in-out',
      zIndex: 1010,
    },
  };

  return (
    <div style={styles.outerContainer}>
      <div className={`in-progress-container ${className}`} style={styles.container}>
        <div style={{...styles.decorativeElement, top: '5%', left: '10%', animationDelay: '0.5s'}} />
        <div style={{...styles.decorativeElement, bottom: '8%', right: '15%', animationDelay: '1.2s', width: '30px', height: '30px'}} />
        <div style={{...styles.decorativeElement, top: '15%', right: '10%', animationDelay: '0.8s', width: '20px', height: '20px'}} />
        
        <div style={styles.animationWrapper}>
          <LottieAnimation 
            options={defaultOptions}
            width={width}
            height={height}
            speed={speed}
          />
        </div>
        
        {text && <div style={styles.text}>{text}</div>}
        
        <Tip 
          tip={tips[tipIndex]} 
          style={styles.tipContainer} 
        />
        
        <style jsx>{`
          @keyframes float {
            0% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-10px) rotate(5deg); }
            100% { transform: translateY(0px) rotate(0deg); }
          }
        `}</style>
      </div>
    </div>
  );
};

export default InProgress;

