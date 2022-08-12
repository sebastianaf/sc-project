FROM python:3.9
COPY ["app.py","/usr/uv/app/"]
WORKDIR /usr/uv/app/
RUN python -m pip install flask && \
    python -m pip install -U flask-cors && \
	python -m pip install simpy && \
    python -m pip install numpy

COPY [".","/usr/uv/app/"]
EXPOSE 5000
CMD ["app.py"]
ENTRYPOINT ["python"]