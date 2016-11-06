import os
from unidecode import unidecode
import sqlite3
import re
import json

def initialize():
    MANIFEST_FILE_PATH = './image_manifest.js'
    createImageManifest(MANIFEST_FILE_PATH)

    # Currently using Realm as the database of choice,
    # therefore Sqlite database generation is disabled.

#     generateSqliteDatabase()

def createImageManifest(filePath):
    """
        Creates an image manifest for all image files found in the SgsWiki/images/ folder.
    """
    imageFiles = [x for x in os.listdir("../../images") if (x != 'default.jpg') and (x.split('.')[-1] == 'jpg')]

    with open(filePath, 'w') as manifest:
        manifest.write("'use strict';\n\n")
        manifest.write("export default function getImage(key) {\n\tvar image;\n\tswitch (key) {\n")

        for filename in imageFiles:
            key = filename.split('.')[0]
            manifest.write("\t\tcase '" + key + "':\n")
            manifest.write("\t\t\timage = require('../../images/" + filename + "');\n")
            manifest.write("\t\t\tbreak;\n")

        manifest.write("\t\tdefault:\n\t\t\timage = require('../../images/default.jpg');\n\t}\n\treturn image;\n}\n")
        manifest.flush()

def generateSqliteDatabase():
    """
        Takes the current hero data from heroes.json and creates a sqlite3 database variant.

        Notes: Requires heroes.json to exist in the same directory as this script.
    """
    conn = sqlite3.connect('sgs-wiki.db')

    # Foreign Key constraints are not enabled by default.
    # Must be enabled for each individual CONNECTION.
    conn.execute("PRAGMA foreign_keys = ON")

    # Create the Models (if they don't exist already)
    try:
        with conn:
            conn.execute("DROP TABLE IF EXISTS Partners;")
            conn.execute("DROP TABLE IF EXISTS Ability;")
            conn.execute("DROP TABLE IF EXISTS Hero;")
            conn.execute("""
                CREATE TABLE IF NOT EXISTS Hero (HeroKey    TEXT PRIMARY KEY
                                                ,Name       TEXT NOT NULL
                                                ,CONSTRAINT UQ_hero_name UNIQUE (Name)
                                                );
            """)
            conn.execute("""
                CREATE TABLE IF NOT EXISTS Ability (AbilityID    INTEGER PRIMARY KEY
                                                   ,Name         TEXT
                                                   ,Description  TEXT
                                                   ,HeroKey      TEXT
                                                   ,CONSTRAINT FK_ability_herokey
                                                            FOREIGN KEY (HeroKey) REFERENCES Hero(HeroKey)
                                                   );
            """)
            conn.execute("""
                CREATE TABLE IF NOT EXISTS Partners (HeroKey     TEXT
                                                    ,PartnerKey  TEXT
                                                    ,CONSTRAINT PK_hero_partner
                                                            PRIMARY KEY (HeroKey, PartnerKey)
                                                    ,CONSTRAINT FK_partners_herokey
                                                            FOREIGN KEY (HeroKey) REFERENCES Hero(HeroKey)
                                                    ,CONSTRAINT FK_partners_partnerKey
                                                            FOREIGN KEY (PartnerKey) REFERENCES Hero(HeroKey)
                                                    );
            """)
    except:
        print('Could not setup initial database. Automatically rolling back transaction.')

    with open('./heroes.json') as datafile:
        heroData = json.load(datafile)
        enumeratedHeroes = enumerate(heroData)
        for idx, hero in enumeratedHeroes:
            conn.execute("INSERT INTO Hero VALUES (?,?);", (hero['key'], hero['name']) )
            for ability in hero['abilities']:
                conn.execute("INSERT INTO Ability VALUES(NULL,?,?,?)", (ability['name'], ability['description'], hero['key']))
        conn.commit()

        nil_regex = re.compile('Nil\.{0,1}')

        enumeratedHeroes = enumerate(heroData)
        for idx, hero in enumeratedHeroes:
            for partner in hero['partners']:
                if nil_regex.match(partner) is None:
                    conn.execute("INSERT INTO Partners VALUES(?,?)", (hero['key'], generateKeyFromPartnerString(partner)))
                else:
                    print("Hero " + hero['name'] + " has no synergistic partners.")
    conn.commit()

def generateKeyFromPartnerString(string):
    """
        Takes the haphazard hero partner naming structure from the scraped data
        and generates a HeroKey equivalent string.

        Args:
            string  :   A string which may contain Chinese unicode characters
                        or HTML-escaped ampersand characters.

                        e.g. Gān Fū Rén (Lady Gan) 甘夫人

        Returns:
            A string which matches the HeroKey formatting style.

                        e.g. gan-fu-ren-lady-gan
    """
    rtn = string
    for idx, char in enumerate(string):
        ordinal = ord(char)
        if (ordinal > 0x4e00 and ordinal < 0x9fff) or \
           (char == '(' and rtn[idx + 1: idx + 5] != 'Lady'):
            # set the unprocessed return as the substring
            rtn = rtn[0:idx]

    rtn = rtn.strip()
    rtn = rtn.replace('&amp;', '')
    rtn = rtn.replace('(', '')
    rtn = rtn.replace(')', '')
    rtn = unidecode(rtn)
    rtn = rtn.lower()
    rtn = rtn.replace('  ', ' ')
    rtn = rtn.replace(' ', '-')

    return rtn

if __name__ == "__main__":
    initialize()
