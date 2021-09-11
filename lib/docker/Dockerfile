# The same docker file is also, located in apps/t2d/Dockerfile, if there are any changes also update it over there.

# This is the dockerfile, that will be uploaded to users pc to build t2d image.

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
