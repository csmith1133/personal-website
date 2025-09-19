#!/usr/bin/env bash
# redeploy_charlie.sh — force-recreate the two services after pulling latest code
# Usage: run directly or via CI over SSH. Expects this file lives in ~/GitHub/Docker/.
# will need to run this too: git config --global --add safe.directory /home/jason/GitHub/charlie-personal-website

set -euo pipefail # this is bash best practice because it makes the script fail on errors

# --- Logging function with timestamps -----------------------------------
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*"
}

# --- Paths (all relative to this script) -----------------------------------

SCRIPT_DIR="$(cd -- "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
COMPOSE_FILE="$(realpath "$SCRIPT_DIR/../Docker/docker_compose_projects.yaml")"
REPO_DIR="$(realpath "$SCRIPT_DIR/../charlie-personal-website")"     # app repo root

log "SCRIPT_DIR: $SCRIPT_DIR"
log "COMPOSE_FILE: $COMPOSE_FILE"
log "REPO_DIR: $REPO_DIR"

# >>> use Jason's SSH key + known_hosts for all git commands, even when run as root
export GIT_SSH_COMMAND="ssh -i /home/jason/.ssh/id_rsa -o IdentitiesOnly=yes -o UserKnownHostsFile=/home/jason/.ssh/known_hosts -o StrictHostKeyChecking=yes"
# <<<

# safe.directory (needed when running as root)
if ! git config --global --get-all safe.directory | grep -q "^$REPO_DIR$"; then
    log "Adding $REPO_DIR to git safe.directory configuration"
    git config --global --add safe.directory "$REPO_DIR"
fi

# pull the repo, and log if there are changes
was_changes=0
cd $REPO_DIR
git fetch origin main
if [ "$(git rev-parse HEAD)" != "$(git rev-parse origin/main)" ]; then
	log "Changes detected in the repository. Pulling latest changes..."
	git pull origin main
	was_changes=1
else
	log "No changes detected in the repository."
	was_changes=0
fi

# if there were changes, redeploy the services
if [ $was_changes -eq 1 ]; then
	log "Redeploying services..."
	# sudo docker-compose -f docker_compose_projects.yaml build charlie-personal-website-backend
	sudo docker-compose -f $COMPOSE_FILE up -d --force-recreate --build charlie-personal-website-backend
	# sudo docker-compose -f docker_compose_projects.yaml build charlie-personal-website-frontend
	sudo docker-compose -f $COMPOSE_FILE up -d --force-recreate --build charlie-personal-website-frontend
	log "Redeployment complete."
else
	log "No changes to deploy. Exiting."
	exit 0
fi