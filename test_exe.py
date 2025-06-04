import platform

def afficher_version_windows():
    with open("infos.txt", "w") as f:
        f.write("=== Information Système Windows ===\n")
        f.write(f"Version: {platform.version()}\n")
        f.write(f"Machine: {platform.machine()}\n")
        f.write(f"Nom de l'ordinateur: {platform.node()}\n")
        f.write("===================================\n")

if __name__ == "__main__":
    afficher_version_windows()
