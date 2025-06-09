
<div id="readme-top" align="center">
  <a href="https://github.com/itsmrval/2bgp-ad">
    <img src="https://github.com/itsmrval/2bgp-ad/blob/main/frontend/src/assets/logo/logo.gif" alt="Logo" width="120">
  </a>

  <h3 align="center">2bgp-ad</h3>

  <p align="center">
    A school project Capture The Flag (CTF) platform for learning and practicing Windows cybersecurity skills. Based on Proxmox VE, it will deploy an isolated environment per user. 
    <br />
    <br />
    <a href="https://github.com/itsmrval/2bgp-ad/issues">Report Bug</a>
    ·
    <a href="https://github.com/itsmrval/2bgp-ad/pulls">Pull request</a>
  </p>
</div>


<details>
  <summary>Table of contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About the Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
  </ol>
</details>

## About the Project

2bgp-ad is a Capture The Flag (CTF) platform designed to help users learn and practice cybersecurity skills through a series of challenges. The platform is can be self-hosted and can be customized to fit your needs.
This project was carried out for educational purposes.

It will deploy 5 VMs and a SDN with security rules per user for isolated environment, automaticly.

Homepage             |  Installation
:-------------------------:|:-------------------------:
![](https://i.imgur.com/1PGLYmC.jpeg)  |  ![](https://i.imgur.com/v0G9vW0.png) 

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Getting Started

Follow these instructions to set up the 2bgp-ad platform on your local machine or server.

### Prerequisites

Ensure you have the following installed:

- Python
- Ansible
- Git

### Installation

1. **Clone the Repository**
   ```sh
   git clone https://github.com/itsmrval/2bgp-ad
   cd 2bgp-ad
   ```

2. **Modify Configuration**
   - Navigate to the `ansible` directory:
     ```sh
     cd ansible
     ```
   - Edit the files in `group_vars/all.yml` and `inventory.yml`.
   - On thoses, specify passwords and remote proxmox specifications

3. **Run the main playbook**
   
   ```sh
   ansible-playbook playbook.yml -i inventory.yml
   ```

7. **Access the Platform**
   - Once the playbook is running, you can navigate to http://[provided-ip]
   - Note: the first user registered is an admin.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

