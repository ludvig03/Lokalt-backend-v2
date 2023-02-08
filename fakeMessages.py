import requests
import time

url = 'http://localhost:4000/api/meldinger'
sender = "lødd"
receiver = "knødd"

for i in range(1000):
    payload = {"sender": sender, "mottaker": receiver, "melding": "Hei, dette er en testmelding"}
    response = requests.post(url, json=payload)
    pause = 0.1
    time.sleep(pause)
    
print("All messages sent successfully")