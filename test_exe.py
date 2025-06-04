import platform
import time

def afficher_version_windows():
    print("=== Information Système Windows ===")
    print(f"Version: {platform.version()}")
    print(f"Machine: {platform.machine()}")
    print(f"Nom de l'ordinateur: {platform.node()}")
    print("===================================")

if __name__ == "__main__":
    afficher_version_windows()
    input("Appuyez sur Entrée pour fermer...")  # Pour garder la fenêtre ouverte