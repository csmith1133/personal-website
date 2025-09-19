#!/usr/bin/env bash
# redeploy_charlie.sh — force-recreate the two services after pulling latest code
# Usage: run directly or via CI over SSH. Expects this file lives in ~/GitHub/Docker/.

set -euo pipefail # this is bash best practice because it makes the script fail on errors

# --- Paths (all relative to this script) -----------------------------------

SCRIPT_DIR="$(cd -- "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
COMPOSE_FILE="$(realpath "$SCRIPT_DIR/../Docker/docker_compose_projects.yaml")"
REPO_DIR="$(realpath "$SCRIPT_DIR/../charlie-personal-website")"     # app repo root

# print all the paths
echo "SCRIPT_DIR: $SCRIPT_DIR"
echo "COMPOSE_FILE: $COMPOSE_FILE"
echo "REPO_DIR: $REPO_DIR"

# pull the repo, and log if there are changes
was_changes=0
cd $REPO_DIR
git fetch origin main
if [ "$(git rev-parse HEAD)" != "$(git rev-parse origin/main)" ]; then
	echo "Changes detected in the repository. Pulling latest changes..."
	git pull origin main
	was_changes=1
else
	echo "No changes detected in the repository."
	was_changes=0
fi

# if there were changes, redeploy the services
if [ $was_changes -eq 1 ]; then
	echo "Redeploying services..."
	# sudo docker-compose -f docker_compose_projects.yaml build charlie-personal-website-backend
	sudo docker-compose -f $COMPOSE_FILE up -d --force-recreate --build charlie-personal-website-backend
	# sudo docker-compose -f docker_compose_projects.yaml build charlie-personal-website-frontend
	sudo docker-compose -f $COMPOSE_FILE up -d --force-recreate --build charlie-personal-website-frontend
	echo "Redeployment complete."
else
	echo "No changes to deploy. Exiting."
	exit 0
fi