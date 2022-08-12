FROM python:3.9
COPY ["app.py","/usr/uv/app/"]
WORKDIR /usr/uv/app/
RUN python -m pip install flask && \
    python -m pip install -U flask-cors
COPY [".","/usr/uv/app/"]
RUN apt-get update &&\
	apt-get -y install \
		git \
		wget \
		libgl1 && \
	rm -rf /var/lib/apt/lists/* && \
	wget https://github.com/MiniZinc/MiniZincIDE/releases/download/2.6.4/MiniZincIDE-2.6.4-bundle-linux-x86_64.tgz && \
	tar -zxvf MiniZincIDE-2.6.4-bundle-linux-x86_64.tgz && \
    ls -la && \
	mv MiniZincIDE-2.6.4-bundle-linux-x86_64 minizinc && \
	rm -rf MiniZincIDE-2.6.4-bundle-linux-x86_64.tgz
EXPOSE 5000
CMD ["app.py"]
ENTRYPOINT ["python"]