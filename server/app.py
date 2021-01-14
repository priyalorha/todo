
from flask import Flask, make_response, jsonify
import json



from datetime import datetime
from pytz import timezone
from location import HealthHarbour

app = Flask(__name__)
def insert_user_location(**kwargs):
    HealthHarbour(name=kwargs['name'],
                  id=kwargs['id'],
                  location=[kwargs['latitude'], kwargs['longitude']],
                  createdDate=datetime.now()
                  ).save()


def fetch_user_location(radius: float,
                        latitude: float,
                        longitude: float) -> [HealthHarbour] or None:
    IST = timezone('Asia/Kolkata')
    time = datetime.now(tz=IST)

    ob = []
    for index, value in enumerate(HealthHarbour.objects(
            location__geo_within_sphere=[[latitude, longitude], radius])):
        ob.append(value.to_dict())
    return ob


@app.route('/location', methods=['GET'])
@app.route('/location/<string:radius>/<string:latitude>/<string:longitude>', methods=['GET'])
def get_location(radius=0.0,
                 latitude=0.0,
                 longitude=0.0):
    print(radius, latitude, longitude)
    try:
        ob = fetch_user_location(float(radius),
                                 float(latitude),
                                 float(longitude))

        res = make_response({"data":ob}, 200)
        res.headers.add('Access-Control-Allow-Origin', '*')
        return res
    except Exception as e:
        return make_response(jsonify({'error': f'parameters missing{e}'}), 200)


def store_db():
    IST = timezone('Asia/Kolkata')
    time = datetime.now(tz=IST)
    HealthHarbour(id=7,
                  name='Apollo',
                  location=[78.233, 7.12],
                  createdDate=time).save()
    HealthHarbour(id=75,
                  name='blue print',
                  location=[63.233, 71.12],
                  createdDate=time).save()

    HealthHarbour(id=17,
                  name='medicos',
                  location=[22.233, 7.12],
                  createdDate=time).save()

    HealthHarbour(id=7,
                  name='hospital',
                  location=[78.233, 27.12],
                  createdDate=time).save()


if __name__ == '__main__':
    store_db()
    app.run(debug=True)
