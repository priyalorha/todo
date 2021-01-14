import unittest
from pytz import timezone
from datetime import datetime

from location import HealthHarbour
from mongoengine import disconnect, connect


class TestLocation(unittest.TestCase):
    def setUp(self) -> None:
        IST = timezone('Asia/Kolkata')
        self.time = datetime.now(tz=IST)
        HealthHarbour(id=7,
                     name='Priya',
                     location=[78.233, 7.12],
                     createdDate=self.time).save()

    @classmethod
    def setUpClass(cls):
        disconnect()
        connect('mongoenginetest', host='mongomock://localhost')

    @classmethod
    def tearDownClass(cls):
        disconnect()

    def test_location_document(self):
        ob = HealthHarbour.objects(name='Priya'). \
            order_by('-createdDate')[0]
        self.assertTrue(ob.location, [78.233, 7.12])