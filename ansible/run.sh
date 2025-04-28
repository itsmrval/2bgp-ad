export ANSIBLE_HOST_KEY_CHECKING=False
export ANSIBLE_PIPELINING=True
ansible-playbook -i inventory.yml playbook.yml