#!/usr/bin/env python

#
# Relgan Telegram Bot
#

from TelegramUtil import TelegramUtil
from sqhelper import basedatos
from Message import Message
from time import sleep
from ProcessUpdate import ProcessUpdate

def main():
    # Activate the database
    db = basedatos("Relgan.dat")
    # Create Tables if the don't exist:
    try:
        db.createTableText(["personaje", "caracteristica", "poder"], "habilidad")
    except:
        pass
    try:
        db.createTableText(["nombre", "imgpath"], "poder")
    except:
        pass
    ut = TelegramUtil()
    while True:
        updates = ut.getUpdates()
        for update in updates:
            updateParsed = Message(update)
            if updateParsed.ignore:
                continue
            else:
                processedUpdate = ProcessUpdate(updateParsed, db, ut)

if __name__ == '__main__':
    main()
