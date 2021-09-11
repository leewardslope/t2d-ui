# The same docker file is also, located in lib/docker/Dockerfile , if there are any changes also update it over there.

# This file, will not be uploaded! The uploaded file is in lib/docker/Dockerfile.

FROM ubuntu

WORKDIR /usr/src/app

RUN apt-get update

# webhook should be installed in users machine, not in docker.
# RUN apt-get install webhook

EXPOSE 4445

# EXPOSE 4444
# CMD [ "webhook", "-port", "4444", "-hooks", "hooks.yml", "&" ]

CMD ./websocketd --port=4445 tail -f log.txt
# CMD [ "./websocketd" "--port=4445" "tail" "-f" "log.txt" ]
