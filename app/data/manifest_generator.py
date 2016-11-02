import os

def main():
    images = [x for x in os.listdir("../../images") if (x != 'default.jpg') and (x.split('.')[-1] == 'jpg')]
    createManifest(images)

def createManifest(imageFiles):
    manifest = open('./test.js', 'w')
    manifest.write("'use strict';\n\n")
    manifest.write("export default function getImage(key) {\n\tvar image;\n\tswitch (key) {\n")

    for filename in imageFiles:
        key = filename.split('.')[0]
        manifest.write("\t\tcase '" + key + "':\n")
        manifest.write("\t\t\timage = require('../../images/" + filename + "');\n")
        manifest.write("\t\t\tbreak;\n")

    manifest.write("\t\tdefault:\n\t\t\timage = require('../../images/default.jpg');\n\t}\n\treturn image;\n}\n")

if __name__ == "__main__":
    main()
