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
