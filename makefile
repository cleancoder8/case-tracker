build.install.cdk:
	cd iac && npm install
build.install.python:
	pip install -r src/requirements.txt -t src
deploy:
	cd iac && npm run cdk deploy CaseTrackerStack -- require-approval never
