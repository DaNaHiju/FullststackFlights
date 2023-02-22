FROM python:3.8.3-slim
RUN apt-get update \
    && apt-get -y install libpq-dev gcc \
    && pip install psycopg2
ENV PYTHONUNBUFFERED 1
WORKDIR /back
COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt
COPY . .