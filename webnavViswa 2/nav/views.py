from django.shortcuts import render
from django.views import View
from django.views.decorators.clickjacking import xframe_options_exempt
import pymysql
# Create your views here.

class MyView(View):

    def get(self, request, *args, **kwargs):
        return render(request, 'welcome.html')

class About(View):

    def get(self, request, *args, **kwargs):
        return render(request,'about.html')
    
class Test(View):
    
    def get(self, request, *args, **kwargs):
        return render(request, 'test.html')

class Chat(View):
    @xframe_options_exempt
    def get(self, request, *args, **kwargs):
        return render(request,'new.html')

class Chatopen(View):
    @xframe_options_exempt
    def get(self, request, *args, **kwargs):
        return render(request,'chatiframe1.html')

class Search(View):
    
    def get(self, request, *args, **kwargs):
        itemname = kwargs.get('item')
        data1 = []
        try:
            connection = pymysql.connect(host='localhost',database='products',user='root',password='root')
        
            if connection.open:
                db_Info = connection.get_server_info()
                print("Connected to MySQL Server version ", db_Info)
                cursor = connection.cursor()
                cursor.execute("SELECT name, img, cost FROM product WHERE category = '%s'" %itemname)
                global data
                data = cursor.fetchall()
                print("Record from database: ", data)
                
                for item in data:
                    name = item[0]
                    url = str(item[1])
                    print(type(url))
                    url1 = url.lstrip("'b")
                    print(url1)
                    url2 = url1.rstrip("'")
                    print(url2)
                    cost = item[2]
                   
                    data1.append([name, url2, cost])
                    print('\n',data1,'\n')
        except pymysql.Error as e:
            print("Error while connecting to MySQL", e)

        finally:
            cursor.close()
            connection.close()
            print("MySQL connection is closed")

        return render(request, 'search.html', {'itemdata':data1})