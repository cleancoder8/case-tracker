build.install.cdk:
	cd iac && npm install
build.install.python:
	pip install -r src/requirements.txt -t src
deploy:
	cd iac && cdk deploy
