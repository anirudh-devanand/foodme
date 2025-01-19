FROM python:3.9

WORKDIR /app

COPY . . 

EXPOSE 5000

RUN pip install --no-cache-dir -r requirements.txt && chmod +x main.py

CMD ["python", "main.py"]