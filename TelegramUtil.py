# Configuration parameters
from configurationData import TOKEN  # Unique identifier
telegramURL = "https://api.telegram.org/"
baseURL = telegramURL + "bot{}/".format(TOKEN)
baseFileURL = telegramURL + "file/bot{}/".format(TOKEN)

# Necessary imports
import requests
import json

class TelegramUtil:
    """ This class handles all comunications with
    Telegram """

    def __init__(self):
        self.offset = None
        self.getMsg = baseURL + "getUpdates"
        self.sendMsg = baseURL + "sendMessage"
        self.getFile = baseURL + "getFile"
        self.sendImg = baseURL + "sendPhoto"

    def __make_request(self, url):
        """ Returns the respons of a given url """
        response = requests.get(url)
        content = response.content.decode("utf-8")
        return content

    def __get_json_from_url(self, url):
        # given some url, return json response
        content_response = self.__make_request(url)
        return json.loads(content_response)

    def __reOffset(self, updates):
        if len(updates) == 0:
            return
        li = []
        for update in updates:
            li.append(int(update["update_id"]))
        self.offset = max(li) + 1

    def getFilePath(self, fileId):
        url = self.getFile + "?file_id={}".format(fileId)
        json = self.__get_json_from_url(url)['result']
        fpath = json['file_path']
        return baseFileURL + fpath

    def getUpdates(self):
        # Returns a json with the last messages the bot has received
        # If an offset is provided, we won't ask telegram for any previous messages
        # we use longpolling to keep the connection open N seconds
        url = self.getMsg + "?timeout=100"
        if self.offset:
            url += "&offset={}".format(self.offset)
        updates = self.__get_json_from_url(url)
        try:
            result = updates["result"]
        except Exception as e:
            print("Error: ")
            print(str(e))
            print("List of updates: ") #Return an empty list and dont raise, let the program run
            print(updates)
            return []
        self.__reOffset(result)
        return result

    def sendMessage(self, text, chat):
        # Send a message given some id
        from urllib import parse
        text = parse.quote_plus(text)
        url = self.sendMsg + "?text={}&chat_id={}".format(text, chat)
        self.__make_request(url)

    def sendImage(self, imgPath, chat):
        from requests import post
        data = {'chat_id': chat}
        img = open(imgPath, 'rb')
        files = {'photo': ('picture.jpg', img)}  # Here, the ,"rb" thing
        blabla = post(self.sendImg, data=data, files=files)
        print(blabla.status_code, blabla.reason, blabla.content)
